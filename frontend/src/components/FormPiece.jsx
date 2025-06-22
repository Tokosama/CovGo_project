import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faCarSide } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useProfilStore } from "../store/useProfilStore";
import toast from "react-hot-toast";

export default function FormPiece({
  pieceType,
  setPieceType,
  pieceFile,
  pieceInputRef,
  setPieceFile,
  onSoumettre,
  errors = {},
  setErrors = () => {},
  isRequired = false,
  userRole = "passager", 
}) {
  const { submitJustificatifs } = useProfilStore();

  const getDocumentOptions = () => {
    if (userRole === "conducteur") {
      return [{ value: "PERMIS DE CONDUIRE", label: "Permis de conduire" }];
    } else {
      return [
        { value: "CNI", label: "CNI (Carte Nationale d'Identité)" },
        { value: "CIP", label: "CIP (Carte d'Identité de Personne)" },
        { value: "PASSEPORT", label: "Passeport" },
      ];
    }
  };

  React.useEffect(() => {
    const options = getDocumentOptions();
    if (options.length === 1) {
      setPieceType(options[0].value);
    } else if (!pieceType) {
      setPieceType("CIP");
    }
  }, [userRole, setPieceType, pieceType]);

  const validate = () => {
    const newErrors = {};

    if (!pieceType) {
      newErrors.pieceType = "Le type de document est requis";
    }

    if (!pieceFile) {
      const docLabel =
        userRole === "conducteur" ? "permis de conduire" : "pièce d'identité";
      newErrors.pieceFile = `Le fichier du ${docLabel} est requis (PNG, JPG ou PDF, max 2 Mo).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePieceTypeChange = (e) => {
    setPieceType(e.target.value);
    setErrors((prev) => ({ ...prev, pieceType: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "application/pdf"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        pieceFile: "Format non supporté. PNG, JPG ou PDF uniquement.",
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        pieceFile: "Fichier trop volumineux (max 2 Mo).",
      }));
      return;
    }

    setPieceFile(file);
    setErrors((prev) => ({ ...prev, pieceFile: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const formData = new FormData();

      const justificatifsMeta = [
        {
          type: pieceType,
        },
      ];

      formData.append("justificatifs", JSON.stringify(justificatifsMeta));
      formData.append("files", pieceFile);

      const result = await submitJustificatifs(formData);

      if (result.success) {
        toast.success("Document soumis avec succès !");
        onSoumettre();
      } else {
        toast.error(result.error || "Erreur lors de la soumission");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Erreur lors de la soumission du document");
    }
  };

  const documentOptions = getDocumentOptions();
  const getIcon = () => {
    return userRole === "conducteur" ? faCarSide : faIdCard;
  };

  const getTitle = () => {
    if (userRole === "conducteur") {
      return "Ajoutez votre permis de conduire";
    }
    return "Ajoutez votre pièce d'identité";
  };

  const getDescription = () => {
    if (userRole === "conducteur") {
      return "Votre permis de conduire est obligatoire pour conduire sur la plateforme.";
    }
    return "Choisissez et téléchargez l'un de vos documents d'identité.";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center mt-8"
    >
      <div className="w-[90%] text-center items-center justify-center mx-auto text-[21px] font-bold text-[#FF1D1D] mb-12">
        {isRequired
          ? "Documents requis pour utiliser l'application"
          : "Vérifiez vos Informations avant de réserver des trajets"}
        <hr className="w-full border-t border-gray-400 mt-7" />
      </div>

      <div className="w-full max-w-[350px] mx-auto">
        <div className="w-full text-center text-[21px] font-bold text-black mb-2">
          {getTitle()}
        </div>

        <div className="text-center text-[14px] text-gray-600 mb-4">
          {getDescription()}
        </div>

        <form onSubmit={handleSubmit}>
          {userRole !== "conducteur" && (
            <div className="mb-2">
              <label className="block text-[16px] text-gray-600 mb-1 ml-1">
                Type de document
              </label>
              <div className="relative">
                <select
                  className="w-full border border-gray-200 focus:border-blue-400 font-itim rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white"
                  value={pieceType}
                  onChange={handlePieceTypeChange}
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                  }}
                >
                  {documentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg z-0">
                  ▼
                </span>
              </div>
              {errors.pieceType && (
                <p className="text-red-500 text-sm mb-1">{errors.pieceType}</p>
              )}
            </div>
          )}

          {userRole === "conducteur" && (
            <div className="mb-2">
              <label className="block text-[16px] text-gray-600 mb-1 ml-1">
                Document requis
              </label>
              <div className="w-full border border-gray-200 rounded-2xl shadow-custom px-4 py-2 text-[20px] mb-1 text-black bg-gray-50">
                <FontAwesomeIcon
                  icon={faCarSide}
                  className="text-blue-500 mr-2"
                />
                Permis de conduire
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[16px] text-gray-600 mb-1">
              Télécharger le document
            </label>
            <div
              className="flex w-full border border-gray-200 focus:border-blue-400 font-itim rounded-2xl shadow-custom px-4 py-3 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() =>
                pieceInputRef.current && pieceInputRef.current.click()
              }
            >
              <FontAwesomeIcon
                icon={getIcon()}
                className="text-gray-500 text-xl mr-2 flex-shrink-0"
              />
              <span className="flex-1 text-[16px] text-gray-500 truncate">
                {pieceFile
                  ? pieceFile.name
                  : `Choisir votre ${
                      userRole === "conducteur" ? "permis" : "document"
                    }`}
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,application/pdf"
                style={{ display: "none" }}
                ref={pieceInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div className="text-xs text-gray-500 mb-1">
              Formats acceptés: PNG, JPG, PDF (max 2 Mo)
            </div>
            {errors.pieceFile && (
              <p className="text-red-500 text-sm mb-1">{errors.pieceFile}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              className="bg-[#3B82F6] text-white text-[24px] rounded-md py-2 px-8 shadow-custom hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              type="submit"
              disabled={!pieceFile}
            >
              {isRequired ? "Soumettre le document" : "Soumettre"}
            </button>
          </div>
        </form>
      </div>

      <hr className="w-[90%] border-t border-gray-400 mt-4" />
    </motion.div>
  );
}
