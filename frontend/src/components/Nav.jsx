import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCarSide, faBell, faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Nav({ activeMenu = 'home' }) {
  // On considère 'home', 'list-trips' et 'details' comme Home actif
  const isHome = activeMenu === 'home' || activeMenu === 'list-trips' || activeMenu === 'details';
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 w-full max-w-[400px] mx-auto bg-[#a7a7a7] border-t border-gray-300 flex justify-between items-center px-2 py-1 rounded-b-2xl" style={{boxShadow: '0px -2px 8px #0001'}}>
      <div className="flex flex-col items-center flex-1 transition cursor-pointer" onClick={() => navigate('/home')}>
        <span className="rounded-xl p-1">
          <FontAwesomeIcon icon={faHome} className={`text-xl transition ${isHome ? 'text-gray-300' : 'hover:text-gray-300 text-gray-700'}`} />
        </span>
        <span className="text-[12px] text-gray-700">Home</span>
      </div>
      <div className="flex flex-col items-center flex-1 transition cursor-pointer" onClick={() => navigate('/trips')}>
        <span className="rounded-xl p-1">
          <FontAwesomeIcon icon={faCarSide} className={`text-xl transition ${activeMenu === 'trajets' ? 'text-gray-300' : 'hover:text-gray-300 text-gray-700'}`} />
        </span>
        <span className="text-[12px] text-gray-700">Mes trajets</span>
      </div>
      <div className="flex flex-col items-center flex-1 transition cursor-pointer" onClick={() => navigate('/notifs')}>
        <span className="rounded-xl p-1">
          <FontAwesomeIcon icon={faBell} className={`text-xl transition ${activeMenu === 'notifs' ? 'text-gray-300' : 'hover:text-gray-300 text-gray-700'}`} />
        </span>
        <span className="text-[12px] text-gray-700">Notifs</span>
      </div>
      <div className="flex flex-col items-center flex-1 transition cursor-pointer" onClick={() => navigate('/messages')}>
        <span className="rounded-xl p-1">
          <FontAwesomeIcon icon={faCommentDots} className={`text-xl transition ${activeMenu === 'messages' ? 'text-gray-300' : 'hover:text-gray-300 text-gray-700'}`} />
        </span>
        <span className="text-[12px] text-gray-700">Messages</span>
      </div>
      <div className="flex flex-col items-center flex-1 transition cursor-pointer" onClick={() => navigate('/profil')}>
        <span className="rounded-xl p-1">
          <FontAwesomeIcon icon={faUser} className={`text-xl transition ${activeMenu === 'profil' ? 'text-gray-300' : 'hover:text-gray-300 text-gray-700'}`} />
        </span>
        <span className="text-[12px] text-gray-700">Profil</span>
      </div>
    </div>
  );
} 