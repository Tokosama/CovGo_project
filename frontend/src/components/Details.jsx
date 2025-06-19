import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMapMarkerAlt, faCalendarAlt, faUserFriends, faStar, faUserCircle, faChevronRight, faCarSide } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function Details({ onBack }) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24 font-itim w-full overflow-y-auto">
      {/* En-tête */}
      <div
        className="w-full bg-[#00B4D8] flex items-center justify-center px-2 h-[90px] relative"
        style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={onBack}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full focus:outline-none will-change-transform"
          aria-label="Retour"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[22px] text-black" />
        </motion.button>
        <h1 className="flex-1 text-center text-[24px] font-bold text-black">Detail du trajet</h1>
      </div>

      {/* Bloc Départ/Arrivée */}
      <div className="bg-white py-4 border-b border-gray-300">
        <div className="flex flex-col gap-2 bg-[#ADE8F4] px-3 py-2">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600 text-lg" />
            <span className="text-[16px] text-black font-bold">De:</span>
            <span className="text-[16px] text-black">Calavie</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 text-lg" />
            <span className="text-[16px] text-black font-bold">A:</span>
            <span className="text-[16px] text-black">Cotonou</span>
          </div>
        </div>
      </div>

      {/* Bloc Date/Heure */}
      <div className="bg-[#ADE8F4] px-6 py-3 border-b border-gray-300 flex items-center gap-2">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-700 text-lg" />
        <span className="text-[16px] text-black font-bold">Prevue Pour:</span>
        <span className="text-[16px] text-black">Mercredi, 12 Juin 2025 - 12h40</span>
      </div>

      {/* Bloc Places/Prix */}
      <div className="bg-[#ADE8F4] px-6 py-3 mt-4 border-b border-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUserFriends} className="text-gray-700 text-lg" />
          <span className="text-[16px] text-black">2/4 place disponible</span>
        </div>
        <span className="text-[16px] text-black font-bold">Prix : <span className="font-normal">2000</span>xof/place</span>
      </div>

      {/* Bloc Profil Conducteur */}
      <div className="bg-[#ADE8F4] mt-4 px-4 py-4 border-b border-gray-300">
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
        <div className="text-[16px] text-black mb-2">
          Bonjour je vous propose un voyage avec une super Voiture Mercedes classe V tres confortable qui peut accueillir jusqu'à 6 personnes confortablement , n'hesiter pas a me contacter
        </div>
        <div className="text-[16px] text-gray-700 mb-2">
          <span className="font-bold">Preferences:</span> <br />Pas de fumeur ,pas d'animaux
        </div>
        <div className="flex justify-center w-full">  
          <button className="w-[60%] rounded-lg py-2 bg-[#3B82F6] text-white font-bold text-[16px] mt-2 hover:bg-[#2563eb] transition">Contactez</button>
        </div>
      </div>

      {/* Bloc Voiture */}
      <div className="bg-[#ADE8F4] px-3 py-3 mt-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faCarSide} className="text-gray-700 text-lg" />
        <span className="text-[16px] text-black">Mercebez benz classe V - couleur Gris</span>
      </div>
      <div className="flex justify-center w-full">
        <button className="w-[80%] rounded-lg px-3 py-2 bg-[#3B82F6] text-white font-bold text-[16px] mt-8 hover:bg-[#2563eb] transition">Reserver</button>
      </div>
    </div>
  );
}
