import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useProfilStore = create((set, get) => ({
  permis: null,
  photoPermis: null,

  documentFile: null,
  documentType: null,

  errors: {},
  justificatifs: null,
  isFetchingJustificatifs: false,

  setPermis: (file) => set({ permis: file }),
  setPhotoPermis: (file) => set({ photoPermis: file }),

  setDocumentFile: (file) => set({ documentFile: file }),
  setDocumentType: (type) => set({ documentType: type }),

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

  validateDocument: (userRole) => {
    const state = get();
    const newErrors = {};

    if (!state.documentFile) {
      const docLabel =
        userRole === "conducteur"
          ? "permis de conduire"
          : "document d'identité";
      newErrors.documentFile = `Le fichier du ${docLabel} est requis.`;
    }

    if (!state.documentType) {
      newErrors.documentType = "Le type de document est requis.";
    }

    if (
      userRole === "conducteur" &&
      state.documentType !== "PERMIS DE CONDUIRE"
    ) {
      newErrors.documentType =
        "Les conducteurs doivent obligatoirement soumettre leur permis de conduire.";
    }

    const isValid = Object.keys(newErrors).length === 0;
    set({ errors: newErrors });
    return { isValid, errors: newErrors };
  },

  submitJustificatifs: async (formDataOrParams) => {
    try {
      let formData;

      if (formDataOrParams instanceof FormData) {
        formData = formDataOrParams;
      } else {
        const state = get();
        formData = new FormData();

        if (formDataOrParams?.useOldSystem) {
          const { permis, photoPermis, validatePermisInfo } = state;

          const validation = validatePermisInfo();
          if (!validation.isValid) {
            toast.error("Veuillez corriger les erreurs avant de soumettre.");
            return { success: false, errors: validation.errors };
          }

          const justificatifsMeta = [
            { type: "PERMIS DE CONDUIRE" },
            { type: "PHOTO_PERMIS" },
          ];

          formData.append("justificatifs", JSON.stringify(justificatifsMeta));
          formData.append("files", permis);
          formData.append("files", photoPermis);
        } else {
          const { documentFile, documentType } = state;
          const userRole = formDataOrParams?.userRole || "passager";

          const validation = get().validateDocument(userRole);
          if (!validation.isValid) {
            toast.error("Veuillez corriger les erreurs avant de soumettre.");
            return { success: false, errors: validation.errors };
          }

          const justificatifsMeta = [{ type: documentType }];
          formData.append("justificatifs", JSON.stringify(justificatifsMeta));
          formData.append("files", documentFile);
        }
      }

      const response = await axiosInstance.post(
        "/justificatif/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Document(s) soumis avec succès !");

      set({
        documentFile: null,
        documentType: null,
        permis: null,
        photoPermis: null,
        errors: {},
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Erreur upload justificatifs :", error);
      const errorMessage =
        error?.response?.data?.message || "Erreur lors de l'envoi du document";
      toast.error(errorMessage);
      return { success: false, error: error.message };
    }
  },

  fetchJustificatifs: async (userId) => {
    set({ isFetchingJustificatifs: true });

    try {
      const response = await axiosInstance.get(`/justificatif/${userId}`);
      set({ justificatifs: response.data.data });
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des justificatifs :",
        error
      );
      toast.error(
        error?.response?.data?.message ||
          "Erreur lors de la récupération des justificatifs"
      );
      set({ justificatifs: null });
      return { success: false, error: error.message };
    } finally {
      set({ isFetchingJustificatifs: false });
    }
  },

  hasRequiredDocuments: (userRole, justificatifs = null) => {
    const docs = justificatifs || get().justificatifs;
    console.log("Checking documents for role:", userRole, "Documents:", docs);
    if (!docs || !Array.isArray(docs)) return false;

    if (userRole === "conducteur") {
      return docs.some((doc) => doc.type === "PERMIS DE CONDUIRE");
    } else {
      const passengerDocs = ["CNI", "CIP", "PASSEPORT"];
      return docs.some((doc) => passengerDocs.includes(doc.type));
    }
  },

  resetPermisData: () =>
    set({
      permis: null,
      photoPermis: null,
      documentFile: null,
      documentType: null,
      errors: {},
    }),
}));
