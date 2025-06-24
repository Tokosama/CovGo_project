import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUserCircle,
  faUserFriends,
  faMapMarkerAlt,
  faCalendarAlt,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import { useTrajetStore } from "../../store/useTrajetStore";
import ReservationsListConducteur from "../../components/ReservationsListConducteur";
import { useAuthStore } from "../../store/useAuthStore";
import ReservationsListPassager from "../../components/ReservationsListPassager";
import { useChatStore } from "../../store/useChatStore";
import { Loader } from "lucide-react";

export default function Trips() {
  const { authUser } = useAuthStore();
  const { selectedUser, setSelectedUser } = useChatStore();
  const navigate = useNavigate();

  const [tab, setTab] = useState("reservations");

  const {
    fetchHistoriqueTrajets,
    historiqueTrajets,
    isLoadingHistorique,
    errorHistorique,
  } = useTrajetStore();

  useEffect(() => {
    if (tab === "historique") {
      fetchHistoriqueTrajets(authUser.role);
    }
  }, [tab, authUser.role, fetchHistoriqueTrajets]);

  const handleContactClick = (user) => {
    setSelectedUser(user);
    navigate("/messages");
  };
  console.log("yesssssssssssssssssssssssssssssssssssss");
  console.log(historiqueTrajets);
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
          className={`w-[50%] py-4 rounded-t-lg text-[18px] ${
            tab === "historique"
              ? "bg-[#00B4D8] shadow-custom text-white"
              : "bg-transparent"
          }`}
          style={{ minWidth: 140 }}
          onClick={() => setTab("historique")}
        >
          Historique
        </button>
      </div>

      {/* Contenu des onglets */}
      {tab === "reservations" &&
        (authUser.role === "conducteur" ? (
          <ReservationsListConducteur onContactClick={handleContactClick} />
        ) : (
          <ReservationsListPassager onContactClick={handleContactClick} />
        ))}

      {tab === "historique" && (
        <div className="w-full max-w-[400px] px-4">
          {isLoadingHistorique ? (
            <Loader className="size-10 animate-spin" />
          ) : errorHistorique ? (
            <p className="text-red-500">{errorHistorique}</p>
          ) : historiqueTrajets.length === 0 ? (
            <Loader className="size-10 animate-spin" />
          ) : (
            historiqueTrajets.map((trajet) => (
              <div
                key={trajet._id}
                className="bg-white border border-gray-300 rounded-xl shadow-md px-5 py-4 mb-5 w-full max-w-md cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out"
                onClick={() => navigate(`/trajet/${trajet._id}`)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">
                    {trajet.depart}{" "}
                    <span className="mx-1 text-gray-400">→</span>{" "}
                    {trajet.destination}
                  </h3>
                  <span className="text-sm font-semibold text-blue-600">
                    {trajet.prix} xof
                  </span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10m-12 8h14m-5-8v8"
                    />
                  </svg>
                  <span>
                    {new Date(trajet.date_depart).toLocaleDateString("fr-FR", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    à {trajet.heure_depart}
                  </span>
                </div>

                <div
                  className={`inline-flex items-center gap-2 text-sm font-semibold rounded-full px-3 py-1
      ${
        trajet.status === "termine"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }
    `}
                >
                  <FontAwesomeIcon
                    icon={
                      trajet.status === "termine"
                        ? faCheckCircle
                        : faTimesCircle
                    }
                    className="text-lg"
                  />
                  <span>
                    {trajet.status === "termine" ? "Terminé" : "Annulé"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Nav activeMenu="trajets" />
    </div>
  );
}
