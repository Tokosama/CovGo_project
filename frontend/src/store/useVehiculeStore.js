import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useVehiculeStore = create((set, get) => ({
  vehicules: [],
  isLoading: false,
  isSubmitting: false,
  isFetching: false,

  fetchVehicules: async () => {
    set({ isFetching: true });
    try {
      const res = await axiosInstance.get("/vehicule/mes-vehicules");
      set({ vehicules: res.data.data || [] });
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Erreur lors de la récupération des véhicules:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de la récupération des véhicules";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isFetching: false });
    }
  },

  // Ajouter un nouveau véhicule
  addVehicule: async (vehiculeData) => {
    set({ isSubmitting: true });
    try {
      const res = await axiosInstance.post("/vehicule", vehiculeData);

      const currentVehicules = get().vehicules;
      set({ vehicules: [...currentVehicules, res.data.data] });

      toast.success("Véhicule ajouté avec succès !");
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule:", error);
      const errorMessage =
        error.response?.data?.message || "Erreur lors de l'ajout du véhicule";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isSubmitting: false });
    }
  },

  removeVehicule: async (vehiculeId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/vehicule/${vehiculeId}`);

      const currentVehicules = get().vehicules;
      const updatedVehicules = currentVehicules.filter(
        (v) => v._id !== vehiculeId
      );
      set({ vehicules: updatedVehicules });

      toast.success("Véhicule supprimé avec succès !");
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la suppression du véhicule:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de la suppression du véhicule";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isLoading: false });
    }
  },

  // Mettre à jour un véhicule (si vous avez l'endpoint PUT/PATCH)
  // updateVehicule: async (vehiculeId, vehiculeData) => {
  //   set({ isSubmitting: true });
  //   try {
  //     const res = await axiosInstance.patch(
  //       `/vehicule/${vehiculeId}`,
  //       vehiculeData
  //     );

  //     const currentVehicules = get().vehicules;
  //     const updatedVehicules = currentVehicules.map((v) =>
  //       v._id === vehiculeId ? res.data.vehicule : v
  //     );
  //     set({ vehicules: updatedVehicules });

  //     toast.success("Véhicule mis à jour avec succès !");
  //     return { success: true, data: res.data };
  //   } catch (error) {
  //     console.error("Erreur lors de la mise à jour du véhicule:", error);
  //     const errorMessage =
  //       error.response?.data?.message ||
  //       "Erreur lors de la mise à jour du véhicule";
  //     toast.error(errorMessage);
  //     return { success: false, error: errorMessage };
  //   } finally {
  //     set({ isSubmitting: false });
  //   }
  // },

  resetVehicules: () => {
    set({
      vehicules: [],
      isLoading: false,
      isSubmitting: false,
      isFetching: false,
    });
  },
}));
