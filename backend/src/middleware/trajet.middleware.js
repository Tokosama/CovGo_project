import Trajet from '../models/trajet.model.js';

// Middleware pour vérifier que le conducteur est propriétaire du trajet
export const verifyConducteurOwnership = async (req, res, next) => {
  const trajetId = req.params.id;
  const userId = req.user._id; // on suppose que req.user contient l’utilisateur connecté

  try {
    const trajet = await Trajet.findById(trajetId);
    if (!trajet) {
      return res.status(404).json({ message: "Trajet non trouvé" });
    }

    if (trajet.conducteur_id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Accès refusé : vous n'êtes pas le propriétaire de ce trajet" });
    }

    req.trajet = trajet; // on peut stocker le trajet dans req pour éviter une 2e requête
    next();
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
