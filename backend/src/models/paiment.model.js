import mongoose from "mongoose";

const paiementSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reservation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    montant: { type: Number, required: true },
    devise: { type: String, default: "XOF" },
    methode_paiement: {
      type: String,
      enum: ["mobile_money", "carte", "wallet"],
      required: true,
      default: "mobile_money",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "failed", "completed"],
      default: "pending",
    },
    reference: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("Paiement", paiementSchema);
