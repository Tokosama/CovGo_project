import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    trajet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trajet",
      required: true,
    },
    passager_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    places: {
      type: Number,
      required: true,
      min: 1,
    },
    prix_total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["en attente", "accepte", "confirme", "rejete", "annulee"],
      default: "en attente",
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
