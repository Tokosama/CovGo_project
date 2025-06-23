import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMapMarkerAlt,
  faCalendarAlt,
  faUserFriends,
  faStar,
  faUserCircle,
  faChevronRight,
  faCarSide,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTrajetStore } from "../store/useTrajetStore"; // adapte le chemin

export default function Details({ onBack, trip, onContactClick }) {
  const [placesToBook, setPlacesToBook] = useState(1);
  const [loading, setLoading] = useState(false);
  const createReservation = useTrajetStore((state) => state.createReservation);

  if (!trip)
    return <p className="text-center mt-10">Aucun trajet sélectionné</p>;

  const {
    depart,
    destination,
    date_depart,
    heure_depart,
    places,
    prix,
    description,
    preferences,
    conducteur_id,
  } = trip;

  const conducteurNom = `${conducteur_id?.prenom || ""} ${
    conducteur_id?.nom || ""
  }`;
  const formattedDate = new Date(date_depart).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleReservation = async () => {
    setLoading(true);
    try {
      await createReservation({
        trajet_id: trip._id,
        places: placesToBook,
      });
      // Optionnel : Naviguer, rafraîchir ou fermer
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(trip)
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
        <h1 className="flex-1 text-center text-[24px] text-black">
          Détail du trajet
        </h1>
      </div>

      {/* Départ / Destination */}
      <div className="bg-white py-4 border-b border-gray-300">
        <div className="flex flex-col gap-2 bg-[#ADE8F4] shadow-custom px-3 py-2">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-green-600 text-lg"
            />
            <span className="text-[16px] text-black font-bold">De:</span>
            <span className="text-[16px] text-black">{depart}</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-red-600 text-lg"
            />
            <span className="text-[16px] text-black font-bold">À:</span>
            <span className="text-[16px] text-black">{destination}</span>
          </div>
        </div>
      </div>

      {/* Date et Heure */}
      <div className="bg-[#ADE8F4] px-6 py-3 border-b shadow-custom border-gray-300 flex items-center gap-2">
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="text-gray-700 text-lg"
        />
        <span className="text-[16px] text-black font-bold">Prévu pour :</span>
        <span className="text-[16px] text-black">
          {formattedDate} - {heure_depart}
        </span>
      </div>

      {/* Places / Prix */}
      <div className="bg-[#ADE8F4] px-6 py-3 mt-4 shadow-custom border-b border-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faUserFriends}
            className="text-gray-700 text-lg"
          />
          <span className="text-[16px] text-black">
            {places} place(s) disponible(s)
          </span>
        </div>
        <span className="text-[16px] text-black font-bold">
          Prix : <span className="font-normal">{prix}</span> xof/place
        </span>
      </div>

      {/* Profil Conducteur */}
      <div className="bg-[#ADE8F4] mt-4 px-4 py-4 border-b shadow-custom border-gray-300">
        <div className="flex items-center gap-2 mb-1">
        <img
  src={
    trip?.conducteur_id?.photo
      ? trip.conducteur_id.photo
      : "/avatar.png"
  }
  alt="avatar"
  className="w-8 h-8 rounded-full object-cover border border-gray-300"
/>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[16px] text-black">
                {conducteurNom}
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
              Active depuis : <span className="font-bold">1 mois</span>
            </span>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-500 text-base"
          />
        </div>
        <div className="text-[16px] text-black mb-2">
          {description || "Aucune description fournie"}
        </div>
        {preferences && (
          <div className="text-[16px] text-gray-700 mb-2">
            <span className="font-bold">Préférences :</span>
            <br />
            {preferences}
          </div>
        )}
        <div className="flex justify-center w-full">
          <button
            className="w-[60%] rounded-lg py-2 bg-[#3B82F6] text-white shadow-custom text-[20px] mt-2 hover:bg-[#2563eb] transition"
            onClick={(e) => {
              e.stopPropagation(); // Empêche la propagation du clic au div parent
              if (onContactClick) onContactClick(trip.conducteur_id);
            }}
          >
            Contactez
          </button>
        </div>
      </div>

      {/* Voiture */}
      <div className="bg-[#ADE8F4] shadow-custom px-3 py-3 mt-4 flex items-center gap-2">
        <FontAwesomeIcon
          icon={faCarSide}
          className="text-gray-700 text-lg"
        />
        <span className="text-[16px] text-black">
          Modèle non précisé - couleur non précisée
        </span>
      </div>
      <div className="flex justify-center my-4">
        <div className="flex flex-col justify-center items-center w-[60%] mx-auto my-4">
          <label
            htmlFor="placesToBook"
            className="mb-1 text-[16px] flex justify-center font-itim font-semibold text-black"
          >
            Nombre de places à réserver
          </label>
          <input
            id="placesToBook"
            type="number"
            min="1"
            max={places}
            value={placesToBook}
            onChange={(e) => setPlacesToBook(e.target.value)}
            className="
      px-4
      py-3
      rounded-lg
      border
      border-gray-300
      focus:outline-none
      focus:ring-2
      focus:ring-[#00B4D8]
      shadow-custom
      text-[16px]
      font-itim
      w-[50%]
      transition
      duration-300
      placeholder:text-gray-400
      text-black
      justify-center flex items-center
      bg-white
    "
          />
        </div>
      </div>
      {/* Bouton réserver */}
      <div className="flex justify-center w-full">
        <div className="flex justify-center w-full">
          <button
            onClick={handleReservation}
            disabled={loading}
            className="w-[80%] rounded-lg px-3 py-2 bg-[#3B82F6] text-white text-[20px] shadow-custom mt-8 hover:bg-[#2563eb] transition"
          >
            {loading ? "Réservation..." : "Réserver"}
          </button>
        </div>
      </div>
    </div>
  );
}
