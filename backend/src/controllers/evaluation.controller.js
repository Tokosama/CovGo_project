import { createEvaluationService } from "../services/evaluation.service.js";

export const createEvaluationController = async (req, res) => {
  const { note, commentaire } = req.body;
  const { trajet_id } = req.params;
  const passager_id = req.user.id;

  try {
    const evaluation = await createEvaluationService(
      trajet_id,
      passager_id,
      note,
      commentaire
    );
    res.status(201).json({ message: "Évaluation enregistrée.", evaluation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
