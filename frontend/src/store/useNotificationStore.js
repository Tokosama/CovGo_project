import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  isLoading: false,
  get unreadCount() {
    return this.notifications.filter((n) => !n.vue).length;
  },
  // Récupère toutes les notifications du user connecté
  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/notifications");
      set({ notifications: res.data });
    } catch (error) {
      console.error("Erreur fetchNotifications:", error);
      toast.error("Échec du chargement des notifications");
    } finally {
      set({ isLoading: false });
    }
  },

  // Marquer une notification comme vue
  markAsRead: async (notificationId) => {
    try {
      await axiosInstance.put(`/notifications/${notificationId}/mark-as-read`);
      set((state) => ({
        notifications: state.notifications.map((notif) =>
          notif._id === notificationId ? { ...notif, vue: true } : notif
        ),
      }));
    } catch (error) {
      console.error("Erreur markAsRead:", error);
      toast.error("Impossible de marquer comme vue");
    }
  },

  // Marquer toutes comme lues
  markAllAsRead: async () => {
    try {
      await axiosInstance.put("/notifications/mark-all-as-read");
      set((state) => ({
        notifications: state.notifications.map((notif) => ({
          ...notif,
          vue: true,
        })),
      }));
    } catch (error) {
      console.error("Erreur markAllAsRead:", error);
      toast.error("Impossible de marquer toutes les notifications");
    }
  },
}));
