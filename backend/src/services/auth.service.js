import PendingUser from "../models/pendingUser.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateOTP, sendOTP, generateToken } from "../lib/utils.js";
import {
  UserValidator,
  LoginValidator,
} from "../lib/validators/auth.validator.js";
import { sendOTPByEmail } from "../lib/email.js";
import cloudinary, { uploadToCloudinary } from "../lib/cloudinary.js";


export const registerUser = async (data, session) => {
  const { error } = UserValidator.validate(data, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    throw { status: 400, message: errors };
  }

  let { nom, prenom, email, telephone, adresse, password, role } = data;

  if (!telephone.startsWith("+229")) telephone = "+229" + telephone;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { status: 400, message: "Email déjà utilisé" };
  }

  const { otpCode, otpExpires } = generateOTP();
  const hashedPassword = await bcrypt.hash(password, 10);
  await PendingUser.deleteOne({ telephone });

  const pending = new PendingUser({
    nom,
    prenom,
    email,
    telephone,
    adresse,
    role,
    password: hashedPassword,
    otpCode,
    otpExpires,
    statut: "inactif",
    verifie: false,
  });

  await pending.save();
  //await sendOTP(telephone, otpCode);
  await sendOTPByEmail(email, otpCode);

  //session.telephone = telephone;
  session.email = email;

  return { message: "OTP envoyé avec succès" };
};

export const verifyOTPCode = async (otp, session, res) => {
  // const telephone = session.telephone;
  // if (!telephone) {
  //   throw { status: 400, message: "Session expirée. Recommencez l'inscription." };
  // }
  const email = session.email;
  if (!email) {
    throw {
      status: 400,
      message: "Session expirée. Recommencez l'inscription.",
    };
  }

  //const pending = await PendingUser.findOne({ telephone });
  const pending = await PendingUser.findOne({ email });

  if (!pending) {
    throw { status: 400, message: "Utilisateur temporaire non trouvé" };
  }

  if (pending.otpCode !== otp || new Date() > pending.otpExpires) {
    throw { status: 400, message: "Code invalide ou expiré" };
  }

  const user = new User({
    nom: pending.nom,
    prenom: pending.prenom,
    email: pending.email,
    telephone: pending.telephone,
    adresse: pending.adresse,
    role: pending.role,
    photo: "",
    statut: "inactif",
    verifie: false,
    password: pending.password,
  });

  await user.save();
  await PendingUser.deleteOne({ _id: pending._id });
  //session.telephone = null;
  session.mail = null;

  generateToken(user._id, res);

  return {
    _id: user._id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    telephone: user.telephone,
    role: user.role,
  };
};

export const resendOTPCode = async (session) => {
  // const telephone = session?.telephone;
  // if (!telephone) {
  //   throw { status: 401, message: "Session expirée. Veuillez recommencer l'inscription." };
  // }

  const email = session.email;
  if (!email) {
    throw {
      status: 400,
      message: "Session expirée. Recommencez l'inscription.",
    };
  }
  //const pending = await PendingUser.findOne({ telephone });
  const pending = await PendingUser.findOne({ email });
  if (!pending) {
    throw {
      status: 404,
      message: "Aucun compte en attente trouvé pour ce numéro",
    };
  }

  const { otpCode, otpExpires } = generateOTP();
  pending.otpCode = otpCode;
  pending.otpExpires = otpExpires;
  await pending.save();
  console.log(email);
  // await sendOTP(telephone, otpCode);
  await sendOTPByEmail(email, otpCode);

  return { message: "Nouveau code OTP envoyé" };
};

// Login Service
export const loginService = async (data, res) => {
  const { error } = LoginValidator.validate(data);
  if (error) {
    const err = new Error("Email et mot de passe ne correspondent pas");
    err.statusCode = 400;
    throw err;
  }

  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Email et mot de passe ne correspondent pas");
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Email et mot de passe ne correspondent pas");
    err.statusCode = 401;
    throw err;
  }

  generateToken(user._id, res);

  return {
    _id: user._id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    telephone: user.telephone,
    role: user.role,
  };
};


export const updateProfileService = async (userId, profileData, photoFile) => {
  const updateData = {};

  // Si une photo est uploadée, upload sur Cloudinary
  if (photoFile) {
    const photoUrl = await uploadToCloudinary(photoFile.buffer);
    updateData.photo = photoUrl;
  }

  // Ajout des autres champs s'ils existent
  if (profileData.bio) updateData.bio = profileData.bio;

  // Ajoute ici tous les champs modifiables

  // Mise à jour de l'utilisateur
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  });

  return updatedUser;
};
