import {
  registerUser,
  verifyOTPCode,
  resendOTPCode,
  loginService
} from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body, req.session);
    res.status(200).json({result, message:"verifier votre numero de telephone"});
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erreur interne" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const result = await verifyOTPCode(req.body.otp, req.session, res);
    res.status(201).json({result,message:"compte creer avec success"});
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erreur interne" });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const result = await resendOTPCode(req.session);
    res.status(200).json({result,message:"OTP renvoyee,"});
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erreur interne" });
  }
};


export const login = async (req, res) => {
  try {
    const result = await loginService(req.body, res); // On passe `res` pour gérer le cookie directement
    return res.status(200).json({
      message: "Connexion réussie",
      user: result,
    });
  } catch (err) {
    const status = err.statusCode || 500;
    return res.status(status).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Déconnexion réussie" });
};


export const checkAuth = async (req,res) =>{

  try{
    res.status(200).json(req.user);

  }catch(error){
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
}