// services/admin.service.js
import Justificatif from "../models/justificatif.model.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getUnverifiedUsersService = async () => {
  return await User.find({ verifie: false }).sort({ createdAt: -1 });
};
export const getUserWithJustificatifs = async (userId) => {
  const user = await User.findById(userId).lean();
  if (!user) throw new Error("Utilisateur non trouvé");

  const justificatifs = await Justificatif.find({ user_id: userId }).lean();

  return { ...user, justificatifs };
};

export const verifyUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  if (user.verifie) {
    throw new Error("L'utilisateur est déjà vérifié");
  }

  user.verifie = true;
  await user.save();

  await Notification.create({
    user_id: user._id,
    type: "compte_verifie",
    contenue: `Félicitations ${user.prenom} ! Votre compte a été vérifié avec succès. Vous pouvez maintenant accéder à toutes les fonctionnalités de notre plateforme.`,
  });
  return user;
};
