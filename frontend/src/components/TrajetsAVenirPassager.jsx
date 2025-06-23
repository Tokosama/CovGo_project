import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faStar,
  faMapMarkerAlt,
  faCarSide,
  faUserFriends,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useUpcomingTrajetsStore } from "../store/useUpcomingTrajetsStore";
import { Loader } from "lucide-react";

export default function TrajetsAVEnirPassager({ onBack }) {
  const { trajets, fetchReservedUpcoming, isLoading } =
    useUpcomingTrajetsStore();

  useEffect(() => {
    fetchReservedUpcoming(); // au lieu de fetchUpcomingTrajets()
  }, []);

  console.log(trajets);
  return (
    <div className="w-full flex flex-col items-center mt-6">
      <button
        className="mb-10 px-4 py-2 bg-[#FFE082] text-black rounded-md font-bold shadow hover:bg-[#ffe082cc] transition"
        onClick={onBack}
      >
        Modifier vos informations
      </button>

      <hr className="w-[90%] border-t border-gray-400 mt-2" />

      <h2 className="text-center text-black text-[22px] mt-4 font-bold mb-4">
        Trajets à venir
      </h2>

      {isLoading ? (
        <Loader className="size-10 text-[#3B82F6] animate-spin" />
      ) : trajets.length === 0 ? (
        <p className="text-gray-400">Aucun trajet à venir.</p>
      ) : Array.isArray(trajets) && trajets.length > 0 ? (
        trajets.map((trajet) => (
          <div
            key={trajet._id}
            className="bg-[#B2EBF2] border border-gray-400 rounded-xl shadow px-3 py-2 mb-4 w-full max-w-[370px]"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      trajet.conducteur_id?.photo
                        ? trajet.conducteur_id.photo
                        : "/avatar.png"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                  <span className="font-bold text-[15px] text-black">
                    {trajet.conducteur_id?.prenom} {trajet.conducteur_id?.nom}
                  </span>
                </div>
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

            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-green-600 text-sm"
                />
                <span className="text-[14px] text-black">{trajet.depart}</span>
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

            <div className="flex items-center justify-between border border-black rounded-lg bg-white px-2 py-1 mb-1">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCarSide}
                  className="text-gray-700 text-base"
                />
                <span className="text-[13px] text-black">
                  {trajet.preferences || "Aucune précision"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faUserFriends}
                  className="text-gray-700 text-base"
                />
                <span className="text-[13px] text-black">{trajet.places}</span>
              </div>
            </div>

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
      ) : (
        <p className="text-gray-400">Aucun trajet à venir.</p>
      )}
    </div>
  );
}
