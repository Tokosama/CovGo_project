import Joi from "joi";

// Validator pour le téléphone : doit commencer par '01' suivi de 8 chiffres (total 10 chiffres)
const phoneRegex = /^01\d{8}$/;

export const UserValidator = Joi.object({
  nom: Joi.string().trim().required().messages({
    "any.required": "Le nom est obligatoire",
    "string.empty": "Le nom ne peut pas être vide",
  }),

  prenom: Joi.string().trim().required().messages({
    "any.required": "Le prénom est obligatoire",
    "string.empty": "Le prénom ne peut pas être vide",
  }),

  email: Joi.string().email().trim().lowercase().required().messages({
    "any.required": "L'email est obligatoire",
    "string.email": "Email invalide",
  }),

  telephone: Joi.string().pattern(phoneRegex).required().messages({
    "any.required": "Le téléphone est obligatoire",
    "string.pattern.base":
      "Le téléphone doit commencer par '01' suivi de 8 chiffres",
  }),

  adresse: Joi.string().trim().allow("").optional(),

  role: Joi.string()
    .valid("admin", "conducteur", "passager")
    .required()
    .messages({
      "any.only": "Le rôle doit être 'admin', 'conducteur' ou 'passager'",
      "any.required": "Le rôle est obligatoire",
    }),

  statut: Joi.string().valid("inactif", "actif").optional(),

  password: Joi.string().min(6).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    "any.required": "Le mot de passe est obligatoire",
  }),
});


export const LoginValidator = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(6).required().label("Mot de passe"),
});