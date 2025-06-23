import React, { useEffect } from "react";
import {
  faArrowLeft,
  faMapMarkerAlt,
  faCalendarAlt,
  faUserFriends,
  faCarSide,
  faStar,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useTrajetStore } from "../store/useTrajetStore";
import toast from "react-hot-toast";

export default function DetailsTrajetConducteur({ trajet, onBack }) {
  const {
    reservationsByTrajet,
    getReservationsByTrajet,
    reservations,
    demarrerTrajet,
    annulerTrajet,
    terminerTrajet,
  } = useTrajetStore();
  useEffect(() => {
    if (trajet?._id) {
      getReservationsByTrajet(trajet._id);
    }
  }, [trajet]);
  console.log(reservationsByTrajet);

  const handleAction = async (action) => {
    try {
      if (action === "demarrer") await demarrerTrajet(trajet._id);
      if (action === "annuler") await annulerTrajet(trajet._id);
      if (action === "terminer") await terminerTrajet(trajet._id);
      toast.success(`Trajet ${action} avec succès`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur");
    }
  };

  return (
<div className="w-full h-full min-h-screen bg-[#F5F5F5] overflow-y-auto font-itim">
      {/* En-tête */}
      <div className="w-full bg-[#00B4D8] shadow-custom flex items-center justify-center px-2 h-[90px] relative">
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={onBack}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full"
          aria-label="Retour"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-[22px] text-black"
          />
        </motion.button>
        <h1 className="text-[24px] text-black font-bold">Details du trajet</h1>
      </div>

      {/* Infos trajet */}
      <div className="bg-white py-4">
        <div className="bg-[#ADE8F4] px-4 py-2 shadow-custom mb-2">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-green-600"
          />{" "}
          <strong>De :</strong> {trajet.depart}
          <br />
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-red-600"
          />{" "}
          <strong>À :</strong> {trajet.destination}
        </div>
        <div className="bg-[#ADE8F4] px-4 py-2 shadow-custom mb-2 flex items-center gap-2">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="text-gray-700"
          />
          <span>
            {new Date(trajet.date_depart).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            à {trajet.heure_depart}
          </span>
        </div>
        <div className="bg-[#ADE8F4] px-4 py-2 shadow-custom flex justify-between">
          <div>
            <FontAwesomeIcon icon={faUserFriends} /> {trajet.places} places
          </div>
          <div>
            <strong>{trajet.prix} xof</strong>/place
          </div>
        </div>
      </div>

      {/* Liste des passagers */}
      <div className="px-4 mt-4">
        <h2 className="font-bold text-black mb-2">Passagers :</h2>
        {reservationsByTrajet.length === 0 ? (
          <p className="text-gray-500">Aucun passager pour ce trajet.</p>
        ) : (
          reservationsByTrajet.map((r) => (
            <div
              key={r._id}
              className="bg-[#ADE8F4] mt-4 px-4 py-4 border-b shadow-custom border-gray-300 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={r.passager_id?.photo || "/avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[16px] text-black">
                      {r.passager_id?.prenom} {r.passager_id?.nom}
                    </span>
                    <span className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className="text-gray-400 text-xs"
                        />
                      ))}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-600">
                    Téléphone :{" "}
                    <span className="font-bold">
                      {r.passager_id?.telephone}
                    </span>
                  </span>
                </div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-gray-500 text-base"
                />
              </div>

              <div className="text-[16px] text-black mb-2">
                Nombre de places réservées :{" "}
                <span className="font-bold">{r.places}</span>
              </div>

              {r.message && (
                <div className="text-[16px] text-gray-700 mb-2">
                  <span className="font-bold">Message du passager :</span>
                  <br />
                  {r.message}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Boutons d'action */}
      <div className="flex flex-col gap-2 items-center mt-6">
        <button
          onClick={() => handleAction("demarrer")}
          className="w-[80%] rounded-lg px-3 py-2 bg-green-500 text-white font-bold shadow hover:bg-green-600"
        >
          Démarrer le trajet
        </button>
        <button
          onClick={() => handleAction("terminer")}
          className="w-[80%] rounded-lg px-3 py-2 bg-blue-500 text-white font-bold shadow hover:bg-blue-600"
        >
          Terminer le trajet
        </button>
        <button
          onClick={() => handleAction("annuler")}
          className="w-[80%] rounded-lg px-3 py-2 bg-red-500 text-white font-bold shadow hover:bg-red-600"
        >
          Annuler le trajet
        </button>
      </div>
    </div>
  );
}
