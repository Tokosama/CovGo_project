import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMapMarkerAlt, faCalendarAlt, faUserFriends, faStar, faUserCircle, faChevronRight, faCarSide } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function Details({ onBack }) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24 font-itim w-full overflow-y-auto">
      {/* En-tête */}
      <div
        className="w-full bg-[#D9D9D9] flex items-center justify-center px-2 py-10 relative"
        style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={onBack}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 focus:outline-none"
          aria-label="Retour"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[22px] text-black" />
        </motion.button>
        <h1 className="flex-1 text-center text-[20px] font-bold text-black">Detail du trajet</h1>
      </div>

      {/* Bloc Départ/Arrivée */}
      <div className="bg-white rounded-b-2xl px-6 py-4 border-b border-gray-300">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600 text-lg" />
            <span className="text-[15px] text-black font-bold">De:</span>
            <span className="text-[15px] text-black">Calavie</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 text-lg" />
            <span className="text-[15px] text-black font-bold">A:</span>
            <span className="text-[15px] text-black">Cotonou</span>
          </div>
        </div>
      </div>

      {/* Bloc Date/Heure */}
      <div className="bg-[#D9D9D9] px-6 py-3 border-b border-gray-300 flex items-center gap-2">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-700 text-lg" />
        <span className="text-[15px] text-black font-bold">Prevue Pour:</span>
        <span className="text-[15px] text-black">Mercredi, 12 Juin 2025 - 12h40</span>
      </div>

      {/* Bloc Places/Prix */}
      <div className="bg-white px-6 py-3 border-b border-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUserFriends} className="text-gray-700 text-lg" />
          <span className="text-[15px] text-black">2/4 place disponible</span>
        </div>
        <span className="text-[15px] text-black font-bold">Prix : <span className="font-normal">2000</span>xof/place</span>
      </div>

      {/* Bloc Profil Conducteur */}
      <div className="bg-[#F5F5F5] px-4 py-4 border-b border-gray-300">
        <div className="flex items-center gap-2 mb-1">
          <FontAwesomeIcon icon={faUserCircle} className="text-[38px] text-black" />
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[16px] text-black">toko Sama</span>
              <span className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-gray-400 text-xs" />
                ))}
              </span>
            </div>
            <span className="text-[11px] text-gray-600">Active since: <span className="font-bold">one month</span></span>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 text-base" />
        </div>
        <div className="text-[14px] text-black mb-2">
          Bonjour je vous propose un voyage avec une super Voiture Mercedes classe V tres confortable qui peut accueillir jusqu'à 6 personnes confortablement , n'hesiter pas a me contacter
        </div>
        <div className="text-[13px] text-gray-700 mb-2">
          <span className="font-bold">Preferences:</span> <br />Pas de fumeur ,pas d'animaux
        </div>
        <button className="w-full border border-black rounded-lg py-2 bg-white text-black font-bold text-[15px] mt-2 hover:bg-[#f0f0f0] transition">Contactez</button>
      </div>

      {/* Bloc Voiture */}
      <div className="bg-white px-6 py-3 mt-4 flex items-center gap-2 border border-black rounded-2xl mx-3">
        <FontAwesomeIcon icon={faCarSide} className="text-gray-700 text-lg" />
        <span className="text-[15px] text-black">Mercebez benz classe V - couleur Gris</span>
      </div>
    </div>
  );
}
