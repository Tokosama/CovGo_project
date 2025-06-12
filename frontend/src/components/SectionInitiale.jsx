import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faCamera } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function SectionInitiale({
  permis,
  handlePermisClick,
  permisInputRef,
  handlePermisChange,
  photoPermis,
  handlePhotoPermisClick,
  photoPermisInputRef,
  handlePhotoPermisChange,
  onSoumettre
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full text-center text-[15px] font-bold text-black mb-12">Vérifiez vos Informations avant de publier des trajets</div>
      {/* Bloc permis */}
      <div className="w-full max-w-[300px] mx-auto flex flex-col gap-2 mb-2">
        <span className="font-bold text-[15px] text-black">Rajouter votre Permis de conduire</span>
        <div className="flex items-center bg-[#EDEDED] rounded-xl border border-gray-300 px-3 py-2 cursor-pointer transition hover:shadow-md" onClick={handlePermisClick}>
          <FontAwesomeIcon icon={faIdCard} className="text-gray-500 text-xl mr-2" />
          <span className="flex-1 text-[15px] text-gray-500 truncate">{permis ? permis : 'Permis de conduire'}</span>
          <input
            type="file"
            accept="image/png, image/jpeg,application/pdf"
            style={{ display: 'none' }}
            ref={permisInputRef}
            onChange={handlePermisChange}
          />
        </div>
      </div>
      {/* Bloc photo permis */}
      <div className="w-full max-w-[300px] mx-auto flex flex-col gap-2 mb-2 mt-2">
        <span className="font-bold text-[15px] text-black">Rajouter une photo de vous avec le permis de conduire</span>
        <div className="flex items-center justify-center bg-[#EDEDED] rounded-xl border border-gray-300 px-3 py-2 cursor-pointer transition hover:shadow-md" onClick={handlePhotoPermisClick}>
          {photoPermis ? (
            <img src={photoPermis} alt="Aperçu" className="w-12 h-12 object-cover rounded-lg" />
          ) : (
            <FontAwesomeIcon icon={faCamera} className="text-gray-500 text-2xl" />
          )}
          <input
            type="file"
            accept="image/png, image/jpeg"
            style={{ display: 'none' }}
            ref={photoPermisInputRef}
            onChange={handlePhotoPermisChange}
          />
        </div>
      </div>
      {/* Bouton soumettre */}
      <div className="w-full flex justify-center mt-4 mb-6">
        <button
          className="bg-[#D9D9D9] text-black text-[18px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
          onClick={onSoumettre}
          type="button"
        >
          Soumettre
        </button>
      </div>
      <hr className="w-[80%] mx-auto mt-2 mb-2 border-gray-300" />
    </motion.div>
  );
} 