import { vehiculeValidator } from "../lib/validators/vehicule.validator.js";
import { createVehiculeService } from "../services/vehicule.service.js";

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

    res.status(201).json({ message: "Véhicule ajouté avec succès", data: vehicule });
  } catch (err) {
    next(err);
  }
};
