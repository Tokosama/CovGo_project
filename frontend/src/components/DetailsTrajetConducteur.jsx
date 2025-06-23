import React, { useEffect } from "react";
import {
  faArrowLeft,
  faMapMarkerAlt,
  faCalendarAlt,
  faUserFriends,
  faCarSide,
  faStar,
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
    <div className="min-h-screen bg-[#F5F5F5] pb-24 font-itim w-full overflow-y-auto">
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
        <h1 className="text-[24px] text-black font-bold">Trajet à venir</h1>
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
              className="flex items-center gap-3 bg-[#ADE8F4] px-3 py-2 rounded-lg mb-2 shadow-custom"
            >
              <img
                src={r.passager_id?.photo || "/avatar.png"}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border"
              />
              <div className="flex flex-col">
                <span className="text-black font-bold">
                  {r.passager_id?.prenom} {r.passager_id?.nom}
                </span>
                <span className="text-sm text-gray-700">
                  Places : {r.places}
                </span>
              </div>
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
