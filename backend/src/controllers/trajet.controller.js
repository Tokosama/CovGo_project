import { annulerTrajetService, createTrajetService, demarrerTrajetService, getAllTrajetsService,  getFilteredTrajetsService, getTrajetByIdService, getTrajetsByUserId, getReservationsByTrajetService } from "../services/trajet.service.js";

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
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const getAllTrajets = async (req, res) => {
  try {
    const trajets = await getAllTrajetsService()
    res.status(200).json(trajets);
  } catch (error) {
    console.error("Erreur lors de la récupération des trajets :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des trajets" });
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

    res.status(200).json({ message: "Trajet annulé avec succès", trajet: updatedTrajet });
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