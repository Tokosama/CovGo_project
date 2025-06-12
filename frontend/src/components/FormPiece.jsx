import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function FormPiece({
  pieceType,
  setPieceType,
  pieceFile,
  pieceInputRef,
  setPieceFile,
  onSoumettre
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center mt-8"
    >
      <hr className="w-[90%] border-t border-gray-400 mb-2" />
      <div className="w-full max-w-[350px] mx-auto">
        <div className="w-full text-center text-[16px] font-bold text-black mb-2">Rajouter votre piece</div>
        <div className="mb-2">
          <label className="block text-[13px] text-gray-600 mb-1">Choix de la piece</label>
          <div className="relative">
            <select
              className="appearance-none w-full rounded-full bg-[#EDEDED] px-4 py-2 text-[15px] text-black border border-gray-200 focus:border-blue-400 font-itim pr-8 z-10 cursor-pointer"
              value={pieceType}
              onChange={e => setPieceType(e.target.value)}
              style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
            >
              <option value="CIP">CIP</option>
              <option value="CNI">CNI</option>
              <option value="Passeport">Passeport</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg z-0">▼</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[13px] text-gray-600 mb-1">Ajoutez la piece</label>
          <div
            className="flex items-center bg-[#EDEDED] rounded-full border border-gray-300 px-3 py-2 cursor-pointer hover:shadow-md transition"
            onClick={() => pieceInputRef.current && pieceInputRef.current.click()}
          >
            <FontAwesomeIcon icon={faIdCard} className="text-gray-500 text-xl mr-2" />
            <span className="flex-1 text-[15px] text-gray-500 truncate">{pieceFile ? pieceFile.name : pieceType}</span>
            <input
              type="file"
              accept="image/png, image/jpeg,application/pdf"
              style={{ display: 'none' }}
              ref={pieceInputRef}
              onChange={e => setPieceFile(e.target.files[0])}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-[#D9D9D9] text-black text-[18px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
            type="button"
            onClick={onSoumettre}
          >
            Soumettre
          </button>
        </div>
      </div>
      <hr className="w-[80%] border-t border-gray-400 mt-4" />
    </motion.div>
  );
} 