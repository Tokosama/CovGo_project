import mongoose from "mongoose";

const trajetSchema = new mongoose.Schema(
  {
    conducteur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ville: {
      type: String,
      enum: ["Cotonou", "Porto-Novo", "Abomey", "Parakou"],
      required: true,
      trim: true,
    },
    depart: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date_depart: {
      type: Date,
      required: true,
    },
    heure_depart: {
      type: String, // Ex: "14:30"
      required: true,
      validate: {
        validator: (val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val),
        message: "L'heure de départ doit être au format HH:mm",
      },
    },
    places: {
      type: Number,
      required: true,
      min: [1, "Le nombre de places doit être au moins 1"],
    },
    prix: {
      type: Number,
      required: true,
      min: [0, "Le prix doit être supérieur ou égal à 0"],
    },
    preferences: {
      type: String,
      default: "",
      trim: true,
    },
    type_trajet: {
      type: String,
      enum: ["ponctuel", "reccurent"],
      required: true,
    },
    status: {
      type: String,
      enum: ["en cours", "termine", "annulee", "disponible", "complet"],
      default: "disponible",
    },
    
    point_depart_lat: {
      type: Number,
      default: null,
    },
    point_depart_lng: {
      type: Number,
      default: null,
    },
    destination_lat: {
      type: Number,
      default: null,
    },
    destination_lng: {
      type: Number,
      default: null,
    },
    itineraire_estime: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Trajet = mongoose.model("Trajet", trajetSchema);

export default Trajet;

("en cours, termine , annulee, disponible,complet ");
