import { vehiculeValidator } from "../lib/validators/vehicule.validator.js";
import { createVehiculeService } from "../services/vehicule.service.js";
import Vehicule from "../models/vehicule.model.js";

export const createVehicule = async (req, res, next) => {
  try {
    const { error, value } = vehiculeValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const vehiculeData = {
      ...value,
      user_id: req.user._id, // utilisateur connecté (conducteur)
    };

    const vehicule = await createVehiculeService(vehiculeData);

    res
      .status(201)
      .json({ message: "Véhicule ajouté avec succès", data: vehicule });
  } catch (err) {
    next(err);
  }
};

export const getVehiculesByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const vehicules = await Vehicule.find({ user_id: userId });

    res.status(200).json({ data: vehicules });
  } catch (err) {
    next(err);
  }
};

export const deleteVehicule = async (req, res, next) => {
  try {
    const { vehiculeId } = req.params;

    // Vérifie d'abord que le véhicule appartient bien à l'utilisateur
    const vehicule = await Vehicule.findOne({
      _id: vehiculeId,
      user_id: req.user._id,
    });

    if (!vehicule) {
      return res
        .status(404)
        .json({ message: "Véhicule introuvable ou non autorisé" });
    }

    await Vehicule.findByIdAndDelete(vehiculeId);

    res.status(200).json({ message: "Véhicule supprimé avec succès" });
  } catch (err) {
    next(err);
  }
};
