import React, { useCallback, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCarSide,
  faBell,
  faCommentDots,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../store/useNotificationStore";

const NavItem = memo(({ icon, label, isActive, onClick, children }) => (
  <div
    className="relative flex flex-col items-center flex-1 transition cursor-pointer"
    onClick={onClick}
  >
    <span className="relative rounded-xl p-0.5">
      <FontAwesomeIcon
        icon={icon}
        className={`text-2xl transition ${
          isActive ? "text-[#3B82F6]" : "hover:text-white text-white"
        }`}
      />
      {children /* badge positionné ici */}
    </span>
    <span
      className={`text-[14px] ${isActive ? "text-[#3B82F6]" : "text-white"}`}
    >
      {label}
    </span>
  </div>
));

NavItem.displayName = "NavItem";

const Nav = memo(({ activeMenu = "home" }) => {
  const navigate = useNavigate();
  const isHome =
    activeMenu === "home" ||
    activeMenu === "list-trips" ||
    activeMenu === "details";

  const unreadCount = useNotificationStore(
    (state) => state.notifications.filter((n) => !n.vue).length
  );

  const handleNavigation = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <div
      className="fixed bottom-[-1px] z-100 left-0 w-full bg-[#ADE8F4] border-t border-gray-300 flex justify-between items-center px-1 py-2"
      style={{ boxShadow: "0px -2px 8px #0001" }}
    >
      <NavItem
        icon={faHome}
        label="Home"
        isActive={isHome}
        onClick={() => handleNavigation("/home")}
      />
      <NavItem
        icon={faCarSide}
        label="Mes trajets"
        isActive={activeMenu === "trajets"}
        onClick={() => handleNavigation("/trips")}
      />
      <NavItem
        icon={faBell}
        label="Notifs"
        isActive={activeMenu === "notifs"}
        onClick={() => handleNavigation("/notifs")}
      >
        {unreadCount > 0 && (
          <span
            className="absolute top-[-2px] right-[-1px] -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-red-600 shadow-custom rounded-full shadow-md"
            aria-label={`${unreadCount} notifications non lues`}
            title={`${unreadCount} notifications non lues`}
          />
        )}
      </NavItem>

      <NavItem
        icon={faCommentDots}
        label="Messages"
        isActive={activeMenu === "messages"}
        onClick={() => handleNavigation("/messages")}
      />
      <NavItem
        icon={faUser}
        label="Profil"
        isActive={activeMenu === "profil"}
        onClick={() => handleNavigation("/profil")}
      />
    </div>
  );
});

Nav.displayName = "Nav";

export default Nav;
