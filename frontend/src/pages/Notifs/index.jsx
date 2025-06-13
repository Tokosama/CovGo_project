import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Nav from '../../components/Nav';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


export default function Notifs() {
  const [tab, setTab] = useState('nonlu');
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white pb-24 font-itim w-full overflow-y-auto flex flex-col items-center">
      {/* En-tête */}
      <div className="w-full bg-[#D9D9D9] flex items-center justify-center px-2 py-4 relative">
      <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={() => navigate('/trips')}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full focus:outline-none"
          aria-label="Retour"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[22px] text-black" />
        </motion.button>
        <h1 className="flex-1 text-center text-[24px] font-bold text-black">Mes Notifications</h1>
      </div>
      {/* Onglets */}
      <div className="flex gap-2 text-black mt-6 mb-0 px-4 w-full justify-center">
        <button
          className={`px-4 py-2 rounded-t-lg font-bold text-[21px] shadow ${tab === 'nonlu' ? 'bg-[#D9D9D9] border-b-2 border-black' : 'bg-transparent'}`}
          style={{ minWidth: 100 }}
          onClick={() => setTab('nonlu')}
        >
          Non lu
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-bold text-[21px] ${tab === 'lu' ? 'bg-[#D9D9D9] border-b-2 border-black' : 'bg-transparent'}`}
          style={{ minWidth: 80 }}
          onClick={() => setTab('lu')}
        >
          Lu
        </button>
      </div>
      <div className="w-full border-b border-gray-400 mb-6" />
      {/* Timeline ou message selon l'onglet */}
      {tab === 'nonlu' ? (
        <div className="flex flex-col items-center w-full mt-2">
          <div className="bg-[#D9D9D9] text-black rounded-xl shadow px-4 py-2 w-[95%] max-w-[600px] text-center font-bold text-[15px] mb-4">Reservation Confirme</div>
          {/* Flèche verticale */}
          <div className="w-1 h-6 bg-transparent flex flex-col items-center justify-center mb-2">
            <span className="text-black text-lg">↓</span>
          </div>
          <div className="bg-[#D9D9D9] text-black rounded-xl shadow px-4 py-2 w-[95%] max-w-[600px] text-center font-bold text-[16px] mb-0">Reservation Confirme</div>
          <div className="bg-[#D9D9D9] text-black rounded-xl shadow px-4 py-2 w-[95%] max-w-[600px] text-center text-[16px] mt-1">
            Orelson a bien confirme sa reservation pour le trajet prevue le 30 mai 2025 , calavie -cotonou
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full mt-10 text-gray-400 text-[16px]">Aucune notification lue.</div>
      )}
      <Nav activeMenu="notifs" />
    </div>
  );
}
