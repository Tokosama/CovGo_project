import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useProfilStore = create((set, get) => ({
  permis: null,
  photoPermis: null,
  errors: {},
  setPermis: (file) => set({ permis: file }), // stocke File
  setPhotoPermis: (file) => set({ photoPermis: file }),
  setErrors: (newErrors) => set({ errors: newErrors }),

  validatePermisInfo: () => {
    const state = get();
    const newErrors = {};

    if (!state.permis) newErrors.permis = "Le fichier du permis est requis.";
    if (!state.photoPermis) newErrors.photoPermis = "La photo est requise.";

    const isValid = Object.keys(newErrors).length === 0;

    set({ errors: newErrors });

    return { isValid, errors: newErrors };
  },

  submitJustificatifs: async () => {
    const { permis, photoPermis, validatePermisInfo } = get();

    const validation = validatePermisInfo();
    if (!validation.isValid) {
      toast.error("Veuillez corriger les erreurs avant de soumettre.");
      return { success: false, errors: validation.errors };
    }

    try {
      const formData = new FormData();

      // Le backend attend req.files (un tableau) + req.body.justificatifs (des métadonnées JSON)
      const justificatifsMeta = [{ type: "permis" }, { type: "photo_permis" }];

      formData.append("justificatifs", JSON.stringify(justificatifsMeta));
      formData.append("files", permis); // doit être un File
      formData.append("files", photoPermis); // doit être un File

      const response = await axiosInstance.post(
        "/justificatif/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Justificatifs envoyés avec succès !");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Erreur upload justificatifs :", error);
      toast.error(error?.response?.data?.message);
      return { success: false, error: error.message };
    }
  },

  resetPermisData: () => set({ permis: null, photoPermis: null, errors: {} }),
}));
