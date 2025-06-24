import Vehicule from "../models/vehicule.model.js";

export const createVehiculeService = async (vehiculeData) => {
  // Vérifie si un véhicule avec la même immatriculation existe déjà
  const existingVehicule = await Vehicule.findOne({
    immatriculation: vehiculeData.immatriculation,
  });

  if (existingVehicule) {
    throw new Error("Cette immatriculation est déjà utilisée.");
  }

  // Création du nouveau véhicule
  const vehicule = new Vehicule(vehiculeData);
  return await vehicule.save();
};

