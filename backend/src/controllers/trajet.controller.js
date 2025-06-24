import { trajetValidation } from "../lib/validators/trajet.validator.js";
import Reservation from "../models/reservation.model.js";
import Trajet from "../models/trajet.model.js";
import {
  annulerTrajetService,
  createTrajetService,
  demarrerTrajetService,
  getAllTrajetsService,
  getFilteredTrajetsService,
  getTrajetByIdService,
  getTrajetsByUserId,
  getReservationsByTrajetService,
  terminerTrajetService,
  getUpcomingTrajetsByUserId,
} from "../services/trajet.service.js";

export const createTrajetController = async (req, res) => {
  try {
    const { error } = trajetValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const trajetData = {
      ...req.body,
      conducteur_id: req.user.id, // utilisateur connecté
    };

    const trajet = await createTrajetService(trajetData);
    return res.status(201).json({ message: "Trajet créé avec succès", trajet });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
};

export const getAllTrajets = async (req, res) => {
  try {
    const trajets = await getAllTrajetsService();
    res.status(200).json(trajets);
  } catch (error) {
    console.error("Erreur lors de la récupération des trajets :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération des trajets" });
  }
};

export const getMyTrajets = async (req, res) => {
  try {
    const userId = req.user.id;
    const trajets = await getTrajetsByUserId(userId);
    res.status(200).json(trajets);
  } catch (error) {
    console.error("Erreur récupération trajets utilisateur :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
export const getMyUpcomingTrajets = async (req, res) => {
  try {
    const userId = req.user.id;
    const trajets = await getUpcomingTrajetsByUserId(userId);
    res.status(200).json(trajets);
  } catch (error) {
    console.error("Erreur récupération trajets à venir :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const getMyReservedUpcoming = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservations = await Reservation.find({
      passager_id: userId,
      status: { $in: ["accepte", "confirme"] },
    }).populate({
      path: "trajet_id",
      populate: {
        path: "conducteur_id", // ceci popule les données du conducteur dans le trajet
        select: "prenom nom photo",
      },
    });

    const trajets = reservations
      .map((r) => r.trajet_id)
      .filter((trajet) => trajet !== null);

    res.status(200).json(trajets);
  } catch (error) {
    console.error("Erreur lors de la récupération des trajets:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getTrajetById = async (req, res) => {
  try {
    const { id } = req.params;
    const trajet = await getTrajetByIdService(id);

    if (!trajet) {
      return res.status(404).json({ message: "Trajet non trouvé" });
    }

    res.status(200).json(trajet);
  } catch (error) {
    console.error("Erreur récupération trajet :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getTrajetsWithFilters = async (req, res) => {
  try {
    const filters = req.query;
    console.log(filters);
    const trajets = await getFilteredTrajetsService(filters);
    res.status(200).json(trajets);
  } catch (error) {
    console.error("Erreur filtrage trajets :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const annulerTrajet = async (req, res) => {
  try {
    const trajetId = req.params.id;
    const updatedTrajet = await annulerTrajetService(trajetId);

    res
      .status(200)
      .json({ message: "Trajet annulé avec succès", trajet: updatedTrajet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const demarrerTrajet = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // depuis middleware protect
    const trajet = await demarrerTrajetService(id, userId);
    res.status(200).json({ message: "Trajet démarré", trajet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const terminerTrajet = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const trajet = await terminerTrajetService(id, userId);
    res.status(200).json({ message: "Trajet terminé avec succès", trajet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getReservationsByTrajet = async (req, res) => {
  try {
    const { trajetId } = req.params;
    const userId = req.user._id;

    const reservations = await getReservationsByTrajetService(trajetId, userId);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getHistoriqueConducteur = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const trajets = await Trajet.find({
      conducteur_id: userId,
      status: { $in: ["termine", "annulee"] },
    }).sort({ date_depart: -1 });
    res.status(200).json(trajets);
  } catch (error) {
    next(error);
  }
};

export const getHistoriquePassager = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const reservations = await Reservation.find({
      passager_id: userId,
  status: { $in: ["accepte", "confirme"] },
    }).populate({
      path: "trajet_id",
      match: { status: { $in: ["termine", "annulee"] } },
    });

    // Ne garder que les trajets valides
    const trajets = reservations
      .filter((r) => r.trajet_id)
      .map((r) => r.trajet_id);

    res.status(200).json(trajets);
  } catch (error) {
    next(error);
  }
};