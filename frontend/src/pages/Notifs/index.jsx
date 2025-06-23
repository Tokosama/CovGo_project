import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Nav from "../../components/Nav";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useNotificationStore } from "../../store/useNotificationStore";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "lucide-react";
// Dictionnaire de titres et de couleurs selon le type de notification
const NOTIF_META = {
    compte_verifie: {
    title: "Compte vérifié",
    color: "border-green-500 bg-green-50 text-green-700",
  },

  reservation_confirmee: {
    title: "Réservation confirmée",
    color: " shadow-lg bg-green-100 text-green-800 border-green-400",
  },
  reservation_annulee: {
    title: "Réservation annulée",
    color: " shadow-lg bg-red-100 text-red-800 border-red-400",
  },
  reservation_acceptee: {
    title: "Réservation acceptée",
    color: " shadow-lg bg-green-100 text-green-800 border-green-400",
  },
  reservation_rejetee: {
    title: "Réservation rejetée",
    color: " shadow-lg bg-red-100 text-red-800 border-red-400",
  },
  trajet_annule: {
    title: "Trajet annulé",
    color: " shadow-lg bg-red-100 text-red-800 border-red-400",
  },
  trajet_commence: {
    title: "Trajet démarré",
    color: " shadow-lg bg-green-100 text-green-800 border-green-400",
  },
  trajet_termine: {
    title: "Trajet terminé",
    color: " shadow-lg bg-green-100 text-green-800 border-green-400",
  },
  default: {
    title: "Notification",
    color: " shadow-lg bg-blue-100 text-blue-800 border-blue-400",
  },
};

export default function Notifs() {
  const [tab, setTab] = useState("nonlu");
  const navigate = useNavigate();
  const [selectedNotif, setSelectedNotif] = useState(null);

  const { notifications, fetchNotifications, markAsRead, isLoading } =
    useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const notifsNonLues = notifications.filter((n) => !n.vue);
  const notifsLues = notifications.filter((n) => n.vue);

  const renderNotifCard = (notif) => {
    const meta = NOTIF_META[notif.type] || NOTIF_META.default;

    return (
      <div
        key={notif._id}
        className={`border-l-4 ${meta.color} rounded-md shadow px-4 py-3 w-full max-w-[600px] mb-3 flex justify-between items-start`}
      >
        <div className="flex-1 pr-2">
          <div className="font-semibold text-[16px] mb-1">{meta.title}</div>
          <div className="text-[15px]">{notif.contenue}</div>
        </div>

        {!notif.vue && (
          <button
            className="text-gray-600 hover:text-black transition"
            onClick={() => markAsRead(notif._id)}
            title="Marquer comme lue"
          >
            <FontAwesomeIcon
              icon={faEye}
              className="text-[18px]"
            />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pb-24 font-itim w-full overflow-y-auto flex flex-col items-center">
      {/* En-tête */}
      <div className="w-full bg-[#00B4D8] flex items-center justify-center px-2 h-[90px] relative">
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={() => navigate("/trips")}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full focus:outline-none will-change-transform"
          aria-label="Retour"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-[22px] text-black"
          />
        </motion.button>
        <h1 className="flex-1 text-center text-[24px] font-bold text-black">
          Mes Notifications
        </h1>
      </div>

      {/* Onglets */}
      <div className="flex gap-2 text-black shadow-custom mt-10 mb-3 px-4 w-full justify-center">
        <button
          className={`w-[50%] py-4 rounded-t-lg text-[18px] ${
            tab === "nonlu"
              ? "bg-[#00B4D8] shadow-custom text-white"
              : "bg-transparent"
          }`}
          style={{ minWidth: 140 }}
          onClick={() => setTab("nonlu")}
        >
          Non lu
        </button>
        <button
          className={`w-[50%] py-4 rounded-t-lg text-[18px] ${
            tab === "lu"
              ? "bg-[#00B4D8] shadow-custom text-white"
              : "bg-gray-300"
          }`}
          style={{ minWidth: 140 }}
          onClick={() => setTab("lu")}
        >
          Lu
        </button>
      </div>

      {/* Liste des notifications */}
      <div className="flex flex-col items-center w-full mt-2 px-4">
        {isLoading ? (
<Loader className="size-10 text-[#3B82F6] animate-spin" />        ) : (
          <>
            {tab === "nonlu" && notifsNonLues.length === 0 && (
              <p className="text-gray-400">Aucune notification</p>
            )}
            {tab === "lu" && notifsLues.length === 0 && (
              <p className="text-gray-400">Aucune notification </p>
            )}

            {(tab === "nonlu" ? notifsNonLues : notifsLues).map(
              renderNotifCard
            )}
          </>
        )}
      </div>

      <Nav activeMenu="notifs" />
    </div>
  );
}
