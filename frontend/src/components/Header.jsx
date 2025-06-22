import React, { memo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faStar,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const StarRating = memo(({ count = 5 }) => (
  <span className="flex gap-1">
    {[...Array(count)].map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className="text-gray-400 text-lg"
      />
    ))}
  </span>
));

StarRating.displayName = "StarRating";

const Header = memo(({ nom, age, tel, onBack, avatar }) => {
  const navigate = useNavigate();

  const { logout } = useAuthStore();

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      navigate("/messages");
    }
  }, [onBack, navigate]);

  return (
    <>
      {/* En-tête avec flèche de retour */}
      <div className="w-full bg-[#00B4D8] flex items-center  px-2 h-[90px] relative shadow-custom">
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={handleBack}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full focus:outline-none"
          aria-label="Retour"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-[22px]  text-black"
          />
        </motion.button>
        <h1 className="flex-1 text-center text-[24px] text-black">Profils</h1>
      </div>
      {/* Fiche utilisateur */}
      <div className="w-full bg-[#ffffff] px-0 pt-4 pb-6 flex flex-col items-center">
        <div className="flex flex-row items-center  w-[95%] mx-auto ">
          {/* Avatar cerclé */}
          <div className="flex-shrink-0 w-[100px] h-[100px] rounded-full border-2 border-gray-400 flex items-center justify-center bg-white">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-[100px] text-gray-400"
              />
            )}
          </div>
          {/* Infos */}
          <div className="flex flex-col justify-center ml-4 flex-1">
            <span className="text-[24px] text-black">{nom}</span>
            <span className="text-[16px] text-black leading-tight">{tel}</span>
            <StarRating />
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={logout}
          className="p-1 rounded-full focus:outline-none text-black"
        >
          Logout
        </motion.button>
        <hr className="w-[90%] border-t border-gray-400 mt-7" />
      </div>
    </>
  );
});

Header.displayName = "Header";

export default Header;
