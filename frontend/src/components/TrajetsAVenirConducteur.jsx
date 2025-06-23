import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useUpcomingTrajetsStore } from "../store/useUpcomingTrajetsStore";
import DetailsTrajetConducteur from "./DetailsTrajetConducteur"; // <-- importe ta page
import toast from "react-hot-toast";
import { faCalendarAlt, faCarSide, faMapMarkerAlt, faStar, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TrajetsAVenir({ onBack }) {
  const { trajets, fetchUpcomingTrajets, isLoading } =
    useUpcomingTrajetsStore();
  const [selectedTrajet, setSelectedTrajet] = useState(null);

  useEffect(() => {
    fetchUpcomingTrajets();
  }, [fetchUpcomingTrajets]);

  // Reviens à la liste
  const handleBackFromDetails = () => {
    setSelectedTrajet(null);
    fetchUpcomingTrajets(); // Recharge la liste au retour
  };

  // Si un trajet est sélectionné, on affiche la page de détails :
  if (selectedTrajet) {
    return (
      <DetailsTrajetConducteur
        trajet={selectedTrajet}
        onBack={handleBackFromDetails}
      />
    );
  }

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
      ) : (
        trajets.map((trajet) => (
          <div
            key={trajet._id}
            className="bg-[#B2EBF2] border border-gray-400 rounded-xl shadow px-3 py-2 mb-4 w-full max-w-[370px] cursor-pointer transition hover:scale-[1.01]"
            onClick={() => setSelectedTrajet(trajet)} // <-- garde le design, ajoute navigation
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 ">
                <img
                  src={
                    trajet.conducteur_id?.photo
                      ? trajet.conducteur_id.photo
                      : "/avatar.png"
                  }
                  alt="conducteur"
                  className="w-8 h-8 rounded-full shadow object-cover"
                />
                <span className="font-bold text-[15px] text-black">Moi</span>
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
      )}
    </div>
  );
}
