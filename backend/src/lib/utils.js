import jwt from "jsonwebtoken";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();


export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //MS 7days
    httpOnly: true, //prevent XSS attacks
    sameSite: "strict", //CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};


const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Génère un OTP à 6 chiffres
export const generateOTP = () => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min
  return { otpCode, otpExpires };
};

// Envoie l'OTP par SMS via Twilio
export const sendOTP = async (telephone, otp) => {
  try {
    const message = await client.messages.create({
      body: `Votre code de vérification CovGo est : ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: telephone,
    });

    console.log("OTP envoyé :", message.sid);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'OTP :", error.message);
    throw new Error("Échec de l'envoi du code OTP");
  }
};
