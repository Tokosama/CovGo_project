import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
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
    conducteur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    commentaire: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Evaluation = mongoose.model("Evaluation", evaluationSchema);
export default Evaluation;
