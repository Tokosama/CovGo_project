import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="relative bg-white text-black min-h-screen font-itim flex flex-col items-center justify-start px-6 pt-10 pb-10">
      {/* Bouton "À Propos" */}
      <div className="absolute top-3 left-3">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-[14px] rounded-lg px-2 py-1 w-[80px] h-[36px] font-semibold shadow-sm tracking-wide"
          onClick={() => navigate('/about')}
        >
          A Propos
        </button>
      </div>

      {/* Icône dans un cercle */}
      <div className="mt-8 mb-2 bg-gray-100 rounded-full w-[90px] h-[90px] flex items-center justify-center">
        <FontAwesomeIcon icon={faCar} className="text-[#3F5EA1] text-[36px]" />
      </div>

      {/* Titre principal */}
      <h1 className="text-[32px] font-bold mb-6 text-center">CovGo</h1>

      {/* Sous-titre */}
      <p className="text-[25px] font-semibold text-center mb-6 leading-tight">
        Votre plateforme de covoiture
      </p>

      {/* Illustration */}
      <img
        src="/illustration_2.svg"
        alt="Illustration covoiturage"
        className="w-[210px] h-auto mb-6"
      />

      {/* Description */}
      <p className="text-[24px] text-gray-400 text-center px-2 leading-relaxed mb-10 font-light">
        Publier ou Réserver des trajets à moindre coût, gagner de l'argent sur vos trajets du quotidien
      </p>

      {/* Bouton d'inscription */}
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-[16px] font-semibold px-4 py-2 rounded-lg w-[210px] h-[40px] shadow-sm"
        onClick={() => navigate('/register')}
      >
        Passez à l'inscription
      </button>
    </div>
  );
}
