import mongoose from "mongoose";

const justificatifSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["CNI", "PERMIS DE CONDUIRE", "CIP", "PASSEPORT"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Justificatif = mongoose.model("Justificatif", justificatifSchema);

export default Justificatif;
