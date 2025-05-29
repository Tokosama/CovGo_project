import Joi from "joi";

export const justificatifsValidation = Joi.object({
  justificatifs: Joi.array()
    .items(
      Joi.object({
        type: Joi.string()
          .valid("CNI", "PERMIS DE CONDUIRE", "CIP", "PASSEPORT")
          .required(),
        // pas de validation fichier ici, car c’est uploadé à part
      })
    )
    .min(1)
    .required(),
});
