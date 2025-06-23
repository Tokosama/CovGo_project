import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTrajetStore = create((set,get) => ({
  trajets: [],
  isSearching: false,
  error: null,
  isGetting: false,
  allReservationForDriver: [],
  statusChangeTrigger: 0,
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
  createReservation: async ({ trajet_id, places }) => {
    try {
      const res = await axiosInstance.post("/reservation/create", {
        trajet_id,
        places,
      });
      toast.success(res.data.message || "Réservation envoyée !");
      return res.data;
    } catch (err) {
      const msg =
        err.response?.data?.message || "Erreur lors de la réservation";
      toast.error(msg);
      throw new Error(msg);
    }
  },
  getAllPassengerReservations: async () => {
    set({ isGetting: true, error: null });
    try {
      const res = await axiosInstance.get(
        "/reservation/mes-reservations-passager"
      );
      console.log(res);
      set({ allReservationForPassenger: res.data.data });
    //  toast.success(res.data.message || "Vous avez bien annuler la reservation");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la récupération des réservations";
      set({ error: message });
      toast.error(message);
    } finally {
      set({ isGetting: false });
    }
  },
  annulerReservation: async (reservationId) => {
    try {
      set({ isGetting: true });
      await axiosInstance.put(`/reservation/${reservationId}/annuler`);
      // Tu peux déclencher un rafraîchissement ici
      await get().getAllPassengerReservations();
      toast.success("Vous avez bien annuler la reservation");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de l'annulation"
      );
    } finally {
      set({ isGetting: false });
    }
  },

  confirmerReservation: async (reservationId) => {
    try {
      set({ isGetting: true });
      await axiosInstance.put(`/reservation/${reservationId}/confirmer`);
      await get().getAllPassengerReservations();
      toast.success("Votre réservation à bien été confirmé");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la confirmation"
      );
    } finally {
      set({ isGetting: false });
    }
  },
  createTrajet: async (data) => {
    try {
      const res = await axiosInstance.post("/trajet/create", data);
      toast.success(res.data.message || "Trajet publié avec succès !");
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Erreur lors de la publication du trajet";
      toast.error(message);
      throw new Error(message);
    }
  },
}));
