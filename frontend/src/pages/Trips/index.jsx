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

export default function Trips() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("reservations");

  const {
    getAllDriverReservation,
    allReservationForDriver,
    updateReservationStatus,
    statusChangeTrigger,
    isGetting,
  } = useTrajetStore();

  useEffect(() => {
    getAllDriverReservation();
  }, [statusChangeTrigger, getAllDriverReservation]);

  const reservations = Array.isArray(allReservationForDriver?.reservations)
    ? allReservationForDriver.reservations
    : [];

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
          <FontAwesomeIcon icon={faArrowLeft} className="text-[22px] text-black" />
        </motion.button>
        <h1 className="flex-1 text-center text-[24px] text-black">Vos trajets</h1>
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
      {tab === "reservations" && (
        <>
          {isGetting ? (
            <p className="text-center text-gray-500">Chargement...</p>
          ) : reservations.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucune réservation trouvée
            </p>
          ) : (
            reservations.map((reservation) => {
              const { _id, places, passager_id, trajet_id, prix_total } = reservation;

              return (
                <div
                  key={_id}
                  className="bg-[#ADE8F4] text-black shadow-custom rounded-2xl px-3 py-5 mx-4 mb-4 w-[95%] max-w-[600px]"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="text-[28px] text-black"
                      />
                      <span className="text-[16px] text-black">
                        {passager_id?.prenom} {passager_id?.nom}
                      </span>
                      <span className="flex items-center gap-1 ml-2">
                        <FontAwesomeIcon
                          icon={faUserFriends}
                          className="text-gray-700 text-base"
                        />
                        <span className="text-[16px] text-black">
                          {places}
                        </span>
                      </span>
                    </div>
                    <span className="text-[16px] text-black">
                      PRIX {prix_total} xof
                    </span>
                  </div>

                  {/* Trajet */}
                  <div className="flex flex-col gap-1 py-2 mb-2">
                    <div className="flex items-center gap-2 text-[16px]">
                      <span className="font-bold">Trajet:</span>
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-gray-700 text-xs ml-1"
                      />
                      <span>
                        {new Date(trajet_id.date_depart).toLocaleDateString("fr-FR")} |{" "}
                        {trajet_id.heure_depart}
                      </span>
                    </div>
                  </div>

                  {/* Départ / Destination */}
                  <div className="flex items-center gap-2 text-[16px] mb-3">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-green-600 text-lg"
                    />
                    <span>{trajet_id.depart}</span>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-red-600 text-lg ml-2"
                    />
                    <span>{trajet_id.destination}</span>
                  </div>

                  {/* Boutons */}
                  <div className="flex items-center gap-2 mt-2">
                    <button className="flex text-white items-center shadow-custom justify-center bg-[#3B82F6] rounded-lg px-3 py-1">
                      Contactez
                    </button>
                    <button
                      onClick={() => updateReservationStatus(_id, "rejete")}
                      className="flex-1 rounded-lg py-1 shadow-custom bg-[#FF1D1D] text-white text-[16px] hover:bg-[#f0f0f0] transition"
                    >
                      Rejeter
                    </button>
                    <button
                      onClick={() => updateReservationStatus(_id, "accepte")}
                      className="flex-1 rounded-lg py-1 shadow-custom bg-[#10B981] text-white text-[16px] hover:bg-[#2563eb] transition"
                    >
                      Accepter
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </>
      )}

      <Nav activeMenu="trajets" />
    </div>
  );
}
