import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Nav from '../../components/Nav';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


export default function Notifs() {
  const [tab, setTab] = useState('nonlu');
  const navigate = useNavigate();
  const [selectedNotif, setSelectedNotif] = useState(null);
  return (
    <div className="min-h-screen bg-white pb-24 font-itim w-full overflow-y-auto flex flex-col items-center">
      {/* En-tête */}
      <div className="w-full bg-[#00B4D8] flex items-center justify-center px-2 h-[90px] relative">
      <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={() => navigate('/trips')}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full focus:outline-none will-change-transform"
          aria-label="Retour"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[22px] text-black" />
        </motion.button>
        <h1 className="flex-1 text-center text-[24px] font-bold text-black">Mes Notifications</h1>
      </div>
      {/* Onglets */}
      <div className="flex gap-2 text-black mt-10 mb-10 px-4 w-full justify-center">
        <button
          className={`w-[50%] py-2 rounded-t-lg font-bold text-[21px] shadow ${tab === 'nonlu' ? 'bg-[#00B4D8] border-b-2 border-black' : 'bg-transparent'}`}
          style={{ minWidth: 100 }}
          onClick={() => setTab('nonlu')}
        >
          Non lu
        </button>
        <button
          className={`w-[50%] py-2 rounded-t-lg font-bold text-[21px] ${tab === 'lu' ? 'bg-[#00B4D8] border-b-2 border-black' : 'bg-transparent'}`}
          style={{ minWidth: 120 }}
          onClick={() => setTab('lu')}
        >
          Lu
        </button>
      </div>
      <div className="w-full mb-4" />
      {/* Timeline ou message selon l'onglet */}
      {tab === 'nonlu' ? (
        <div className="flex flex-col items-center w-full mt-2">
          {!selectedNotif ? (
            <div
              className="bg-[#ADE8F4] text-black rounded-xl shadow px-4 py-2 w-[60%] max-w-[600px] text-center font-bold text-[15px] mb-4 cursor-pointer hover:bg-[#bde0fe] transition"
              onClick={() => setSelectedNotif(1)}
            >
              Reservation Confirmer
            </div>
          ) : (
            <>
              <button
                className="mb-4 px-4 py-2 bg-[#00B4D8] text-black rounded-lg font-bold hover:bg-[#2563eb] transition"
                onClick={() => setSelectedNotif(null)}
              >
                Retour
              </button>
              <div className="bg-[#ADE8F4] text-black rounded-xl shadow px-4 py-2 w-[60%] max-w-[600px] text-center text-[16px] mt-1">
                Orelson a bien confirme sa reservation pour le trajet prevue le 30 mai 2025 , calavie -cotonou
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center w-full mt-10 text-gray-400 text-[16px]">Aucune notification lue.</div>
      )}
      <Nav activeMenu="notifs" />
    </div>
  );
}
