import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";

export default function Register() {

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(false);
  const [photoErrorMessage, setPhotoErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    password: "",
    bio: "",
    role: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom) {
      newErrors.nom = "Le nom est requis";
    }
    if (!formData.prenom) {
      newErrors.prenom = "Le prénom est requis";
    }
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    // if (!formData.telephone) {
    //   newErrors.telephone = "Le numéro de téléphone est requis";
    // } else if (
    //   !/^\+229[0-9]{10}$/.test(formData.telephone.replace(/\s/g, ""))
    // ) {
    //   newErrors.telephone = "Format invalide. Exemple: +2290157222709";
    // }
    if (!formData.adresse) {
      newErrors.adresse = "L'adresse est requise";
    }
    // if (!formData.bio) {
    //   newErrors.bio = "La bio est requise";
    // }
    if (!formData.role) {
      newErrors.role = "Le rôle est requis";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    }
    // if (!photo) {
    //   setPhotoError(true);
    //   setPhotoErrorMessage("Photo requise");
    // } else {
    //   setPhotoError(false);
    //   setPhotoErrorMessage("");
    // }

    console.log(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setAlertMessage("");
    if (Object.keys(newErrors).length === 0 && !photoError) {
      try {
        setIsLoading(true);
        await signup(formData);
        // Redirection directe après inscription réussie
        navigate("/home");
      } catch (error) {
        setIsLoading(false);
        setAlertMessage("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Traitement spécial pour le numéro de téléphone
    if (name === "telephone") {
      // Supprime tous les caractères non numériques sauf le +
      processedValue = value.replace(/[^\d+]/g, "");

      // S'assure que le numéro commence par +229
      // if (!processedValue.startsWith("+229")) {
      //   if (processedValue.startsWith("+")) {
      //     processedValue = "+229" + processedValue.substring(1);
      //   } else {
      //     processedValue = "+229" + processedValue;
      //   }
      // }

      // Limite la longueur totale à 14 caractères (+229 + 10 chiffres)
      if (processedValue.length > 14) {
        processedValue = processedValue.substring(0, 14);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérification de l'extension
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!["png", "jpg"].includes(fileExtension)) {
      setPhotoError(true);
      setPhotoErrorMessage(
        "Format non supporté. Choisissez un fichier .png ou .jpg"
      );
      return;
    }

    // Vérification de la taille (2Mo = 2 * 1024 * 1024 octets)
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError(true);
      setPhotoErrorMessage("Fichier trop volumineux (max 2 Mo)");
      return;
    }

    setPhotoError(false);
    setPhotoErrorMessage("");
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center font-itim">
      {/* Illustration et titre */}
      <div className="w-full max-w-[1000px] shadow-custom rounded-b-4xl overflow-hidden">
        <div className="relative w-full h-[280px] bg-[#00B4D8]">
          {/* Overlay gris léger */}
          <div className="absolute inset-0 bg-[#D9D9D9] opacity-0 z-10" />
          {/* Illustration */}
          <img
            src="/illustration_7.png"
            alt="Créer un compte"
            className="absolute inset-0 w-full h-full object-contain z-0"
          />
          {/* Texte centré */}
          <div className="absolute inset-0 flex items-start justify-center z-20">
            <span
              className="text-[36px] font-extrabold text-white "
              style={{
                fontFamily: "Itim, cursive",
                textShadow: "2px 2px 6px #0008",
                letterSpacing: 1,
                marginTop: "14rem",
              }}
            >
              Creer votre Compte
            </span>
          </div>
        </div>
      </div>
      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] flex flex-col items-center px-4 pt-4"
      >
        <h2 className="text-[28px]   text-center mb-4 mt-2 text-[#1F2937]">
          Renseigner vos informations
        </h2>
        <div className="flex w-full gap-2 mb-2">
          <div className="flex-1">
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom"
              className={`w-full border shadow-custom ${
                errors.nom ? "border-red-500" : "border-black"
              } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none text-black placeholder:text-gray-400 bg-white`}
            />
            {errors.nom && (
              <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
            )}
          </div>
          <div
            className={` w-[50px] bg-[#90E0EF] shadow-custom rounded-xl flex items-center justify-center border ${
              photoError ? "border-red-500" : "border-[#D9D9D9]"
            } cursor-pointer relative`}
            onClick={handleCameraClick}
          >
            {photo ? (
              <img
                src={photo}
                alt="Aperçu"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : photoError ? (
              <FontAwesomeIcon
                icon={faXmark}
                className="text-red-500 text-2xl"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCamera}
                className="text-gray-500 text-2xl"
              />
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
        {photoErrorMessage && (
          <p className="text-red-500 text-sm mb-2 w-full">
            {photoErrorMessage}
          </p>
        )}
        <div className="w-full mt-2">
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prenom"
            className={`w-full border  ${
              errors.prenom ? "border-red-500" : "border-black"
            } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`}
          />
          {errors.prenom && (
            <p className="text-red-500 text-sm mb-2">{errors.prenom}</p>
          )}
        </div>
        <div className="w-full   mt-2">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-black"
            } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}
        </div>
        <div className="w-full  mt-2">
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Telephone"
            className={`w-full border ${
              errors.telephone ? "border-red-500" : "border-black"
            } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`}
          />
          {errors.telephone && (
            <p className="text-red-500 text-sm mb-2">{errors.telephone}</p>
          )}
        </div>
        <div className="w-full  mt-2">
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Adresse"
            className={`w-full border ${
              errors.adresse ? "border-red-500" : "border-black"
            } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`}
          />
          {errors.adresse && (
            <p className="text-red-500 text-sm mb-2">{errors.adresse}</p>
          )}
        </div>
        <div className="w-full  mt-2">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            className={`w-full border ${
              errors.password ? "border-red-500" : "border-black"
            } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}
        </div>
        <div className="w-full  mt-2">
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="bio"
            className={`w-full border ${
              errors.bio ? "border-red-500" : "border-black"
            } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mb-2">{errors.bio}</p>
          )}
        </div>
        <div className="w-full  mt-2">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full border ${
              errors.role ? "border-red-500" : "border-black"
            } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-4 bg-white text-black`}
          >
            <option value="">Role</option>
            <option value="conducteur">Conducteur</option>
            <option value="passager">Passager</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mb-2">{errors.role}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full shadow-custom bg-[#3B82F6] text-white text-[24px] font-bold rounded-md py-2 mb-2  border border-black/20 hover:bg-[#3B82F6]/80 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="flex items-center justify-center">
            {isLoading ? (
              <>
                Inscription en cours
                <span className="spinner ml-2"></span>
              </>
            ) : (
              "S'inscrire"
            )}
          </span>
        </button>
        <div className="w-full text-center mt-2 mb-6">
          <span className="text-[20px]  text-black">
            Deja un Compte?{" "}
          </span>
          <span
            className="text-[20px] text-[#3B82F6]  cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            se connecter
          </span>
        </div>
      </form>
      <style jsx>{`
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
