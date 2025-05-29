import Joi from "joi";

export const vehiculeValidator = Joi.object({
  immatriculation: Joi.string().required(),
  marque: Joi.string().required(),
  model: Joi.string().required(),
  couleur: Joi.string().required(),
});
