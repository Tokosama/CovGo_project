import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserCircle, faUserFriends, faMapMarkerAlt, faCalendarAlt, faCommentDots, faStar, faCarSide } from '@fortawesome/free-solid-svg-icons';
import Nav from '../../components/Nav';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


export default function Trips() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('reservations');
  return (
    <div className="min-h-screen bg-white pb-24 font-itim w-full overflow-y-auto flex flex-col items-center">
      {/* En-tête */}
      <div
        className="w-full bg-[#00B4D8] flex items-center justify-center px-2 h-[90px] relative"
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={() => navigate('/home')}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full focus:outline-none will-change-transform"
          aria-label="Retour"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[22px] text-black" />
        </motion.button>
        <h1 className="flex-1 text-center text-[24px] font-bold text-black">Vos trajets</h1>
      </div>
      {/* Onglets */}
      <div className="flex gap-2 text-black mt-10 mb-10 px-4 w-full justify-center">
        <button
          className={`w-[50%] py-2 rounded-t-lg font-bold text-[21px] shadow ${tab === 'reservations' ? 'bg-[#00B4D8] border-b-2 border-black' : 'bg-transparent'}`}
          style={{ minWidth: 140 }}
          onClick={() => setTab('reservations')}
        >
          Mes Reservations
        </button>
        <button
          className={`w-[50%] py-2 rounded-t-lg font-bold text-[21px] ${tab === 'historique' ? 'bg-[#00B4D8] border-b-2 border-black' : 'bg-transparent'}`}
          style={{ minWidth: 120 }}
          onClick={() => setTab('historique')}
        >
          Historique
        </button>
      </div>
      {/* Carte de réservation */}
      {tab === 'reservations' && (
        <div className="bg-[#ADE8F4] text-black border border-black rounded-2xl shadow-md px-3 py-2 mx-4 mb-4 w-[90%] max-w-[600px]" style={{minWidth: 0}}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faUserCircle} className="text-[28px] text-black" />
              <span className="font-bold text-[16px] text-black">toko Sama</span>
              <span className="flex items-center gap-1 ml-2">
                <FontAwesomeIcon icon={faUserFriends} className="text-gray-700 text-base" />
                <span className="text-[16px] text-black">2</span>
              </span>
            </div>
            <span className="font-bold text-[16px] text-black">PRIX 2000 xof</span>
          </div>
          <div className="flex flex-col gap-1 mb-2 ml-1">
            <div className="flex items-center gap-2 text-[16px]">
              <span className="font-bold">Trajet:</span>
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-700 text-xs ml-1" />
              <span>20juin | 10h10min</span>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600 text-xs ml-2" />
              <span>Calavie</span>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 text-xs ml-2" />
              <span>Cotonou</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button className="flex text-white items-center justify-center bg-[#3B82F6] rounded-lg px-2 py-1">
              Contactez
            </button>
            <button className="flex-1 rounded-lg py-1 bg-[#FF1D1D] text-white font-bold text-[16px] mx-2 hover:bg-[#f0f0f0] transition">Rejeter</button>
            <button className="flex-1 rounded-lg py-1 bg-[#10B981] text-white font-bold text-[16px] hover:bg-[#2563eb] transition">Accepter</button>
          </div>
        </div>
      )}
      {/* Carte d'historique */}
      {tab === 'historique' && (
        <div className="bg-[#ADE8F4] text-black border-2 border-[#000000] rounded-2xl shadow-md px-3 py-2 mx-4 mb-4 w-[90%] max-w-[600px]" style={{minWidth: 0}}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faUserCircle} className="text-[28px] text-black" />
              <span className="font-bold text-[16px] text-black">toko Sama</span>
              <span className="flex gap-1 ml-1">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-gray-400 text-xs" />
                ))}
              </span>
            </div>
            <span className="font-bold text-[16px] text-black">PRIX 2000 xof</span>
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
              <span className="text-[16px] text-black">Toyota rav4</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faUserFriends} className="text-gray-700 text-base" />
              <span className="text-[16px] text-black">4</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-700 text-sm" />
              <span className="text-[12px] text-black">20juin | 10h10min</span>
            </div>
            <span className="text-[13px] font-bold">Statut : <span className="text-[#D11B52]">Terminée</span></span>
          </div>
        </div>
      )}
      <Nav activeMenu="trajets" />
    </div>
  );
}
