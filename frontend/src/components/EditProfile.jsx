import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFileAlt,
  faCamera,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../store/useAuthStore";
import { useProfilStore } from "../store/useProfilStore";

export default function EditProfile({ user, onSuccess, onCancel }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdating, setIsUpdating] = useState(false);
  const photoInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    nom: user?.nom || "",
    prenom: user?.prenom || "",
    telephone: user?.telephone || "",
    adresse: user?.adresse || "",
    bio: user?.bio || "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photo || null);

  const [documentFile, setDocumentFile] = useState(null);
  const [documentType, setDocumentType] = useState(
    user?.role === "conducteur" ? "PERMIS DE CONDUIRE" : "CIP"
  );
  const documentInputRef = useRef(null);

  const [errors, setErrors] = useState({});

  const { updateProfile } = useAuthStore();
  const { submitJustificatifs, errors: docErrors } = useProfilStore();

  const handlePhotoClick = () => {
    photoInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        photo: "Format non supporté. PNG ou JPG uniquement.",
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        photo: "Fichier trop volumineux (max 2 Mo).",
      }));
      return;
    }

    setPhotoFile(file);
    setErrors((prev) => ({ ...prev, photo: null }));

    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDocumentClick = () => {
    documentInputRef.current?.click();
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        document: "Format non supporté. PNG, JPG ou PDF uniquement.",
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        document: "Fichier trop volumineux (max 2 Mo).",
      }));
      return;
    }

    setDocumentFile(file);
    setErrors((prev) => ({ ...prev, document: null }));
  };

  const validateProfileData = () => {
    const newErrors = {};

    if (!profileData.nom?.trim()) {
      newErrors.nom = "Le nom est requis";
    }

    if (!profileData.prenom?.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }

    if (!profileData.telephone?.trim()) {
      newErrors.telephone = "Le téléphone est requis";
    } else if (!/^\d{10,}$/.test(profileData.telephone.replace(/\s/g, ""))) {
      newErrors.telephone = "Format de téléphone invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!validateProfileData()) {
      return;
    }

    setIsUpdating(true);

    try {
      const result = await updateProfile(profileData, photoFile);

      if (result.success) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDocumentSubmit = async (e) => {
    e.preventDefault();

    if (!documentFile) {
      setErrors((prev) => ({
        ...prev,
        document: `Le fichier du ${
          user?.role === "conducteur"
            ? "permis de conduire"
            : "document d'identité"
        } est requis.`,
      }));
      return;
    }

    if (!documentType) {
      setErrors((prev) => ({
        ...prev,
        documentType: "Le type de document est requis.",
      }));
      return;
    }

    if (user?.role === "conducteur" && documentType !== "PERMIS DE CONDUIRE") {
      setErrors((prev) => ({
        ...prev,
        documentType:
          "Les conducteurs doivent obligatoirement soumettre leur permis de conduire.",
      }));
      return;
    }

    setIsUpdating(true);

    try {
      const formData = new FormData();
      const justificatifsMeta = [{ type: documentType }];

      formData.append("justificatifs", JSON.stringify(justificatifsMeta));
      formData.append("files", documentFile);

      const result = await submitJustificatifs(formData);

      if (result.success) {
        setDocumentFile(null);
        setErrors({});
        onSuccess();
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du document:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getDocumentTypeOptions = () => {
    if (user?.role === "conducteur") {
      return [{ value: "PERMIS DE CONDUIRE", label: "Permis de conduire" }];
    }

    return [
      { value: "CIP", label: "Carte d'Identité Plastifiée (CIP)" },
      { value: "CNI", label: "Carte Nationale d'Identité (CNI)" },
      { value: "PASSEPORT", label: "Passeport" },
    ];
  };

  return (
    <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-black">Modifier le profil</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>

      <div className="flex mb-6 border-b">
        <button
          className={`flex-1 py-2 px-4 text-center font-medium ${
            activeTab === "profile"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Informations
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center font-medium ${
            activeTab === "documents"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("documents")}
        >
          <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
          Documents
        </button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === "profile" && (
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          {/* Photo de profil */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-300 transition"
                onClick={handlePhotoClick}
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-400 text-2xl"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={handlePhotoClick}
                className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition"
              >
                <FontAwesomeIcon icon={faCamera} className="text-xs" />
              </button>
            </div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
            )}
          </div>

          {/* Champs du formulaire */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              value={profileData.nom}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, nom: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Votre nom"
            />
            {errors.nom && (
              <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom *
            </label>
            <input
              type="text"
              value={profileData.prenom}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, prenom: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Votre prénom"
            />
            {errors.prenom && (
              <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone *
            </label>
            <input
              type="tel"
              value={profileData.telephone}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  telephone: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Votre numéro de téléphone"
            />
            {errors.telephone && (
              <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse
            </label>
            <input
              type="text"
              value={profileData.adresse}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, adresse: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Votre adresse"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, bio: e.target.value }))
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Parlez-nous de vous..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin mr-2"
                  />
                  Mise à jour...
                </>
              ) : (
                "Mettre à jour"
              )}
            </button>
          </div>
        </form>
      )}

      {activeTab === "documents" && (
        <form onSubmit={handleDocumentSubmit} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-800 text-sm">
              {user?.role === "conducteur"
                ? "En tant que conducteur, vous devez fournir votre permis de conduire."
                : "Vous pouvez ajouter ou remplacer vos documents d'identité."}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de document *
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              disabled={user?.role === "conducteur"}
            >
              {getDocumentTypeOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.documentType && (
              <p className="text-red-500 text-sm mt-1">{errors.documentType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fichier du document *
            </label>
            <div
              onClick={handleDocumentClick}
              className="w-full px-3 py-8 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                className="text-3xl text-gray-400 mb-2"
              />
              <p className="text-gray-600">
                {documentFile
                  ? documentFile.name
                  : "Cliquez pour sélectionner un fichier"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                PNG, JPG ou PDF (max 2MB)
              </p>
            </div>
            <input
              ref={documentInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleDocumentChange}
              className="hidden"
            />
            {errors.document && (
              <p className="text-red-500 text-sm mt-1">{errors.document}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin mr-2"
                  />
                  Envoi...
                </>
              ) : (
                "Ajouter le document"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
