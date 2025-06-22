import Joi from "joi";

export const trajetValidation = Joi.object({
  ville: Joi.string()
    .valid("Cotonou", "Porto-Novo", "Abomey", "Parakou")
    .required(),

  depart: Joi.string().required(),
  destination: Joi.string().required(),

  description: Joi.string().allow(""),

  date_depart: Joi.date().iso().required(),

  heure_depart: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "heure_depart doit être au format HH:mm",
    }),

  places: Joi.number().integer().min(1).required(),

  prix: Joi.number().positive().required(),

  preferences: Joi.string().allow(""),

  type_trajet: Joi.string().valid("ponctuel", "reccurent"),
  status: Joi.string()
    .valid("en cours", "termine", "annulee", "disponible", "complet")
    .default("disponible"),
    vehicule: Joi.string().allow("")
});
