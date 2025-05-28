import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Email invalide"],
    },
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    prenom: {
      type: String,
      required: true,
      trim: true,
    },
    telephone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    adresse: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      required: false,
      default: "",
    },
    statut: {
      type: String,
      enum: ["inactif", "actif"],
      default: "inactif",
    },

    role: {
      type: String,
      enum: ["admin", "conducteur", "passager"],
      required: true,
    },
    verifie: {
      type: Boolean,
      default: false,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
