// controllers/admin.controller.js
import { verifyUserService } from "../services/admin.service.js";
import { getUserWithJustificatifs } from "../services/admin.service.js";
import { getUnverifiedUsersService } from "../services/admin.service.js";

export const getUnverifiedUsersController = async (req, res) => {
  try {
    const users = await getUnverifiedUsersService();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};


export const getSingleUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const userWithDocs = await getUserWithJustificatifs(id);
    res.status(200).json(userWithDocs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const verifyUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await verifyUserService(userId);

    res.status(200).json({
      message: "Utilisateur vérifié avec succès",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
