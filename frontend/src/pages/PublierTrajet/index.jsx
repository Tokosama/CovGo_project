import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendarAlt,
  faUserFriends,
  faCarSide,
  faClock,
  faMoneyBill,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import Nav from "../../components/Nav";
import { useNavigate } from "react-router-dom";
import { useTrajetStore } from "../../store/useTrajetStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatepicker.css"; // fichier CSS custom
import { useVehiculeStore } from "../../store/useVehiculeStore";

export default function PublierTrajet() {
  const [form, setForm] = useState({
    ville: "",
    depart: "",
    destination: "",
    date_depart: "",
    heure_depart: "",
    places: "",
    prix: "",
    preferences: "",
    vehicule_id: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const createTrajet = useTrajetStore((state) => state.createTrajet);
  const { vehicules, isFetching, fetchVehicules } = useVehiculeStore();

  useEffect(() => {
    fetchVehicules();
  }, [fetchVehicules]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.ville || form.ville.length < 2)
      newErrors.ville = "La ville est requise";
    if (!form.depart || form.depart.length < 3)
      newErrors.depart = "Le point de départ est requis (3 caractères minimum)";
    if (!form.destination || form.destination.length < 3)
      newErrors.destination =
        "La destination est requise (3 caractères minimum)";
    if (form.depart === form.destination)
      newErrors.destination =
        "La destination doit être différente du point de départ";
    if (!form.date_depart)
      newErrors.date_depart = "La date_depart du trajet est requise";
    if (!form.heure_depart)
      newErrors.heure_depart = "L'heure_depart du trajet est requise";
    if (
      !form.places ||
      isNaN(form.places) ||
      form.places < 1 ||
      form.places > 10
    )
      newErrors.places = "Nombre de places entre 1 et 10";
    if (!form.prix || isNaN(form.prix) || form.prix < 0)
      newErrors.prix = "Prix par place requis";
    if (!form.preferences)
      newErrors.preferences = "Veuillez renseigner vos préférences";
    if (!form.vehicule_id) newErrors.vehicule_id = "Sélectionnez un véhicule";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        await createTrajet(form);
        navigate("/trips"); // redirection
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#E3F6FD] flex flex-col items-center font-itim pb-24">
      <div className="w-full max-w-[400px] mx-auto px-2 sm:px-0">
        <div className="flex flex-col items-center mt-[-50px] mb-2 blur-[1px]">
          <img
            src="/illustration_6.png"
            alt="illustration"
            className="w-full h-[325px] object-contain blur-[2px]"
          />{" "}
        </div>
        <h2 className="text-center text-[#000000] text-[32px] font-bold mb-2 mt-[-40px] max-[400px]:text-[32px] max-[340px]:text-[18px]">
          Publier un trajet
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-gradient-to-b from-[#00B4D8] to-[#48CAE4] rounded-2xl  shadow-custom px-4 pt-4 pb-6 flex flex-col gap-3
          max-[400px]:px-5 max-[400px]:pt-8 max-[400px]:pb-5 max-[340px]:px-5 max-[340px]:pt-8 max-[340px]:pb-5"
        >
          {/* Ville */}
          <div className="flex items-center  bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-custom max-[400px]:px-2 max-[400px]:py-1 max-[340px]:px-1 max-[340px]:py-1">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-green-600 mr-2 max-[400px]:mr-2"
            />
            <input
              name="ville"
              value={form.ville}
              onChange={handleChange}
              placeholder="Ville du trajet"
              className={`flex-1 bg-transparent outline-none custom text-[20px] text-black placeholder:text-gray-400 ${
                errors.destination ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.ville && (
            <p className="text-red-500 text-sm mb-1 max-[400px]:text-xs">
              {errors.ville}
            </p>
          )}
          {/* Départ */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-custom max-[400px]:px-2 max-[400px]:py-1 max-[340px]:px-1 max-[340px]:py-1">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-green-600 mr-2 max-[400px]:mr-2"
            />
            <input
              name="depart"
              value={form.depart}
              onChange={handleChange}
              placeholder="Point de depart"
              className={`flex-1 bg-transparent outline-none custom text-[20px] text-black placeholder:text-gray-400 ${
                errors.destination ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.depart && (
            <p className="text-red-500 text-sm mb-1 max-[400px]:text-xs">
              {errors.depart}
            </p>
          )}
          {/* Destination */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-custom max-[400px]:px-2 max-[400px]:py-1 max-[340px]:px-1 max-[340px]:py-1">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-red-600 mr-2 max-[400px]:mr-2"
            />
            <input
              name="destination"
              value={form.destination}
              onChange={handleChange}
              placeholder="Destination"
              className={`flex-1 bg-transparent outline-none custom text-[20px] text-black placeholder:text-gray-400 ${
                errors.destination ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.destination && (
            <p className="text-red-500 text-sm mb-1 max-[400px]:text-xs">
              {errors.destination}
            </p>
          )}
          {/* Date */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-md max-w-xs w-full">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-gray-500 mr-3 text-lg"
            />
            <DatePicker
              selected={form.date_depart ? new Date(form.date_depart) : null}
              onChange={(date) =>
                setForm((prev) => ({
                  ...prev,
                  date_depart: date ? date.toISOString().split("T")[0] : "",
                }))
              }
              placeholderText="Date du trajet"
              className={`flex-1 bg-transparent outline-none text-gray-700 text-lg placeholder-gray-400
          ${errors.date_depart ? "border-red-500" : ""}
        `}
              dateFormat="yyyy-MM-dd"
              calendarClassName="custom-datepicker-calendar"
              popperPlacement="bottom-start"
            />
          </div>

          {/* Heure */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-custom max-[400px]:px-2 max-[400px]:py-1 max-[340px]:px-1 max-[340px]:py-1">
            <FontAwesomeIcon
              icon={faClock}
              className="text-gray-700 mr-2 max-[400px]:mr-2"
            />
            <input
              name="heure_depart"
              value={form.heure_depart}
              onChange={handleChange}
              placeholder="Heure du trajet"
              type="time"
              className={`flex-1 bg-transparent outline-none custom text-[20px] text-black placeholder:text-gray-400 ${
                errors.destination ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.heure_depart && (
            <p className="text-red-500 text-sm mb-1 max-[400px]:text-xs">
              {errors.heure_depart}
            </p>
          )}
          {/* Nombre de places */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-custom max-[400px]:px-2 max-[400px]:py-1 max-[340px]:px-1 max-[340px]:py-1">
            <FontAwesomeIcon
              icon={faUserFriends}
              className="text-gray-700 mr-2 max-[400px]:mr-2"
            />
            <input
              name="places"
              value={form.places}
              onChange={handleChange}
              placeholder="Nombre de place"
              type="number"
              min="1"
              max="10"
              className={`flex-1 bg-transparent outline-none custom text-[20px] text-black placeholder:text-gray-400 ${
                errors.destination ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.places && (
            <p className="text-red-500 text-sm mb-1 max-[400px]:text-xs">
              {errors.places}
            </p>
          )}
          {/* Prix par place */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-custom max-[400px]:px-2 max-[400px]:py-1 max-[340px]:px-1 max-[340px]:py-1">
            <FontAwesomeIcon
              icon={faMoneyBill}
              className="text-gray-700 mr-2 max-[400px]:mr-2"
            />
            <input
              name="prix"
              value={form.prix}
              onChange={handleChange}
              placeholder="Prix par place"
              type="number"
              min="0"
              className={`flex-1 bg-transparent outline-none custom text-[20px] text-black placeholder:text-gray-400 ${
                errors.destination ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.prix && (
            <p className="text-red-500 text-sm mb-1 max-[400px]:text-xs">
              {errors.prix}
            </p>
          )}
          {/* Préférences */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-custom max-[400px]:px-2 max-[400px]:py-1 max-[340px]:px-1 max-[340px]:py-1">
            <FontAwesomeIcon
              icon={faList}
              className="text-gray-700 mr-2 max-[400px]:mr-2"
            />
            <input
              name="preferences"
              value={form.preferences}
              onChange={handleChange}
              placeholder="Renseignez vos preferences"
              className={`flex-1 bg-transparent outline-none custom text-[20px] text-black placeholder:text-gray-400 ${
                errors.destination ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.preferences && (
            <p className="text-red-500 text-sm mb-1 max-[400px]:text-xs">
              {errors.preferences}
            </p>
          )}
          {/* Véhicule */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-custom max-[400px]:px-2 max-[400px]:py-1 max-[340px]:px-1 max-[340px]:py-1">
            <FontAwesomeIcon
              icon={faCarSide}
              className="text-gray-700 mr-2 max-[400px]:mr-2"
            />
            <select
              name="vehicule_id"
              value={form.vehicule_id}
              onChange={handleChange}
              disabled={isFetching}
              className={`flex-1 bg-transparent outline-none shadow-custom custom text-[20px] text-black placeholder:text-gray-400 ${
                errors.vehicule ? "border-red-500" : ""
              } ${isFetching ? "opacity-50" : ""}`}
            >
              <option value="">
                {isFetching ? "Chargement..." : "Sélectionner le véhicule"}
              </option>
              {vehicules.map((vehicule) => (
                <option key={vehicule._id} value={vehicule._id}>
                  {vehicule.marque} {vehicule.modele} -{" "}
                  {vehicule.immatriculation}
                </option>
              ))}
              {!isFetching && vehicules.length === 0 && (
                <option value="" disabled>
                  Aucun véhicule disponible
                </option>
              )}
            </select>
          </div>
          {errors.vehicule_id && (
            <p className="text-red-500 text-sm mb-1 max-[400px]:text-xs">
              {errors.vehicule_id}
            </p>
          )}
          {!isFetching && vehicules.length === 0 && (
            <p className="text-yellow-600 text-sm text-center bg-yellow-100 rounded-lg p-2">
              Vous devez d'abord ajouter un véhicule pour publier un trajet.
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading || isFetching || vehicules.length === 0}
            className={`w-full bg-[#3B82F6]  text-white text-[24px] mt-9 rounded-2xl py-2 mb-2 shadow-custom  hover:bg-[#3B82F6]/80 transition ${
              isLoading || isFetching || vehicules.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading
              ? "Publication en cours..."
              : isFetching
              ? "Chargement des véhicules..."
              : vehicules.length === 0
              ? "Aucun véhicule disponible"
              : "Publier le trajet"}
          </button>
        </form>
      </div>
      <Nav />
    </div>
  );
}
