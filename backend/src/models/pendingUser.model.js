import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema(
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
    bio: {
      type: String,
      required: false,
      default: "",
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

    otpCode: {
      type: String,
      required: true,
    },

    otpExpires: {
      type: Date,
      required: true,

      expires: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PendingUser", pendingUserSchema);
