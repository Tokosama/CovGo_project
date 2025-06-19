import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function RecapProfil({ onUpdate, errors = {}, setErrors = () => { }, onFormChange, formData = {} }) {
  const [localForm, setLocalForm] = useState({
    nom: formData.nom || '',
    prenom: formData.prenom || '',
    telephone: formData.telephone || '',
    adresse: formData.adresse || '',
    bio: formData.bio || '',
  });

  // Validation locale
  const validate = () => {
    const newErrors = {};
    if (!localForm.nom) newErrors.nom = 'Le nom est requis';
    if (!localForm.prenom) newErrors.prenom = 'Le prénom est requis';
    if (!localForm.telephone) newErrors.telephone = 'Le téléphone est requis';
    if (!localForm.adresse) newErrors.adresse = 'L\'adresse est requise';
    if (!localForm.bio) newErrors.bio = 'La biographie est requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    if (onFormChange) onFormChange({ ...localForm, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validate()) {
      if (onFormChange) onFormChange(localForm);
      onUpdate();
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center mt-8"
      onSubmit={handleUpdate}
    >
      <div className="w-full max-w-[350px] mx-auto">
        <div className="w-[90%] text-center items-center justify-center mx-auto text-[21px] font-bold text-[#FF1D1D] mt-[-30px] mb-4">
          Renseignez vos nouvelles informations
        </div>
        <input
          name="nom"
          type="text"
          placeholder="Nom"
          value={localForm.nom}
          onChange={handleChange}
          className="w-full text-[#6B7280] mb-3 px-4 py-2 rounded-xl border border-gray-300 shadow text-[16px]"
        />
        {errors.nom && <p className="text-red-500 text-sm mb-1">{errors.nom}</p>}
        <input
          name="prenom"
          type="text"
          placeholder="Prenom"
          value={localForm.prenom}
          onChange={handleChange}
          className="w-full text-[#6B7280] mb-3 px-4 py-2 rounded-xl border border-gray-300 shadow text-[16px]"
        />
        {errors.prenom && <p className="text-red-500 text-sm mb-1">{errors.prenom}</p>}
        <input
          name="telephone"
          type="text"
          placeholder="telephone"
          value={localForm.telephone}
          onChange={handleChange}
          className="w-full text-[#6B7280] mb-3 px-4 py-2 rounded-xl border border-gray-300 shadow text-[16px]"
        />
        {errors.telephone && <p className="text-red-500 text-sm mb-1">{errors.telephone}</p>}
        <input
          name="adresse"
          type="text"
          placeholder="adresse"
          value={localForm.adresse}
          onChange={handleChange}
          className="w-full text-[#6B7280] mb-3 px-4 py-2 rounded-xl border border-gray-300 shadow text-[16px]"
        />
        {errors.adresse && <p className="text-red-500 text-sm mb-1">{errors.adresse}</p>}
        <textarea
          name="bio"
          placeholder="Bio"
          value={localForm.bio}
          onChange={handleChange}
          className="w-full text-[#000000] mb-3 px-4 py-2 rounded-xl border border-gray-300 shadow text-[16px] min-h-[80px]"
        />
        {errors.bio && <p className="text-red-500 text-sm mb-1">{errors.bio}</p>}
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="w-[60%] bg-[#FFE082] text-black font-bold text-[16px] rounded-md py-2 mt-2 shadow hover:bg-[#ffe082cc] transition"
          >
            Mettre a jour
          </button>
        </div>
      </div>
    </motion.form>
  );
} 