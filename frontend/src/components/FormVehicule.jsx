import React from 'react';
import { motion } from 'framer-motion';

export default function FormVehicule({ vehicule, setVehicule, onEnregistrer, errors = {}, setErrors = () => {} }) {
  // Validation locale avant soumission
  const validate = () => {
    const newErrors = {};
    if (!vehicule.marque) newErrors.marque = 'La marque est requise';
    if (!vehicule.modele) newErrors.modele = 'Le modèle est requis';
    if (!vehicule.couleur) newErrors.couleur = 'La couleur est requise';
    if (!vehicule.immat) newErrors.immat = 'L\'immatriculation est requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicule(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onEnregistrer();
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
        <div className="w-full text-center text-[21px] font-bold text-black mb-2">Rajouter les infos de votre vehicule</div>
        <form className="flex flex-col gap-3 mb-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="marque"
            placeholder="Marque"
            className="rounded-full bg-[#EDEDED] text-black px-4 py-2 text-[16px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
            value={vehicule.marque}
            onChange={handleChange}
          />
          {errors.marque && <p className="text-red-500 text-sm mb-1">{errors.marque}</p>}
          <input
            type="text"
            name="modele"
            placeholder="Modele"
            className="rounded-full bg-[#EDEDED] px-4 py-2 text-black text-[16px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
            value={vehicule.modele}
            onChange={handleChange}
          />
          {errors.modele && <p className="text-red-500 text-sm mb-1">{errors.modele}</p>}
          <input
            type="text"
            name="couleur"
            placeholder="Couleur"
            className="rounded-full bg-[#EDEDED] px-4 py-2 text-black text-[16px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
            value={vehicule.couleur}
            onChange={handleChange}
          />
          {errors.couleur && <p className="text-red-500 text-sm mb-1">{errors.couleur}</p>}
          <input
            type="text"
            name="immat"
            placeholder="Immatriculation"
            className="rounded-full bg-[#EDEDED] px-4 py-2 text-black text-[16px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
            value={vehicule.immat}
            onChange={handleChange}
          />
          {errors.immat && <p className="text-red-500 text-sm mb-1">{errors.immat}</p>}
          <div className="flex justify-center mt-2">
            <button
              className="bg-[#3B82F6] text-white text-[24px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
              type="submit"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
} 