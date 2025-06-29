import { annulerReservationService, confirmerReservationService, createReservationService,  getMyReservationsService,  getReservationsForConducteur, updateReservationStatusService } from "../services/reservation.service.js";

export const createReservation = async (req, res) => {
  try {
    const { trajet_id, places } = req.body;

    if (req.user.role !== "passager") {
      return res.status(403).json({ message: "Seuls les passagers peuvent effectuer une réservation." });
    }

    if (!trajet_id || !places || places < 1) {
      return res.status(400).json({ message: "Veuillez fournir un trajet et un nombre de places valide." });
    }

    const reservation = await createReservationService({
      trajet_id,
      passager_id: req.user.id,
      places: parseInt(places),
    });

    return res.status(201).json({ message: "Réservation créée avec succès.", reservation });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateReservationStatus = async (req, res) => {
  try {
    console.log(req.body)
    const { id } = req.params; // id de la réservation
    const { action } = req.body; // "accepter" ou "rejeter"
    const conducteurId = req.user._id;

    const updatedReservation = await updateReservationStatusService(id, conducteurId, action);
    res.status(200).json({ message: `Réservation ${action}e avec succès`, reservation: updatedReservation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const annulerReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const userId = req.user._id; // utilisateur connecté
    const reservation = await annulerReservationService(reservationId, userId);
    return res.status(200).json({ message: "Réservation annulée avec succès.", reservation });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



export const confirmerReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const passagerId = req.user._id;

    const confirmedReservation = await confirmerReservationService(id, passagerId);

    res.status(200).json({
      message: "Réservation confirmée avec succès",
      reservation: confirmedReservation,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyReservationsController = async (req, res) => {
  try {
    const reservations = await getMyReservationsService(req.user._id);
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des réservations",
    });
  }
};




export const getReservationsForConducteurController = async (req, res) => {
  try {
    const conducteurId = req.user._id;
    const reservations = await getReservationsForConducteur(conducteurId);

    res.status(200).json({ success: true, reservations });
  } catch (error) {
    console.error('Erreur récupération réservations conducteur :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};




