import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function RecapProfil({ bio, onUpdate, errors = {}, setErrors = () => {}, onBioChange }) {
  const [editing, setEditing] = useState(false);
  const [localBio, setLocalBio] = useState(bio);

  // Validation locale
  const validate = () => {
    const newErrors = {};
    if (!localBio || localBio.trim().length === 0) {
      newErrors.bio = 'La biographie est requise';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (validate()) {
      setEditing(false);
      if (onBioChange) onBioChange(localBio);
      onUpdate();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center mt-8"
    >
      <div className="w-full max-w-[350px] mx-auto">
        {editing ? (
          <>
            <textarea
              className="bg-[#EDEDED] rounded-md border border-gray-300 px-3 py-2 text-[16px] text-black mb-2 w-full min-h-[80px]"
              value={localBio}
              onChange={e => {
                setLocalBio(e.target.value);
                setErrors(prev => ({ ...prev, bio: '' }));
              }}
              placeholder="Votre biographie..."
            />
            {errors.bio && <p className="text-red-500 text-sm mb-1">{errors.bio}</p>}
            <div className="flex justify-center mb-4 gap-2">
              <button
                className="bg-[#D9D9D9] text-black text-[16px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
                onClick={handleUpdate}
                type="button"
              >
                Sauvegarder
              </button>
              <button
                className="bg-[#eee] text-black text-[16px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#ccc] transition"
                onClick={() => { setEditing(false); setLocalBio(bio); setErrors(prev => ({ ...prev, bio: '' })); }}
                type="button"
              >
                Annuler
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#EDEDED] rounded-md border border-gray-300 px-3 py-2 text-[16px] text-black mb-2">
              {bio}
            </div>
            <div className="flex justify-center mb-4">
              <button
                className="bg-[#D9D9D9] text-black text-[16px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
                onClick={() => setEditing(true)}
                type="button"
              >
                Mettre à jour
              </button>
            </div>
          </>
        )}
        <hr className="w-[90%] border-t border-gray-400 mx-auto mt-2 mb-2" />
        <div className="w-full text-center text-[21px] font-bold text-black mt-2">Trajet a venir</div>
      </div>
    </motion.div>
  );
} 