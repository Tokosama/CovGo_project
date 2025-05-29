import Reservation from "../models/reservation.model.js";
import Trajet from "../models/trajet.model.js";
export const createReservationService = async ({
  trajet_id,
  passager_id,
  places,
}) => {
  const trajet = await Trajet.findById(trajet_id);
  if (!trajet) {
    throw new Error("Trajet introuvable.");
  }

  if (trajet.status !== "disponible") {
    throw new Error("Ce trajet n'est pas disponible pour les réservations.");
  }

  // Vérifie si le passager a déjà réservé ce trajet
  const reservationExistante = await Reservation.findOne({
    trajet_id,
    passager_id,
  });

  if (reservationExistante) {
    throw new Error("Vous avez déjà effectué une réservation pour ce trajet.");
  }

  // Calcul du nombre de places déjà réservées (acceptées ou confirmées)
  const reservationsExistantes = await Reservation.aggregate([
    {
      $match: {
        trajet_id: trajet._id,
        status: { $in: ["accepte", "confirme"] },
      },
    },
    {
      $group: {
        _id: null,
        totalPlaces: { $sum: "$places" },
      },
    },
  ]);

  const placesReservees = reservationsExistantes[0]?.totalPlaces || 0;
  const placesDisponibles = trajet.places - placesReservees;

  if (places > placesDisponibles) {
    throw new Error(
      `Nombre de places demandées (${places}) supérieur aux places disponibles (${placesDisponibles}).`
    );
  }

  const prix_total = places * trajet.prix;

  const nouvelleReservation = new Reservation({
    trajet_id,
    passager_id,
    places,
    prix_total,
    status: "en attente",
  });

  return await nouvelleReservation.save();
};

export const updateReservationStatusService = async (reservationId, conducteurId, action) => {
  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    throw new Error("Réservation non trouvée.");
  }

  const trajet = await Trajet.findById(reservation.trajet_id);
  if (!trajet) {
    throw new Error("Trajet associé introuvable.");
  }

  // Vérification du conducteur
  if (trajet.conducteur_id.toString() !== conducteurId.toString()) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action.");
  }

  // Vérifie que la réservation est en attente
  if (reservation.status !== "en attente") {
    throw new Error("Cette réservation ne peut plus être modifiée.");
  }

  // Action
  if (action === "accepter") {
    reservation.status = "accepte";
  } else if (action === "rejeter") {
    reservation.status = "rejete";
  } else {
    throw new Error("Action invalide.");
  }

  await reservation.save();
  return reservation;
};

export const confirmerReservationService = async (reservationId, passagerId) => {
  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    throw new Error("Réservation non trouvée.");
  }

  if (reservation.passager_id.toString() !== passagerId.toString()) {
    throw new Error("Vous n'êtes pas autorisé à confirmer cette réservation.");
  }

  if (reservation.status !== "accepte") {
    throw new Error("La réservation ne peut être confirmée que si elle a été acceptée.");
  }

  reservation.status = "confirme";
  await reservation.save();

  return reservation;
};