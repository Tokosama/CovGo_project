import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faArrowLeft,
  faUserCircle,
  faStar,
  faMapMarkerAlt,
  faCarSide,
  faUserFriends,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTrajetStore } from "../store/useTrajetStore";

export default function ListTrips({ onBack, onTripClick }) {
  const { trajets } = useTrajetStore();

  return (
    <div className="min-h-screen bg-[#ffffff] pb-24 font-itim w-full">
      {/* En-tête */}
      <div className="w-full bg-[#00B4D8] shadow-custom flex items-center px-2 h-[90px] relative">
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={onBack}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full focus:outline-none will-change-transform"
          aria-label="Retour"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-[22px] text-white"
          />
        </motion.button>
        <h1 className="flex-1 text-center text-[24px] text-white">
          Trajets trouvés
        </h1>
      </div>

      {/* Liste des trajets */}
      <div className="flex flex-col gap-4 mt-4 w-full px-2">
        {trajets.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">Aucun trajet trouvé</p>
        ) : (
          trajets.map((trajet, idx) => (
            <div
              key={trajet._id || idx}
              className="bg-[#ADE8F4] border-black rounded-2xl shadow-custom px-3 py-5 w-full cursor-pointer transition hover:scale-[1.01]"
              onClick={() => onTripClick(trajet)}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-[28px] text-black"
                  />
                  <span className="font-bold text-[15px] text-black">
                    {trajet.conducteur_id?.prenom} {trajet.conducteur_id?.nom}
                  </span>
                  <span className="flex gap-1 ml-1">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="text-gray-400 text-xs"
                      />
                    ))}
                  </span>
                </div>
                <span className="font-bold text-[13px] text-black">
                  PRIX {trajet.prix} xof
                </span>
              </div>

              {/* Lieux */}
              <div className="flex flex-col gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-green-600 text-sm"
                  />
                  <span className="text-[14px] text-black">
                    {trajet.depart}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-red-600 text-sm"
                  />
                  <span className="text-[14px] text-black">
                    {trajet.destination}
                  </span>
                </div>
              </div>

              {/* Infos voiture, places, bouton */}
              <div className="flex items-center justify-between border border-black rounded-lg bg-[#FFFFFF] px-2 py-1 mb-1">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCarSide}
                    className="text-gray-700 text-base"
                  />
                  <span className="text-[13px] text-black">
                    {trajet.preferences || "Pas de précision"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    className="text-gray-700 text-base"
                  />
                  <span className="text-[13px] text-black">
                    {trajet.places}
                  </span>
                </div>
                <button className="flex items-center shadow-custom justify-center bg-[#3B82F6] rounded-lg px-2 py-1">
                  Contactez
                </button>
              </div>

              {/* Date/heure */}
              <div className="flex items-center gap-2 mt-1">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-gray-700 text-sm"
                />
                <span className="text-[12px] text-black">
                  {new Date(trajet.date_depart).toLocaleDateString("fr-FR", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  | {trajet.heure_depart}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
