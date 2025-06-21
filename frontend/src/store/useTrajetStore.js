import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTrajetStore = create((set) => ({
  trajets: [],
  isSearching: false,
  error: null,
  isGetting: false,
  allReservationForDriver: [],
  statusChangeTrigger: 0,
  // 🔍 Rechercher des trajets avec filtres
  searchTrajets: async (filters) => {
    set({ isSearching: true, error: null });
    try {
      console.log(filters);
      const res = await axiosInstance.get("/trajet/filter", {
        params: filters, // Ex: ?ville=Cotonou&depart=Ganhi
      });
      set({ trajets: res.data });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la recherche de trajets";
      set({ error: message });
      toast.error(message);
    } finally {
      set({ isSearching: false });
    }
  },

  getAllDriverReservation: async () => {
    set({ isGetting: true, error: null });
    try {
      const res = await axiosInstance.get(
        "/reservation/mes-reservations-conducteur"
      );
      console.log(res);
      set({ allReservationForDriver: res.data });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la recherche de trajets";
      set({ error: message });
      toast.error(message);
    } finally {
      set({ isGetting: false });
    }
  },

  updateReservationStatus: async (id, action) => {
    try {
      const res = await axiosInstance.patch(`/reservation/${id}/status`, {
        action,
      });
      toast.success(res.data.message);

      set((state) => ({
        allReservationForDriver: state.allReservationForDriver.reservations.map(
          (r) => (r._id === id ? { ...r, status: action } : r)
        ),
        statusChangeTrigger: state.statusChangeTrigger + 1,
      }));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Erreur lors de la mise à jour"
      );
    }
  },
}));
