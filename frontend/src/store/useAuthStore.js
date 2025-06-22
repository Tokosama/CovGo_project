import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE ==="development" ?"http://localhost:5001" :"/";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isVerifying: false,
  isResendingOTP: false,

  onlineUsers: [],

  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, isCheckingAuth: false });
      get().connectSocket();

    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null, isCheckingAuth: false });
      if (error.response && error.response.status !== 401) {
        toast.error("Erreur de connexion au serveur");
      }
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      console.log("Données d'inscription:", data);
      const res = await axiosInstance.post("/auth/register", data);

      toast.success("Inscription réussie ! Un code OTP vous a été envoyé.");
      return { success: true, data: res.data };
      get().connectSocket();

    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      const errorMessage =
        error.response?.data?.message || "Erreur lors de l'inscription";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      console.log("Tentative de connexion...");
      await axiosInstance.post("/auth/login", data);

      const authRes = await axiosInstance.get("/auth/check");
      set({ authUser: authRes.data });

      if (authRes.data.verifie === false) {
        toast.success("Connexion réussie ! Veuillez vérifier votre compte.");
      } else {
        const roleMessage =
          authRes.data.role === "conducteur" ? "conducteur" : "passager";
        toast.success(`Bienvenue ${roleMessage} !`);
      }
 get().connectSocket();
      return { success: true, data: authRes.data };
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      const errorMessage =
        error.response?.data?.message || "Erreur lors de la connexion";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  verifyAccount: async (otpCode) => {
    set({ isVerifying: true });
    try {
      const res = await axiosInstance.post("/auth/verify", { otp: otpCode });

      toast.success("Compte vérifié avec succès !");
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      const errorMessage = error.response?.data?.message || "Code OTP invalide";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isVerifying: false });
    }
  },

  resendOTP: async () => {
    set({ isResendingOTP: true });
    try {
      await axiosInstance.post("/auth/resend-otp");
      toast.success("Nouveau code OTP envoyé !");
      return { success: true };
    } catch (error) {
      console.error("Erreur lors du renvoi de l'OTP:", error);
      const errorMessage =
        error.response?.data?.message || "Erreur lors du renvoi du code";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isResendingOTP: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Déconnexion réussie");
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      set({ authUser: null });
      const errorMessage =
        error.response?.data?.message || "Erreur lors de la déconnexion";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  updateProfile: async (profileData, photoFile = null) => {
    set({ isUpdatingProfile: true });
    try {
      const formData = new FormData();

      Object.keys(profileData).forEach((key) => {
        if (
          profileData[key] !== null &&
          profileData[key] !== undefined &&
          profileData[key] !== ""
        ) {
          formData.append(key, profileData[key]);
        }
      });

      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const res = await axiosInstance.patch("/auth/updateProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ authUser: res.data.user });

      toast.success("Profil mis à jour avec succès !");
      return { success: true, data: res.data.user };
      get().disconnectSocket();

    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
 connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    
    socket.on("getOnlineUsers", (userIds) =>{
      set({onlineUsers: userIds})


    })
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
  
}));
