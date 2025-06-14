import React from 'react';
import { motion } from 'framer-motion';

export default function RecapProfil({ bio, onUpdate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center mt-8"
    >
      <div className="w-full max-w-[350px] mx-auto">
        <div className="bg-[#EDEDED] rounded-md border border-gray-300 px-3 py-2 text-[16px] text-black mb-2">
          {bio}
        </div>
        <div className="flex justify-center mb-4">
          <button
            className="bg-[#D9D9D9] text-black text-[16px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
            onClick={onUpdate}
          >
            Mettre à jour
          </button>
        </div>
        <hr className="w-[90%] border-t border-gray-400 mx-auto mt-2 mb-2" />
        <div className="w-full text-center text-[21px] font-bold text-black mt-2">Trajet a venir</div>
      </div>
    </motion.div>
  );
} 