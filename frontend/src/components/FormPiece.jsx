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
  onSoumettre,
  errors = {},
  setErrors = () => { }
}) {
  // Validation locale avant soumission
  const validate = () => {
    const newErrors = {};
    if (!pieceType) newErrors.pieceType = 'Le type de pièce est requis';
    if (!pieceFile) {
      newErrors.pieceFile = 'Le fichier de la pièce est requis (PNG, JPG ou PDF, max 2 Mo).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePieceTypeChange = (e) => {
    setPieceType(e.target.value);
    setErrors(prev => ({ ...prev, pieceType: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) {
      setErrors(prev => ({ ...prev, pieceFile: 'Format non supporté. PNG, JPG ou PDF uniquement.' }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, pieceFile: 'Fichier trop volumineux (max 2 Mo).' }));
      return;
    }
    setPieceFile(file);
    setErrors(prev => ({ ...prev, pieceFile: '' }));
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
      className="w-full flex flex-col items-center mt-8"
    >
      <div className="w-[90%] text-center items-center justify-center mx-auto text-[21px] font-bold text-[#FF1D1D] mb-12">
        Vérifiez vos Informations avant de publier des trajets
        <hr className="w-full border-t border-gray-400 mt-7" />
      </div>
        <div className="w-full max-w-[350px] mx-auto">
          <div className="w-full text-center text-[21px] font-bold text-black mb-2">Rajouter votre piece</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-[16px] text-gray-600 mb-1">Choix de la piece</label>
              <div className="relative">
                <select
                  className="border border-gray-200 focus:border-blue-400 font-itim  rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white"
                  value={pieceType}
                  onChange={handlePieceTypeChange}
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  <option value="CIP">CIP</option>
                  <option value="CNI">CNI</option>
                  <option value="Passeport">Passeport</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg z-0">▼</span>
              </div>
              {errors.pieceType && <p className="text-red-500 text-sm mb-1">{errors.pieceType}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-[16px] text-gray-600 mb-1">Ajoutez la piece</label>
              <div
                className="flex border border-gray-200 focus:border-blue-400 font-itim  rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white"
                onClick={() => pieceInputRef.current && pieceInputRef.current.click()}
              >
                <FontAwesomeIcon icon={faIdCard} className="text-gray-500 text-xl mr-2" />
                <span className="flex-1 text-[16px] text-gray-500 truncate">{pieceFile ? pieceFile.name : pieceType}</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg,application/pdf"
                  style={{ display: 'none' }}
                  ref={pieceInputRef}
                  onChange={handleFileChange}
                />
              </div>
              {errors.pieceFile && <p className="text-red-500 text-sm mb-1">{errors.pieceFile}</p>}
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[#3B82F6] text-white text-[24px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
                type="submit"
              >
                Soumettre
              </button>
            </div>
          </form>
        </div>
        <hr className="w-[90%] border-t border-gray-400 mt-4" />
    </motion.div>
  );
} 