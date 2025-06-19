import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="relative bg-white text-black min-h-screen font-itim flex flex-col items-center justify-start px-6 pt-5 pb-5">
      {/* Bouton "À Propos" */}
      <div className="absolute top-3 left-3">
        <button
          className="bg-[#00B4D8] hover:bg-[#00B4D8]/80 text-white text-[14px] rounded-lg px-2 py-1 w-[80px] h-[36px] shadow-custom tracking-wide"
          onClick={() => navigate("/about")}
        >
          A Propos
        </button>
      </div>

      {/* Icône dans un cercle */}
      <div className="relative mb-2 w-[95px] h-[90px] rounded-full flex items-center justify-center">
        {/* Fond bleu flouté en arrière-plan */}
        <div className="absolute inset-0 bg-[#3B82F6] rounded-full  blur-xs shadow-custom"></div>

        {/* Icône non floutée au premier plan */}
        <FontAwesomeIcon
          icon={faCar}
          className="text-white  text-[46px] relative z-10"
        />
      </div>

      {/* Titre principal */}
      <h1 className="text-[32px] font-bold mb-3 text-center">CovGo</h1>

      {/* Sous-titre */}
      <p className="text-[26px] text-[#1F2937] text-center mb-6 leading-tight">
        Votre plateforme de covoiture locale
      </p>

      {/* Illustration */}
      <img
        src="/illustration_2.svg"
        alt="Illustration covoiturage"
        className="w-[210px] h-auto mb-6"
      />

      {/* Description */}
      <p className="text-[24px] text-gray-400 text-center px-1  mb-10 font-light">
        Gagner de l'argent sur vos déplacements du quotidien.
      </p>

      {/* Bouton d'inscription */}
      <button
        className="bg-[#3B82F6] hover:bg-[#3B82F6]/80 text-white text-[16px]  px-4 py-2 rounded-lg w-[210px] h-[40px] shadow-custom"
        onClick={() => navigate("/register")}
      >
        Passez à l'inscription
      </button>
    </div>
  );
}
