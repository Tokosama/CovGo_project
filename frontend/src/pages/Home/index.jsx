import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendarAlt,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import Nav from "../../components/Nav";
import ListTrips from "../../components/List-Trips";
import Details from "../../components/Details";
import { useNavigate } from "react-router-dom";
import { useTrajetStore } from "../../store/useTrajetStore"; // Ajuste le chemin
import { useChatStore } from "../../store/useChatStore";

export default function Home() {
  const [showListTrips, setShowListTrips] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    ville: "",
    depart: "",
    destination: "",
    datetime: "",
    places: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Zustand store
  const { searchTrajets, trajets, isSearching, error } = useTrajetStore();
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  console.log(selectedUser);
  const validateForm = () => {
    const newErrors = {};
    // if (!formData.depart) {
    //   newErrors.depart = "Le point de départ est requis";
    // } else if (formData.depart.length < 3) {
    //   newErrors.depart = "L'adresse doit contenir au moins 3 caractères";
    // }
    // if (!formData.destination) {
    //   newErrors.destination = "La destination est requise";
    // } else if (formData.destination.length < 3) {
    //   newErrors.destination = "L'adresse doit contenir au moins 3 caractères";
    // } else if (formData.destination === formData.depart) {
    //   newErrors.destination =
    //     "La destination doit être différente du point de départ";
    // }
    // if (!formData.datetime) {
    //   newErrors.datetime = "La date et l'heure sont requises";
    // } else {
    //   const selectedDate = new Date(formData.datetime);
    //   const now = new Date();
    //   if (selectedDate < now) {
    //     newErrors.datetime = "La date ne peut pas être dans le passé";
    //   }
    // }
    // if (!formData.places) {
    //   newErrors.places = "Le nombre de places est requis";
    // } else if (formData.places < 1) {
    //   newErrors.places = "Le nombre de places doit être supérieur à 0";
    // } else if (formData.places > 10) {
    //   newErrors.places = "Le nombre maximum de places est de 10";
    // }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setAlertMessage("");

    if (Object.keys(newErrors).length === 0) {
      try {
        // On met un loader local pour le bouton
        setErrors({});
        await searchTrajets({
          ville: formData.ville,
          depart: formData.depart,
          destination: formData.destination,
          datetime: formData.datetime,
          places: formData.places,
        });
        setShowListTrips(true);
      } catch (error) {
        console.error("Erreur:", error);
        setAlertMessage("Une erreur est survenue lors de la recherche");
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "places") {
      processedValue = Math.min(Math.max(parseInt(value) || 0, 0), 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Validation en temps réel
    const newErrors = validateForm();
    setErrors((prev) => ({
      ...prev,
      [name]: newErrors[name] || "",
    }));
  };

  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setShowDetails(true);
  };

  const handleBackFromDetails = () => {
    setShowDetails(false);
  };

  const handleBackFromList = () => {
    setShowListTrips(false);
  };
  const handleContactClick = (user) => {
    setSelectedUser(user);
    navigate("/messages");
  };
  console.log(trajets);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-itim relative pb-5">
      {!showListTrips && !showDetails && (
        <>
          <div className="w-full max-w-[1000px] overflow-hidden">
            <div className="w-full h-[450px] hadow-custom bg-[#90E0EF] flex items-center justify-center blur-[1px] relative">
              <img
                src="/illustration_8.png"
                alt="Illustration d'une recherche de trajet"
                className="absolute inset-0 w-full h-[325px] object-contain"
              />
            </div>
          </div>
          <h1
            className="text-[32px] font-extrabold text-center text-white mt-2 mb-20 drop-shadow-lg"
            style={{
              fontFamily: "Itim, cursive",
              textShadow: "2px 2px 6px #0008",
              letterSpacing: 1,
              marginTop: "-19rem",
            }}
          >
            Trouvez Votre
            <br />
            trajet
          </h1>
          {/* Formulaire de recherche */}
          <form
            className="w-full  z-50 max-w-[340px] bg-[#00B4D8] rounded-2xl shadow-custom
              flex flex-col items-center   pb-6 mb-24
              sm:max-w-[340px] sm:px-4 sm:pt-4 sm:pb-6
              max-[400px]:max-w-[95vw] max-[400px]:px-5 max-[400px]:pt-8 max-[400px]:pb-5
              max-[340px]:max-w-[98vw] max-[340px]:px-5 max-[340px]:pt-8 max-[340px]:pb-5"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="ville"
              className="sr-only"
            >
              Ville
            </label>
            <div className="w-full flex items-center border border-black rounded-2xl bg-[#ffffff] px-4 py-2 mb-3">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-blue-600 mr-2"
              />
              <input
                id="ville"
                name="ville"
                type="text"
                value={formData.ville}
                onChange={handleChange}
                placeholder="Ville"
                className={`flex-1  outline-none text-[20px] text-black placeholder:text-gray-400 ${
                  errors.ville ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.ville && (
              <p className="text-red-500 text-sm mb-2 w-full">{errors.ville}</p>
            )}
            {/* Point de départ */}
            <label
              htmlFor="depart"
              className="sr-only"
            >
              Point de départ
            </label>
            <div className="w-full flex items-center border border-black rounded-2xl bg-[#ffffff] px-4 py-2 mb-3">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-green-600 mr-2"
              />
              <input
                id="depart"
                name="depart"
                type="text"
                value={formData.depart}
                onChange={handleChange}
                placeholder="Point de depart"
                className={`flex-1 bg-transparent outline-none text-[20px] text-black placeholder:text-gray-400 ${
                  errors.depart ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.depart && (
              <p className="text-red-500 text-sm mb-2 w-full">
                {errors.depart}
              </p>
            )}

            {/* Point de destination */}
            <label
              htmlFor="destination"
              className="sr-only"
            >
              Point de destination
            </label>
            <div className="w-full flex items-center border border-black rounded-2xl bg-[#ffffff] px-4 py-2 mb-3">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-red-600 mr-2"
              />
              <input
                id="destination"
                name="destination"
                type="text"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Point de destination"
                className={`flex-1 bg-transparent outline-none text-[20px] text-black  placeholder:text-gray-400 ${
                  errors.destination ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.destination && (
              <p className="text-red-500 text-sm mb-2 w-full">
                {errors.destination}
              </p>
            )}

            {/* Date/heure et No Place */}
            <div className="w-full flex gap-2 mb-4">
              <label
                htmlFor="datetime"
                className="sr-only"
              >
                Date et heure
              </label>
              <div
                className="flex items-center border border-black rounded-2xl bg-[#ffffff] px-2 py-2"
                style={{ flexBasis: "65%", maxWidth: "220px" }}
              >
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="mr-2 text-black text-[16px]"
                />
                <input
                  id="datetime"
                  name="datetime"
                  type="datetime-local"
                  value={formData.datetime}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 16)}
                  className={`w-full bg-transparent outline-none text-[20px] text-black placeholder:text-gray-400 ${
                    errors.datetime ? "border-red-500" : ""
                  }`}
                  style={{ minWidth: 0 }}
                />
              </div>
              <label
                htmlFor="places"
                className="sr-only"
              >
                Nombre de places
              </label>
              <div
                className="flex items-center border border-black rounded-2xl bg-[#ffffff] px-2 py-2 justify-center"
                style={{ flexBasis: "35%", minWidth: "70px" }}
              >
                <FontAwesomeIcon
                  icon={faUserFriends}
                  className="mr-1 text-black text-[20px]"
                />
                <input
                  id="places"
                  name="places"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.places}
                  onChange={handleChange}
                  placeholder="Nbr"
                  inputMode="numeric"
                  className={`w-full bg-transparent outline-none text-[15px] font-bold text-black placeholder:text-gray-400 text-center ${
                    errors.places ? "border-red-500" : ""
                  }`}
                  style={{
                    MozAppearance: "textfield",
                    width: "40px",
                    minWidth: "30px",
                  }}
                  onWheel={(e) => e.target.blur()}
                />
              </div>
            </div>
            {errors.datetime && (
              <p className="text-red-500 text-sm mb-2 w-full">
                {errors.datetime}
              </p>
            )}
            {errors.places && (
              <p className="text-red-500 text-sm mb-2 w-full">
                {errors.places}
              </p>
            )}

            {/* Bouton rechercher */}
            <button
              type="submit"
              disabled={isSearching}
              className={`w-full bg-[#3B82F6]  mt- text-white text-[24px] rounded-2xl py-2 mb-2 shadow-custom border border-black/20 hover:bg-[#3B82F6]/80 transition ${
                isSearching ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="flex items-center justify-center">
                {isSearching ? (
                  <>
                    Recherche en cours
                    <span className="spinner ml-2"></span>
                  </>
                ) : (
                  "Rechercher"
                )}
              </span>
            </button>
            {alertMessage && (
              <p className="text-red-500 text-sm mt-2 w-full text-center">
                {alertMessage}
              </p>
            )}
            {error && (
              <p className="text-red-500 text-sm mt-2 w-full text-center">
                {error}
              </p>
            )}
          </form>
        </>
      )}

      {showListTrips && !showDetails && (
        <ListTrips
          onBack={handleBackFromList}
          onTripClick={handleTripClick}
          onContactClick={handleContactClick}
          trajets={trajets}
        />
      )}
      {showDetails && (
        <Details
          trip={selectedTrip}
          onBack={handleBackFromDetails}
          onContactClick={handleContactClick}
        />
      )}

      <Nav />
      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid #ffffff;
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1s linear infinite;
          display: inline-block;
          margin-left: 8px;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
