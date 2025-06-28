import React, { useEffect, useState } from "react";
import { Car, Loader } from "lucide-react";
import { useUpcomingTrajetsStore } from "../store/useUpcomingTrajetsStore";
import DetailsTrajetConducteur from "./DetailsTrajetConducteur";
import {
  faCalendarAlt,
  faCarSide,
  faMapMarkerAlt,
  faStar,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TrajetsAVenir({ onBack, onShowVehicules }) {
  const { trajets, fetchUpcomingTrajets, isLoading } =
    useUpcomingTrajetsStore();
  const [selectedTrajet, setSelectedTrajet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUpcomingTrajets();
  }, [fetchUpcomingTrajets]);

  const handleTrajetClick = (trajet) => {
    setSelectedTrajet(trajet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrajet(null);
    fetchUpcomingTrajets(); // Recharge la liste au retour
  };

  return (
    <>
      <div className="w-full flex flex-col items-center mt-6 pb-16 px-4">
        <button
          className="mb-10 px-4 py-2 bg-[#FFE082] text-black rounded-md font-bold shadow hover:bg-[#ffe082cc] transition"
          onClick={onBack}
        >
          Modifier vos informations
        </button>

        <button
          onClick={onShowVehicules}
          className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
        >
          <Car className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-700 font-medium">
            Gérer mes véhicules
          </span>
        </button>

        <hr className="w-[90%] border-t border-gray-400 mt-2" />

        <h2 className="text-center text-black text-[22px] mt-4 font-bold mb-4">
          Trajets à venir
        </h2>

        {isLoading ? (
          <Loader className="size-10 text-[#3B82F6] animate-spin" />
        ) : trajets.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🚗</div>
            <p className="text-gray-400 text-lg">Aucun trajet à venir.</p>
            <p className="text-gray-500 text-sm mt-2">
              Créez votre premier trajet pour commencer !
            </p>
          </div>
        ) : (
          trajets.map((trajet) => (
            <div
              key={trajet._id}
              className="bg-[#B2EBF2] rounded-xl shadow-custom px-3 py-2 mb-4 w-full max-w-[370px] cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              onClick={() => handleTrajetClick(trajet)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
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
                        className="text-yellow-400 text-xs"
                      />
                    ))}
                  </span>
                </div>
                <span className="font-bold text-[13px] text-black bg-white px-2 py-1 rounded-full">
                  {trajet.prix} XOF
                </span>
              </div>

              <div className="flex flex-col gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-green-600 text-sm"
                  />
                  <span className="text-[14px] text-black truncate">
                    {trajet.depart}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-red-600 text-sm"
                  />
                  <span className="text-[14px] text-black truncate">
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
                  <span className="text-[13px] text-black truncate">
                    {trajet.preferences || "Aucune précision"}
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

              {/* Indicateur cliquable */}
              <div className="text-center mt-2">
                <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full">
                  👆 Cliquez pour plus de détails
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal des détails */}
      <DetailsTrajetConducteur
        trajet={selectedTrajet}
        onBack={handleCloseModal}
        isOpen={isModalOpen}
      />
    </>
  );
}
