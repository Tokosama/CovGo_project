import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faUserFriends, faSearch, faHome, faCarSide, faBell, faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-itim relative">
      {/* Illustration et titre */}
      <div className="w-full max-w-[400px] rounded-t-2xl overflow-hidden">
        <div className="relative w-full h-[200px] bg-[#EDEDED] flex items-center justify-center">
          <img src="/illustration_4.svg" alt="Trouvez votre trajet" className="absolute inset-0 w-full h-full object-contain" />
        </div>
      </div>
      <h1 className="text-[22px] font-bold text-center text-black mt-2 mb-4">Trouvez  Votre trajet</h1>
      {/* Carte de recherche */}
      <div className="w-full max-w-[340px] bg-[#D9D9D9] rounded-2xl shadow-lg flex flex-col items-center px-4 pt-4 pb-6 mb-8" style={{boxShadow: '2px 4px 8px #0002'}}>
        {/* Point de départ */}
        <div className="w-full flex items-center border border-black rounded-lg bg-white px-4 py-2 mb-3">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600 mr-2" />
          <span className="text-[16px] text-black">Point de depart</span>
        </div>
        {/* Point de destination */}
        <div className="w-full flex items-center border border-black rounded-lg bg-white px-4 py-2 mb-3">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 mr-2" />
          <span className="text-[16px] text-black">Point de destination</span>
        </div>
        {/* Date/heure et No Place */}
        <div className="w-full flex gap-2 mb-4">
          <button className="flex-1 flex items-center border border-black rounded-lg bg-white px-3 py-2 text-[15px] text-black">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            Date et heure
          </button>
          <button className="flex-1 flex items-center border border-black rounded-lg bg-white px-3 py-2 text-[15px] text-black">
            <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
            No Place
          </button>
        </div>
        {/* Bouton rechercher */}
        <button className="w-full bg-[#EDEDED] text-black text-[18px] font-bold rounded-md py-2 mt-2 border border-black shadow-sm hover:bg-[#d1d1d1] transition">Rechercher</button>
      </div>
      {/* Barre de navigation bas */}
      <div className="fixed bottom-0 left-0 w-full max-w-[400px] mx-auto bg-[#F5F5F5] border-t border-gray-300 flex justify-between items-center px-2 py-1 rounded-b-2xl" style={{boxShadow: '0px -2px 8px #0001'}}>
        <div className="flex flex-col items-center flex-1">
          <FontAwesomeIcon icon={faHome} className="text-gray-700 text-xl" />
          <span className="text-[12px] text-gray-700">Home</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <FontAwesomeIcon icon={faCarSide} className="text-gray-700 text-xl" />
          <span className="text-[12px] text-gray-700">Mes trajets</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <FontAwesomeIcon icon={faBell} className="text-gray-700 text-xl" />
          <span className="text-[12px] text-gray-700">Notifs</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <FontAwesomeIcon icon={faCommentDots} className="text-gray-700 text-xl" />
          <span className="text-[12px] text-gray-700">Messages</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <FontAwesomeIcon icon={faUser} className="text-gray-700 text-xl" />
          <span className="text-[12px] text-gray-700">Profil</span>
        </div>
      </div>
    </div>
  );
}
