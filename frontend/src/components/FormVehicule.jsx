import React from 'react';
import { motion } from 'framer-motion';

export default function FormVehicule({ vehicule, setVehicule, onEnregistrer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center mt-8"
    >
      <div className="w-full max-w-[350px] mx-auto">
        <div className="w-full text-center text-[16px] font-bold text-black mb-2">Rajouter les infos de votre vehicule</div>
        <div className="flex flex-col gap-3 mb-3">
          <input
            type="text"
            placeholder="Marque"
            className="rounded-full bg-[#EDEDED] text-black px-4 py-2 text-[15px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
            value={vehicule.marque}
            onChange={e => setVehicule({ ...vehicule, marque: e.target.value })}
          />
          <input
            type="text"
            placeholder="Modele"
            className="rounded-full bg-[#EDEDED] px-4 py-2 text-black text-[15px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
            value={vehicule.modele}
            onChange={e => setVehicule({ ...vehicule, modele: e.target.value })}
          />
          <input
            type="text"
            placeholder="Couleur"
            className="rounded-full bg-[#EDEDED] px-4 py-2 text-black text-[15px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
            value={vehicule.couleur}
            onChange={e => setVehicule({ ...vehicule, couleur: e.target.value })}
          />
          <input
            type="text"
            placeholder="Immatriculation"
            className="rounded-full bg-[#EDEDED] px-4 py-2 text-black text-[15px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
            value={vehicule.immat}
            onChange={e => setVehicule({ ...vehicule, immat: e.target.value })}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-[#D9D9D9] text-black text-[18px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
            type="button"
            onClick={onEnregistrer}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </motion.div>
  );
} 