import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

import { faArrowLeft, faUserCircle, faStar, faMapMarkerAlt, faCarSide, faUserFriends, faCommentDots, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const trips = [1, 2, 3, 4];

export default function ListTrips({ onBack, onTripClick }) {
  return (
    <div className="min-h-screen bg-[#ffffff] pb-24 font-itim w-full">
      {/* En-tête */}
      <div className="w-full bg-[#D9D9D9] flex items-center px-2 py-10 relative" style={{borderTopLeftRadius: '0px', borderTopRightRadius: '0px'}}>
      <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={onBack}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full focus:outline-none"
          aria-label="Retour"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[22px] text-black" />
        </motion.button>
        <h1 className="flex-1 text-center text-[24px] font-bold text-black">Trajets trouves</h1>
      </div>
      {/* Liste des trajets */}
      <div className="flex flex-col gap-4 mt-4 w-full px-2">
        {trips.map((_, idx) => (
          <div
            key={idx}
            className="bg-[#D9D9D9] border border-black rounded-2xl shadow-md px-3 py-2 w-full cursor-pointer transition hover:scale-[1.01]"
            style={{minWidth: 0}}
            onClick={() => onTripClick && onTripClick(idx)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUserCircle} className="text-[28px] text-black" />
                <span className="font-bold text-[15px] text-black">toko Sama</span>
                <span className="flex gap-1 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-gray-400 text-xs" />
                  ))}
                </span>
              </div>
              <span className="font-bold text-[13px] text-black">PRIX 2000 xof</span>
            </div>
            {/* Lignes points */}
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600 text-sm" />
                <span className="text-[14px] text-black">Calavie | arconville</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 text-sm" />
                <span className="text-[14px] text-black">Cotonou | jericho</span>
              </div>
            </div>
            {/* Infos voiture, places, message */}
            <div className="flex items-center justify-between border border-black rounded-lg bg-[#EDEDED] px-2 py-1 mb-1">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCarSide} className="text-gray-700 text-base" />
                <span className="text-[13px] text-black">Toyota rav4</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUserFriends} className="text-gray-700 text-base" />
                <span className="text-[13px] text-black">4</span>
              </div>
              <button className="flex items-center justify-center bg-[#D9D9D9] border border-black rounded-lg px-2 py-1">
                <FontAwesomeIcon icon={faCommentDots} className="text-[#2196F3] text-base" />
              </button>
            </div>
            {/* Date/heure */}
            <div className="flex items-center gap-2 mt-1">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-700 text-sm" />
              <span className="text-[12px] text-black">20juin | 10h10min</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
