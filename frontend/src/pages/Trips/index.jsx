import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUserCircle,
  faUserFriends,
  faMapMarkerAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import { useTrajetStore } from "../../store/useTrajetStore";
import ReservationsListConducteur from "../../components/ReservationsListConducteur";
import { useAuthStore } from "../../store/useAuthStore";
import ReservationsListPassager from "../../components/ReservationsListPassager";
import { useChatStore } from "../../store/useChatStore";

export default function Trips() {
  const { authUser } = useAuthStore();
  const { selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState("reservations");

  const handleContactClick = (user) => {
    setSelectedUser(user);
    console.log("-***************************")
    console.log(user)
    navigate("/messages");
  };
  return (
    <div className="min-h-screen bg-white pb-24 font-itim w-full overflow-y-auto flex flex-col items-center">
      {/* En-tête */}
      <div className="w-full bg-[#00B4D8] flex items-center shadow-custom justify-center px-2 h-[90px] relative">
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={() => navigate("/home")}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full focus:outline-none"
          aria-label="Retour"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-[22px] text-black"
          />
        </motion.button>
        <h1 className="flex-1 text-center text-[24px] text-black">
          Vos trajets
        </h1>
      </div>

      {/* Onglets */}
      <div className="flex gap-2 text-black shadow-custom mt-10 mb-10 px-4 w-full justify-center">
        <button
          className={`w-[50%] py-4 rounded-t-lg text-[18px] ${
            tab === "reservations"
              ? "bg-[#00B4D8] shadow-custom text-white"
              : "bg-transparent"
          }`}
          style={{ minWidth: 140 }}
          onClick={() => setTab("reservations")}
        >
          Mes Réservations
        </button>
        <button
          disabled
          className={`w-[50%] py-2 rounded-t-lg text-[21px] ${
            tab === "historique"
              ? "bg-[#00B4D8] shadow-custom text-white"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          style={{ minWidth: 120 }}
        >
          Historique
        </button>
      </div>

      {/* Liste des réservations */}

      {tab === "reservations" &&
        (authUser.role === "conducteur" ? (
          <ReservationsListConducteur onContactClick={handleContactClick} />
        ) : (
          <>
            <ReservationsListPassager onContactClick={handleContactClick} />
          </>
        ))}

      <Nav activeMenu="trajets" />
    </div>
  );
}
