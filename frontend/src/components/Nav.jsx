import React, { useCallback, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCarSide, faBell, faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const NavItem = memo(({ icon, label, isActive, onClick }) => (
  <div className="flex flex-col items-center flex-1 transition cursor-pointer" onClick={onClick}>
    <span className="rounded-xl p-0.5">
      <FontAwesomeIcon icon={icon} className={`text-lg transition ${isActive ? 'text-gray-300' : 'hover:text-gray-300 text-gray-700'}`} />
    </span>
    <span className="text-[10px] text-gray-700">{label}</span>
  </div>
));

NavItem.displayName = 'NavItem';

const Nav = memo(({ activeMenu = 'home' }) => {
  const navigate = useNavigate();
  const isHome = activeMenu === 'home' || activeMenu === 'list-trips' || activeMenu === 'details';

  const handleNavigation = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#a7a7a7] border-t border-gray-300 flex justify-between items-center px-1 py-2" style={{boxShadow: '0px -2px 8px #0001'}}>
      <NavItem 
        icon={faHome} 
        label="Home" 
        isActive={isHome} 
        onClick={() => handleNavigation('/home')} 
      />
      <NavItem 
        icon={faCarSide} 
        label="Mes trajets" 
        isActive={activeMenu === 'trajets'} 
        onClick={() => handleNavigation('/trips')} 
      />
      <NavItem 
        icon={faBell} 
        label="Notifs" 
        isActive={activeMenu === 'notifs'} 
        onClick={() => handleNavigation('/notifs')} 
      />
      <NavItem 
        icon={faCommentDots} 
        label="Messages" 
        isActive={activeMenu === 'messages'} 
        onClick={() => handleNavigation('/messages')} 
      />
      <NavItem 
        icon={faUser} 
        label="Profil" 
        isActive={activeMenu === 'profil'} 
        onClick={() => handleNavigation('/profil')} 
      />
    </div>
  );
});

Nav.displayName = 'Nav';

export default Nav; 