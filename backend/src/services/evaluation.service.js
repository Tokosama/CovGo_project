import Evaluation from "../models/evaluation.model.js";
import Reservation from "../models/reservation.model.js";
import Trajet from "../models/trajet.model.js";

export const createEvaluationService = async (
  trajet_id,
  passager_id,
  note,
  commentaire
) => {
  const trajet = await Trajet.findById(trajet_id);
  if (!trajet || trajet.status !== "termine") {
    throw new Error("Trajet non terminé ou inexistant.");
  }

  const reservations = await Reservation.find({
    trajet_id,
    status: "confirme",
  });

  const passagerIds = reservations.map((r) => r.passager_id.toString());

  if (!passagerIds.includes(passager_id.toString())) {
    throw new Error("Vous n'avez pas participé à ce trajet.");
  }

  const existing = await Evaluation.findOne({ trajet_id, passager_id });
  if (existing) {
    throw new Error("Vous avez déjà évalué ce trajet.");
  }

  const evaluation = await Evaluation.create({
    trajet_id,
    passager_id,
    conducteur_id: trajet.conducteur_id,
    note,
    commentaire,
  });

  return evaluation;
};
