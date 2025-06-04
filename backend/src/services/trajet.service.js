import Trajet from "../models/trajet.model.js";
import Reservation from "../models/reservation.model.js";

export const createTrajetService = async (trajetData) => {
  const newTrajet = new Trajet(trajetData);
  return await newTrajet.save();
};

export const getAllTrajetsService = async () => {
  const trajets = await Trajet.find().populate("conducteur_id", "-password");
  return trajets;
};

export const getTrajetsByUserId = async (userId) => {
  return await Trajet.find({ conducteur_id: userId });
};

export const getTrajetByIdService = async (trajetId) => {
  const trajet = await Trajet.findById(trajetId).populate("conducteur_id", "-password"); // facultatif : populate conducteur
  return trajet;
};

export const getFilteredTrajetsService = async (filters) => {
  const query = {};

  if (filters.ville) query.ville = filters.ville;
  if (filters.depart) query.depart = filters.depart;
  if (filters.destination) query.destination = filters.destination;
  if (filters.date_depart) query.date_depart = { $gte: new Date(filters.date_depart) };
  if (filters.prix) query.prix = { $lte: Number(filters.prix) };

  return await Trajet.find(query);
};

export const annulerTrajetService = async (trajetId) => {
  const trajet = await Trajet.findById(trajetId);
  if (!trajet) {
    throw new Error("Trajet non trouvé");
  }

  // Règle 1 : Déjà annulé
//   if (trajet.status === "annulee") {
//     throw new Error("Ce trajet est déjà annulé");
//   }

  // Règle 2 : Déjà terminé
  if (trajet.status === "termine") {
    throw new Error("Impossible d'annuler un trajet terminé");
  }

  // Règle 3 (optionnelle) : Complet
  if (trajet.status === "en cours") {
    throw new Error("Impossible d'annuler un trajet en cours");
  }

  // Règle 4 : Date déjà passée
//   const maintenant = new Date();
//   if (trajet.date_depart < maintenant) {
//     throw new Error("Impossible d'annuler un trajet dont la date de départ est passée");
//   }

  // Si toutes les règles sont respectées
  trajet.status = "annulee";
  await trajet.save();

  return trajet;
};

export const demarrerTrajetService = async (trajetId, userId) => {
  const trajet = await Trajet.findById(trajetId);
  if (!trajet) {
    throw new Error("Trajet non trouvé");
  }

  if (trajet.conducteur_id.toString() !== userId.toString()) {
    throw new Error("Vous n'êtes pas autorisé à démarrer ce trajet");
  }
  if (trajet.status === "termine") {
    throw new Error("Impossible de commencer  un trajet terminé");
  }
  if (trajet.status === "annulee") {
    throw new Error("Impossible de commencer  un trajet annulee");
  }
  // Règle 3 (optionnelle) : Complet
  if (trajet.status === "en cours") {
    throw new Error("Le trajet est deja en cours");
  }
  const now = new Date();
  const dateTrajet = new Date(trajet.date_depart);

  if (now < dateTrajet) {
    throw new Error("Le trajet ne peut pas encore être démarré");
  }

  trajet.status = "en cours";
  await trajet.save();

  return trajet;
};

export const terminerTrajetService = async (trajetId, userId) => {
  const trajet = await Trajet.findById(trajetId);
  if (!trajet) {
    throw new Error("Trajet non trouvé");
  }

  if (trajet.conducteur_id.toString() !== userId.toString()) {
    throw new Error("Vous n'êtes pas autorisé à terminer ce trajet");
  }

if (trajet.status === "termine") {
    throw new Error("Le trajet est deja terminee");
  }
  if (trajet.status === "annulee") {
    throw new Error("Impossible de terminer un trajet annulee");
  }
  // Règle 3 (optionnelle) : Complet
  if (trajet.status === "disponible") {
    throw new Error("Impossible de terminer un trajet disponible");
  }
  trajet.status = "termine";
  await trajet.save();

  return trajet;
};

export const getReservationsByTrajetService = async (trajetId, userId) => {
  // Vérifier que le trajet existe
  const trajet = await Trajet.findById(trajetId);
  if (!trajet) {
    throw new Error("Trajet introuvable");
  }

  // Vérifier que l'utilisateur connecté est le conducteur
  if (trajet.conducteur_id.toString() !== userId.toString()) {
    throw new Error("Accès non autorisé aux réservations de ce trajet");
  }

  // Récupérer les réservations liées à ce trajet
  const reservations = await Reservation.find({ trajet_id: trajetId })
    .populate("passager_id", "nom email telephone") // limiter les champs
    .sort({ createdAt: -1 });

  return reservations;
};