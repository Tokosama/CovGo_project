import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faStar, faMapMarkerAlt, faCarSide, faUserFriends, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default function TrajetsAVenir({ onBack }) {
  return (
    <div className="w-full flex flex-col items-center mt-6">
      <button
        className="mb-10 px-4 py-2 bg-[#FFE082] text-black rounded-md font-bold shadow hover:bg-[#ffe082cc] transition"
        onClick={onBack}
      >
        Modifier vos informations
      </button>
      <hr className="w-[90%] border-t border-gray-400 mt-2" />

      <h2 className="text-center text-black text-[22px] mt-4 font-bold mb-4">Trajet à venir</h2>
      {[1, 2].map((_, idx) => (
        <div key={idx} className="bg-[#B2EBF2] border border-gray-400 rounded-xl shadow px-3 py-2 mb-4 w-full max-w-[370px]">
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
          <div className="flex items-center justify-between border border-black rounded-lg bg-[#FFFFFF] px-2 py-1 mb-1">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCarSide} className="text-gray-700 text-base" />
              <span className="text-[13px] text-black">Toyota rav4</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faUserFriends} className="text-gray-700 text-base" />
              <span className="text-[13px] text-black">4</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-700 text-sm" />
            <span className="text-[12px] text-black">20juin | 10h10min</span>
          </div>
        </div>
      ))}
    </div>
  );
} 