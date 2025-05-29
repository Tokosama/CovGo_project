import mongoose from "mongoose";

const vehiculeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     immatriculation: {
      type: String,
      required:true,
    },
    marque: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    couleur: {
      type: String,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const Vehicule = mongoose.model("Vehicule", vehiculeSchema);

export default Vehicule;
