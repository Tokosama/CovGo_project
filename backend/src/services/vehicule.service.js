import Vehicule from "../models/vehicule.model.js";

export const createVehiculeService = async (vehiculeData) => {
  const existingVehicule = await Vehicule.findOne({ user_id: data.user_id });

  if (existingVehicule) {
    throw new Error("Vous avez déjà un véhicule enregistré.");
  }
  const vehicule = new Vehicule(vehiculeData);
  return await vehicule.save();
};
