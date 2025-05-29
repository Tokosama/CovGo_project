import Justificatif from "../models/justificatif.model.js";
import { uploadToCloudinary } from "../lib/cloudinary.js"; // ou le bon chemin

export async function createJustificatifs(userId, justificatifs) {
  const savedDocs = [];

  for (const justificatif of justificatifs) {
    // Upload du buffer vers Cloudinary avec ta fonction utils
    const imageUrl = await uploadToCloudinary(justificatif.file.buffer);

    const newJustificatif = new Justificatif({
      user_id: userId,
      type: justificatif.type,
      url: imageUrl,
    });

    await newJustificatif.save();
    savedDocs.push(newJustificatif);
  }

  return savedDocs;
}

export async function getJustificatifsByUser(userId) {
  return Justificatif.find({ user_id: userId }).sort({ createdAt: -1 });
}