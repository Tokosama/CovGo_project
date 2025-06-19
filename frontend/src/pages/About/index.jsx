import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import More from '../../components/More';

export default function About() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
  };

  const handleAnimationComplete = () => {
    if (isExiting) {
      navigate('/');
    }
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleCloseMore = () => {
    setShowMore(false);
  };

  return (
    <div className="fixed text-black inset-0 z-50 flex items-start justify-center bg-white backdrop-blur-[2px]">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={isExiting ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="relative w-full max-w-[1000px] bg-[#ADE8F4] rounded-b-2xl shadow-lg flex flex-col items-center px-4 pt-5 pb-8 font-itim mt-0 will-change-transform"
        style={{ minHeight: 540 }}
        onAnimationComplete={handleAnimationComplete}
      >
        {/* Flèche retour */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={handleClose}
          className="absolute top-4 left-4 text-gray-500 text-xl rounded-full focus:outline-none will-change-transform"
          aria-label="Retour"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[22px] text-black" />
        </motion.button>
        {/* Icône dans un cercle */}
        <div className="mt-8 mb-2 bg-[#3B82F6] rounded-full w-[95px] h-[90px] flex items-center justify-center shadow-[0_4px_8px_0_rgba(0,0,0,0.22)]">
          <FontAwesomeIcon icon={faCar} className="text-[#FFFFFF] text-[46px]" />
        </div>
        {/* Titre principal */}
        <h1 className="text-[32px] font-bold mb-1 text-center">CovGo</h1>
        {/* Sous-titre */}
        <p className="text-[36px] font-bold text-center mb-6 leading-tight">
          A propos de CovGo
        </p>
        {/* Boutons d'information */}
        <div className="flex flex-col gap-2 w-full max-w-[260px] mb-8">
          <button className="bg-[#3B82F6] hover:bg-[#3B82F6]/80 text-white text-[24px] font-bold rounded-md py-2 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.03]" onClick={handleShowMore}>C'est quoi CovGo</button>
          <button className="bg-[#3B82F6] hover:bg-[#3B82F6]/80 text-white text-[24px] font-bold rounded-md py-2 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.03]" onClick={handleShowMore}>Qui Sommes nous</button>
          <button className="bg-[#3B82F6] hover:bg-[#3B82F6]/80 text-white text-[24px] font-bold rounded-md py-2 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.03]" onClick={handleShowMore}>Votre securitee</button>
          <button className="bg-[#3B82F6] hover:bg-[#3B82F6]/80 text-white text-[24px] font-bold rounded-md py-2 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.03]" onClick={handleShowMore}>Pourquoi nous choisir</button>
        </div>
        {/* Bouton inscription */}
        <button
          className="bg-[#3B82F6] hover:bg-[#3B82F6]/80 text-white text-[16px] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.03] font-bold rounded-md py-2 px-4 w-full max-w-[220px]"
          onClick={() => navigate('/register')}
        >
          Passez à l'inscription
        </button>
      </motion.div>
      {/* Overlay More avec transition */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-60 flex items-start justify-center bg-black/30 will-change-transform"
          >
            <div className="w-full max-w-[1000px] mx-auto ">
              <More onClose={handleCloseMore} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 