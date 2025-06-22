import React, { useRef, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const OTPModal = ({
  isOpen,
  onClose,
  onVerify,
  onResendOTP,
  isVerifying,
  isResendingOTP,
}) => {
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setOtpError("Veuillez saisir le code OTP");
      return;
    }
    if (otpCode.length !== 6) {
      setOtpError("Le code OTP doit contenir 6 chiffres");
      return;
    }

    setOtpError("");
    const result = await onVerify(otpCode);
    if (!result.success) {
      setOtpError("Code OTP invalide");
    }
  };

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtpCode(value);
    if (otpError) setOtpError("");
  };

  const handleResend = async () => {
    await onResendOTP();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-custom p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[24px] font-bold text-[#1F2937]">
            Vérification du compte
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={isVerifying}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <p className="text-[16px] text-gray-600 mb-6 text-center">
          Un code de vérification à 6 chiffres a été envoyé à votre email.
          Veuillez le saisir ci-dessous.
        </p>

        <form onSubmit={handleOTPSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={otpCode}
              onChange={handleOTPChange}
              placeholder="123456"
              className={`w-full border ${
                otpError ? "border-red-500" : "border-black"
              } rounded-2xl shadow-custom px-4 py-3 text-[20px] text-center tracking-widest outline-none text-black placeholder:text-gray-400 bg-white`}
              disabled={isVerifying}
              maxLength={6}
              pattern="[0-9]{6}"
              autoComplete="one-time-code"
            />
            {otpError && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {otpError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying || !otpCode}
            className={`w-full bg-[#3B82F6] text-white text-[20px] font-bold rounded-2xl py-3 shadow-custom border border-black/20 hover:bg-[#3B82F6]/80 transition ${
              isVerifying || !otpCode ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isVerifying ? (
              <>
                Vérification...{" "}
                <span className="spinner ml-2"></span>
              </>
            ) : (
              "Vérifier"
            )}
          </button>

          <div className="text-center">
            <p className="text-[16px] text-gray-600 mb-2">
              Vous n'avez pas reçu le code ?
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResendingOTP || isVerifying}
              className={`text-[16px] text-[#3B82F6] hover:underline bg-transparent border-none cursor-pointer ${
                isResendingOTP || isVerifying
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isResendingOTP ? "Envoi en cours..." : "Renvoyer le code"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Register() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(false);
  const [photoErrorMessage, setPhotoErrorMessage] = useState("");

  const [showOTPModal, setShowOTPModal] = useState(false);

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

  const [errors, setErrors] = useState({});

  const {
    signup,
    verifyAccount,
    resendOTP,
    isSigningUp,
    isVerifying,
    isResendingOTP,
  } = useAuthStore();

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = "Le nom doit contenir au moins 2 caractères";
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    } else if (formData.prenom.trim().length < 2) {
      newErrors.prenom = "Le prénom doit contenir au moins 2 caractères";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis";
    }
    if (
      formData.telephone &&
      !/^\+229\d{10}$/.test(formData.telephone.replace(/\s/g, ""))
    ) {
      newErrors.telephone = "Format invalide. Exemple: +2290112345678";
    }

    if (!formData.adresse.trim()) {
      newErrors.adresse = "L'adresse est requise";
    }

    if (!formData.role) {
      newErrors.role = "Le rôle est requis";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || photoError) {
      return;
    }

    try {
      const submitData = Object.fromEntries(
        // eslint-disable-next-line no-unused-vars
        Object.entries(formData).filter(([_, value]) => value.trim() !== "")
      );

      if (photo) {
        submitData.photo = photo;
      }

      if (submitData.telephone && submitData.telephone.startsWith("+229")) {
        submitData.telephone = submitData.telephone.slice(4);
      }

      const result = await signup(submitData);

      if (result.success) {
        setShowOTPModal(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleOTPVerification = async (otpCode) => {
    const result = await verifyAccount(otpCode);

    if (result.success) {
      setShowOTPModal(false);
      navigate("/home");
    }

    return result;
  };

  const handleOTPResend = async () => {
    return await resendOTP();
  };

  const handleModalClose = () => {
    if (!isVerifying) {
      setShowOTPModal(false);
      // Optionnel: reset form ou rediriger vers login
    }
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      let processedValue = value;

      if (name === "telephone") {
        processedValue = value.replace(/[^\d+]/g, "");

        if (processedValue && !processedValue.startsWith("+229")) {
          if (processedValue.startsWith("+")) {
            processedValue = "+229" + processedValue.substring(1);
          } else if (processedValue.length > 0) {
            processedValue = "+229" + processedValue;
          }
        }

        if (processedValue.length > 14) {
          processedValue = processedValue.substring(0, 14);
        }
      }

      setFormData((prev) => ({
        ...prev,
        [name]: processedValue,
      }));

      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  const handleCameraClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedExtensions = ["png", "jpg", "jpeg"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setPhotoError(true);
      setPhotoErrorMessage(
        "Format non supporté. Choisissez un fichier .png, .jpg ou .jpeg"
      );
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setPhotoError(true);
      setPhotoErrorMessage("Fichier trop volumineux (max 2 Mo)");
      return;
    }

    setPhotoError(false);
    setPhotoErrorMessage("");

    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.onerror = () => {
      setPhotoError(true);
      setPhotoErrorMessage("Erreur lors de la lecture du fichier");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleLoginNavigation = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <>
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center font-itim">
        <div className="w-full max-w-[1000px] shadow-custom rounded-b-4xl overflow-hidden">
          <div className="relative w-full h-[280px] bg-[#00B4D8]">
            <div className="absolute inset-0 bg-[#D9D9D9] opacity-0 z-10" />
            <img
              src="/illustration_7.png"
              alt="Créer un compte"
              className="absolute inset-0 w-full h-full object-contain z-0"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-start justify-center z-20">
              <span
                className="text-[36px] font-extrabold text-white"
                style={{
                  fontFamily: "Itim, cursive",
                  textShadow: "2px 2px 6px #0008",
                  letterSpacing: 1,
                  marginTop: "14rem",
                }}
              >
                Créer votre Compte
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[400px] flex flex-col items-center px-4 pt-4"
          noValidate
        >
          <h2 className="text-[28px] text-center mb-4 mt-2 text-[#1F2937]">
            Renseignez vos informations
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
                } rounded-2xl px-4 py-2 text-[20px] outline-none text-black placeholder:text-gray-400 bg-white`}
                disabled={isSigningUp}
                required
              />
              {errors.nom && (
                <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
              )}
            </div>

            <div
              className={`w-[50px] bg-[#90E0EF] shadow-custom rounded-xl flex items-center justify-center border ${
                photoError ? "border-red-500" : "border-[#D9D9D9]"
              } cursor-pointer relative`}
              onClick={handleCameraClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleCameraClick()}
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
                accept="image/png,image/jpeg,image/jpg"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={isSigningUp}
              />
            </div>
          </div>

          {photoErrorMessage && (
            <p className="text-red-500 text-sm mb-2 w-full">
              {photoErrorMessage}
            </p>
          )}

          {[
            {
              name: "prenom",
              type: "text",
              placeholder: "Prénom",
              required: true,
            },
            {
              name: "email",
              type: "email",
              placeholder: "Email",
              required: true,
            },
            {
              name: "telephone",
              type: "tel",
              placeholder: "Téléphone",
              required: true,
            },
            {
              name: "adresse",
              type: "text",
              placeholder: "Adresse",
              required: true,
            },
            {
              name: "password",
              type: "password",
              placeholder: "Mot de passe",
              required: true,
            },
            {
              name: "bio",
              type: "text",
              placeholder: "Bio (optionnel)",
              required: false,
            },
          ].map((field) => (
            <div key={field.name} className="w-full mt-2">
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`w-full border ${
                  errors[field.name] ? "border-red-500" : "border-black"
                } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`}
                disabled={isSigningUp}
                required={field.required}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mb-2">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="w-full mt-2">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full border ${
                errors.role ? "border-red-500" : "border-black"
              } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-4 bg-white text-black`}
              disabled={isSigningUp}
              required
            >
              <option value="">Sélectionnez votre rôle</option>
              <option value="conducteur">Conducteur</option>
              <option value="passager">Passager</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mb-2">{errors.role}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className={`w-full shadow-custom bg-[#3B82F6] text-white text-[24px] font-bold rounded-md py-2 mb-2 border border-black/20 hover:bg-[#3B82F6]/80 transition ${
              isSigningUp ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="flex items-center justify-center">
              {isSigningUp ? (
                <>
                  Inscription en cours...{" "}<span className="spinner ml-2"></span>
                </>
              ) : (
                "S'inscrire"
              )}
            </span>
          </button>

          <div className="w-full text-center mt-2 mb-6">
            <span className="text-[20px] text-black">Déjà un compte? </span>
            <button
              type="button"
              className="text-[20px] text-[#3B82F6] cursor-pointer hover:underline bg-transparent border-none p-0"
              onClick={handleLoginNavigation}
              disabled={isSigningUp}
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>

      <OTPModal
        isOpen={showOTPModal}
        onClose={handleModalClose}
        onVerify={handleOTPVerification}
        onResendOTP={handleOTPResend}
        isVerifying={isVerifying}
        isResendingOTP={isResendingOTP}
      />

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
    </>
  );
}
