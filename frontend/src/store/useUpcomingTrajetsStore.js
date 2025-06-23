// src/store/useUpcomingTrajetsStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUpcomingTrajetsStore = create((set) => ({
  trajets: [],
  isLoading: false,
  error: null,

  fetchUpcomingTrajets: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("trajet/me/upcoming"); // adapte si besoin

      console.log(res.data);

      set({ trajets: res.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchReservedUpcoming: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/trajet/me/reservedUpcoming");
      set({ trajets: res.data });
    } catch (err) {
      toast.error("Erreur lors de la récupération des trajets réservés.");
    } finally {
      set({ isLoading: false });
    }
  },
}));
