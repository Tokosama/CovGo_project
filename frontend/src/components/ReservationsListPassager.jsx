import React, { useEffect } from "react";
import { Loader } from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faUserFriends,
  faMapMarkerAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTrajetStore } from "../store/useTrajetStore";
import { updateReservationStatus } from "../../../backend/src/controllers/reservation.controller";

export default function ReservationsListPassager({ onContactClick }) {
  const {
    getAllPassengerReservations,
    allReservationForPassenger,
    isGetting,
    annulerReservation,
    confirmerReservation,
    //updateReservationStatus, // si tu as une fonction pour mettre à jour le status
  } = useTrajetStore();

  useEffect(() => {
    getAllPassengerReservations();
  }, [getAllPassengerReservations]);

  const reservations = Array.isArray(allReservationForPassenger)
    ? allReservationForPassenger
    : [];

  console.log(reservations);
  if (isGetting) {
    return <Loader className="size-10 text-[#3B82F6] animate-spin" />;
  }

  if (reservations.length === 0) {
    return (
      <p className="text-center text-gray-500">Aucune réservation trouvée</p>
    );
  }

  return reservations.map((reservation) => {
    const { _id, places, trajet_id, prix_total, status } = reservation;

    console.log("=======================================");
    console.log(reservation);
    return (
      <div
        key={_id}
        className="bg-[#ADE8F4] text-black shadow-custom rounded-2xl px-3 py-5 mx-4 mb-4 w-[95%] max-w-[600px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <img
              src={
                reservation?.passager_id?.photo
                  ? reservation.passager_id.photo
                  : "/avatar.png"
              }
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />

            <span className="font-bold text-[15px] text-black">
              {reservation.passager_id.prenom} {reservation.passager_id.nom}
            </span>
            <span className="flex items-center gap-1 ml-2">
              <FontAwesomeIcon
                icon={faUserFriends}
                className="text-gray-700 text-base"
              />
              <span className="text-[16px] text-black">{places}</span>
            </span>
          </div>
          <span className="text-[16px] text-black">PRIX {prix_total} xof</span>
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

        {/* Boutons (exemple: pas de gestion d'acceptation pour passager) */}
        <div className="flex items-center justify-between gap-2 mt-2">
          <button
            className="flex text-white items-center shadow-custom justify-center bg-[#3B82F6] rounded-lg px-3 py-1"
            onClick={(e) => {
              e.stopPropagation(); // Empêche la propagation du clic au div parent
              if (onContactClick) onContactClick(trajet_id.conducteur_id);
            }}
          >
            Contactez
          </button>

          <button
            onClick={() => annulerReservation(_id)}
            className="flex rounded-lg px-3 py-1 shadow-custom bg-[#FF1D1D] text-white text-[16px] hover:bg-[#f0f0f0] transition"
          >
            Annuler
          </button>

          {status === "accepte" && (
            <button
              onClick={() => confirmerReservation(_id)}
              className="flex-1 rounded-lg py-1 shadow-custom bg-[#10B981] text-white text-[16px] hover:bg-[#2563eb] transition"
            >
              Confirmer
            </button>
          )}
        </div>
      </div>
    );
  });
}
