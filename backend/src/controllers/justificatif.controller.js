import { justificatifsValidation } from "../lib/validators/justificatif.validator.js";
import * as justificatifService from "../services/justificatif.service.js";

export async function createJustificatifs(req, res) {
  try {
    const userId = req.user.id; // récupéré du middleware d'authentification

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Fichiers manquants" });
    }

    let justificatifsData;
    try {
      justificatifsData = JSON.parse(req.body.justificatifs);
    } catch (err) {
      return res.status(400).json({ message: "Format justificatifs invalide" });
    }

    const { error } = justificatifsValidation.validate({ justificatifs: justificatifsData });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (justificatifsData.length !== req.files.length) {
      return res.status(400).json({ message: "Le nombre de fichiers ne correspond pas au nombre de justificatifs" });
    }

    const justificatifs = justificatifsData.map((item, idx) => ({
      type: item.type,
      file: req.files[idx],
    }));

    const savedDocs = await justificatifService.createJustificatifs(userId, justificatifs);

    res.status(201).json({ message: "Justificatifs ajoutés", data: savedDocs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}


export async function getJustificatifsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const justificatifs = await justificatifService.getJustificatifsByUser(userId);

    return res.status(200).json({ data: justificatifs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}