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
  onSoumettre,
  errors = {},
  setErrors = () => {}
}) {
  // Validation locale avant soumission
  const validate = () => {
    const newErrors = {};
    if (!permis) {
      newErrors.permis = 'Le fichier du permis est requis (PNG, JPG ou PDF, max 2 Mo).';
    }
    if (!photoPermis) {
      newErrors.photoPermis = 'La photo avec le permis est requise (PNG ou JPG, max 2 Mo).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSoumettre();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-[95%] text-center items-center justify-center mx-auto text-[24px]  text-[#FF1D1D] mb-12">Vérifiez vos Informations avant de publier des trajets
      <hr className="w-full border-t border-gray-400 mt-7" />
      </div>
      {/* Bloc permis */}
      <div className="w-[95%] mx-auto flex flex-col gap-2 mb-2">
        <span className="text-[20px] text-center  text-black">Rajouter votre Permis de conduire</span>
        <div className="flex items-center bg-white shadow-custom rounded-xl border border-gray-300 px-3 py-3 cursor-pointer transition hover:shadow-md" onClick={handlePermisClick}>
          <FontAwesomeIcon icon={faIdCard} className="text-gray-500 text-xl mr-2" />
          <span className="flex-1 text-[16px] text-gray-500 truncate">{permis ? permis : 'Permis de conduire'}</span>
          <input
            type="file"
            accept="image/png, image/jpeg,application/pdf"
            style={{ display: 'none' }}
            ref={permisInputRef}
            onChange={handlePermisChange}
          />
        </div>
        {errors.permis && <p className="text-red-500 text-sm mb-1">{errors.permis}</p>}
      </div>
      {/* Bloc photo permis */}
      <div className="w-[95%] mx-auto flex flex-col gap-2 mb-2 mt-8">
        <span className="text-[20px] text-center text-black">Rajouter une photo de vous avec le permis de conduire</span>
        <div className="flex items-center justify-center  rounded-xl shadow-custom border border-gray-300 px-3 py-3 cursor-pointer transition hover:shadow-md" onClick={handlePhotoPermisClick}>
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
        {errors.photoPermis && <p className="text-red-500 text-sm mb-1">{errors.photoPermis}</p>}
      </div>
      {/* Bouton soumettre */}
      <div className="w-full flex justify-center mt-4 mb-6">
        <button
          className="bg-[#3B82F6] text-white text-[24px]  rounded-lg py-2 px-8 shadow-custom   hover:bg-[#bdbdbd] transition"
          onClick={handleSubmit}
          type="button"
        >
          Soumettre
        </button>
      </div>
      <hr className="w-[95%] mx-auto mt-2 mb-2 border-gray-300" />
    </motion.div>
  );
} 