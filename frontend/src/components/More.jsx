import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';


export default function More({ onClose }) {
  return (
    <div className="min-h-screen h-screen bg-white flex flex-col items-center font-itim w-full pb-10 relative overflow-y-auto">
      {/* Flèche retour */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ x: -4 }}
        onClick={onClose}
        className="absolute top-4 left-4 text-gray-500 text-xl rounded-full focus:outline-none will-change-transform"
        aria-label="Retour"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-[22px] text-black" />
      </motion.button>
      {/* Logo et titre */}
      <div className="flex flex-col items-center mt-4 mb-2">
        <div className="mt-8 mb-2 bg-[#3B82F6] rounded-full w-[95px] h-[90px] flex items-center justify-center shadow-[0_4px_8px_0_rgba(0,0,0,0.22)]">
          <FontAwesomeIcon icon={faCar} className="text-[#FFFFFF] text-[46px]" />
        </div>
        <h1 className="text-[32px] font-bold text-center mt-1 mb-2">CovGo</h1>
      </div>
      {/* Section 1 */}
      <div className="w-full max-w-[388px] px-2">
        <h2 className="text-[36px] font-bold text-gray-700 mb-2">C'est quoi CovGo ?</h2>
        <div className="bg-[#3B82F6] text-white shadow-lg rounded-lg px-3 py-3 mb-2">
          <span className="font-bold text-[20px]">CovGo est une plateforme de Covoiturage. Mettant en Relation des conducteurs et des passagers,</span>
          <p className="text-[16px] mt-1 mb-2">Grâce à CovGo, publiez ou réservez des trajets à moindre coût, gagnez de l'argent sur vos trajets du quotidien.</p>
          <img src="/illustration_5.svg" alt="illustration covoiturage" className="w-full max-w-[388px] h-auto rounded-lg mb-2" />
          <p className="text-[16px]">CovGo facilite la mise en relation entre conducteurs et passagers pour optimiser chaque trajet et réduire les coûts de transport.</p>
        </div>
      </div>
      {/* Section 2 */}
      <div className="w-full max-w-[388px] px-2 mt-6">
        <h2 className="text-[36px] font-bold text-gray-700 mb-2">Qui sommes nous ?</h2>
        <div className="bg-[#3B82F6] text-white shadow-lg rounded-lg px-3 py-3 mb-2">
          <span className="font-bold text-[20px]">Une équipe passionnée par la mobilité partagée,</span>
          <p className="text-[16px] mt-1 mb-2">Notre mission est de rendre le covoiturage accessible, économique et convivial pour tous.</p>
          <img src="/illustration_5.svg" alt="illustration équipe" className="w-full max-w-[388px] h-auto rounded-lg mb-2" />
          <p className="text-[16px]">Nous croyons en une mobilité plus durable et solidaire, où chaque trajet compte pour la planète et le portefeuille.</p>
        </div>
      </div>
      {/* Section 3 : Sécurité */}
      <div className="w-full max-w-[388px] px-2 mt-6">
        <h2 className="text-[36px] font-bold text-gray-700 mb-2">Votre sécurité</h2>
        <div className="bg-[#3B82F6] text-white shadow-lg rounded-lg px-3 py-3 mb-2">
          <span className="font-bold text-[20px]">La sécurité de nos utilisateurs est notre priorité,</span>
          <p className="text-[16px] mt-1 mb-2">Tous les profils sont vérifiés et les trajets sont notés pour garantir une expérience fiable.</p>
          <img src="/illustration_5.svg" alt="illustration sécurité" className="w-full max-w-[388px] h-auto rounded-lg mb-2" />
          <p className="text-[16px]">Nous mettons en place des outils de modération et d'assistance pour assurer la tranquillité de tous lors des trajets.</p>
        </div>
      </div>
      {/* Section 4 : Pourquoi nous choisir */}
      <div className="w-full max-w-[388px] px-2 mt-6">
        <h2 className="text-[36px] font-bold text-gray-700 mb-2">Pourquoi nous choisir ?</h2>
          <div className="bg-[#3B82F6] text-white shadow-lg rounded-lg px-3 py-3 mb-2">
          <span className="font-bold text-[20px]">Un service simple, économique et humain,</span>
          <p className="text-[16px] mt-1 mb-2">CovGo propose une interface intuitive, un accompagnement personnalisé et des trajets adaptés à tous les besoins.</p>
          <img src="/illustration_5.svg" alt="illustration choix" className="w-full max-w-[388px] h-auto rounded-lg mb-2" />
          <p className="text-[16px]">Rejoignez une communauté active et bénéficiez d'avantages exclusifs en utilisant CovGo pour vos déplacements quotidiens ou occasionnels.</p>
        </div>
      </div>
    </div>
  );
}
