import Notification from "../models/notification.model.js";
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

  const savedReservation = await nouvelleReservation.save();

  // Création de la notification pour le conducteur
  const notif = new Notification({
    user_id: trajet.conducteur_id, // c'est le conducteur, destinataire de la notif
    type: "reservation_en_attente",
    contenue: `Une nouvelle réservation a été effectuée pour votre trajet de ${trajet.depart} à ${trajet.destination}.`,
    vue: false,
  });

  await notif.save();

  return savedReservation;
};

export const updateReservationStatusService = async (
  reservationId,
  conducteurId,
  action
) => {
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
  if (action === "accepte") {
    reservation.status = "accepte";
  } else if (action === "rejete") {
    reservation.status = "rejete";
  } else {
    throw new Error("Action invalide.");
  }

  await reservation.save();
  // Création de la notification pour le passager
  const contenuNotif =
    action === "accepte"
      ? `Votre réservation pour le trajet de ${trajet.depart} à ${trajet.destination} a été acceptée. Veuillez Procéder au paiement `
      : `Votre réservation pour le trajet de ${trajet.depart} à ${trajet.destination} a été rejetée.`;

  const notif = new Notification({
    user_id: reservation.passager_id, // destinataire : passager
    type: action === "accepte" ? "reservation_acceptee" : "reservation_rejetee",
    contenue: contenuNotif,
    vue: false,
  });

  await notif.save();

  return reservation;
};

export const annulerReservationService = async (reservationId, userId) => {
  const reservation = await Reservation.findById(reservationId);

  if (!reservation) {
    throw new Error("Réservation introuvable.");
  }

  if (!reservation.passager_id.equals(userId)) {
    throw new Error("Vous n'êtes pas autorisé à annuler cette réservation.");
  }

  if (reservation.status === "confirme") {
    throw new Error("Une réservation confirmée ne peut pas être annulée.");
  }

  if (["annulee", "rejete"].includes(reservation.status)) {
    throw new Error("Cette réservation est déjà annulée ou rejetée.");
  }

  reservation.status = "annulee";
  await reservation.save();

  // Récupérer le trajet pour connaître le conducteur
  const trajet = await Trajet.findById(reservation.trajet_id);
  if (!trajet) {
    throw new Error("Trajet associé introuvable.");
  }

  // Récupérer le nom du passager (optionnel, pour enrichir le message)
  const passager = await User.findById(userId);

  const contenuNotif = `Le passager ${
    passager ? `${passager.prenom} ${passager.nom}` : "non passager"
  } a annulé sa réservation pour le trajet de ${trajet.depart} à ${
    trajet.destination
  }.`;

  const notif = new Notification({
    user_id: trajet.conducteur_id, // destinataire : conducteur
    type: "reservation_annulee",
    contenue: contenuNotif,
    vue: false,
  });

  await notif.save();

  return reservation;
};

export const confirmerReservationService = async (
  reservationId,
  passagerId
) => {
  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    throw new Error("Réservation non trouvée.");
  }

  if (reservation.passager_id.toString() !== passagerId.toString()) {
    throw new Error("Vous n'êtes pas autorisé à confirmer cette réservation.");
  }

  if (reservation.status !== "accepte") {
    throw new Error(
      "La réservation ne peut être confirmée que si elle a été acceptée."
    );
  }

  reservation.status = "confirme";
  await reservation.save();

  // Récupérer le trajet pour savoir à quel conducteur envoyer la notif
  const trajet = await Trajet.findById(reservation.trajet_id);
  if (!trajet) {
    throw new Error("Trajet associé introuvable.");
  }

  // Créer la notification pour le conducteur
  const notif = new Notification({
    user_id: trajet.conducteur_id, // destinataire = conducteur
    type: "reservation_confirmee",
    contenue: `Le passager a confirmé la réservation pour le trajet de ${trajet.depart} à ${trajet.destination}.`,
    vue: false,
  });

  await notif.save();

  return reservation;
};

export const getMyReservationsService = async (userId) => {
  return await Reservation.find({ passager_id: userId })
    .populate("trajet_id") // facultatif
    .sort({ createdAt: -1 });
};

export const getReservationsByUserId = async (userId) => {
  console.log(userId);
  return await Reservation.find({ passager_id: userId }) // ou utilisateur_id selon ton modèle
    .populate("trajet_id") // si tu veux les infos du trajet
    .sort({ createdAt: -1 }); // optionnel : les plus récentes en premier
};

export const getReservationsForConducteur = async (conducteurId) => {
  // Étape 1 : trouver les trajets disponibles du conducteur
  const trajets = await Trajet.find({
    conducteur_id: conducteurId,
    status: "disponible",
  }).select("_id");

  const trajetIds = trajets.map((t) => t._id);

  // Étape 2 : récupérer les réservations associées avec le statut "en_attente"
  const reservations = await Reservation.find({
    trajet_id: { $in: trajetIds },
    status: "en attente", // <-- Ajout du filtre ici
  })
    .populate("trajet_id")
    .populate("passager_id")
    .sort({ createdAt: -1 });

  return reservations;
};
