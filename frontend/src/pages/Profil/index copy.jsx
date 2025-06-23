import React, { useRef, useState } from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import SectionInitiale from "../../components/SectionInitiale";
import FormVehicule from "../../components/FormVehicule";
import FormPiece from "../../components/FormPiece";
import RecapProfil from "../../components/RecapProfil";
import { useAuthStore } from "../../store/useAuthStore";
import { useProfilStore } from "../../store/useProfilStore";
import TrajetsAVEnirConducteur from "../../components/TrajetsAVenirConducteur";

export default function Profil() {
  const permisInputRef = useRef(null);
  const photoPermisInputRef = useRef(null);
  const [permis, setPermis] = useState(null);
  const [photoPermis, setPhotoPermis] = useState(null);
  const [showVehiculeForm, setShowVehiculeForm] = useState(false);
  const [vehicule, setVehicule] = useState({
    marque: "",
    modele: "",
    couleur: "",
    immat: "",
  });
  const [showPieceForm, setShowPieceForm] = useState(false);
  const [pieceType, setPieceType] = useState("CIP");
  const [pieceFile, setPieceFile] = useState(null);
  const pieceInputRef = useRef(null);
  const [showProfileRecap, setShowProfileRecap] = useState(false);
  const [bio, setBio] = useState(() => localStorage.getItem("bio") || "");
  const [step, setStep] = useState("piece"); // 'initial', 'vehicule', 'piece', 'recap'
  const [errors, setErrors] = useState({});
  const [showTrajets, setShowTrajets] = useState(() => {
    return localStorage.getItem("showTrajets") === "true";
  });

  const { authUser } = useAuthStore();
  const { justificatifs, fetchJustificatifs, isFetchingJustificatifs } =
    useProfilStore();

  const handlePermisClick = () =>
    permisInputRef.current && permisInputRef.current.click();
  const handlePhotoPermisClick = () =>
    photoPermisInputRef.current && photoPermisInputRef.current.click();

  const handlePermisChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "application/pdf"].includes(file.type)) {
      alert("Format non supporté. PNG, JPG ou PDF uniquement.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Fichier trop volumineux (max 2 Mo).");
      return;
    }
    setPermis(file.name);
  };

  const handlePhotoPermisChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("Format non supporté. PNG ou JPG uniquement.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Fichier trop volumineux (max 2 Mo).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPermis(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Fonction pour reset le profil à l'état initial
  const resetProfil = () => {
    setShowTrajets(true);
    localStorage.setItem("showTrajets", "true");
    setStep("initial");
    setVehicule({ marque: "", modele: "", couleur: "", immat: "" });
    setPieceType("CIP");
    setPieceFile(null);
    setPermis(null);
    setPhotoPermis(null);
    setErrors({});
  };

  const handleBackToInitial = () => {
    setShowTrajets(false);
    localStorage.setItem("showTrajets", "false");
    setStep("initial");
  };

  return (
    <div className="min-h-screen bg-white pb-24 font-itim w-full overflow-y-auto">
      <Header
        nom={
          authUser?.nom && authUser?.prenom
            ? `${authUser.nom} ${authUser.prenom}`
            : "Utilisateur"
        }
        age={18}
        avatar={authUser?.photo || null}
        tel={authUser?.telephone || "N/A"}
        role={authUser?.role || "Utilisateur"}
      />
      {!showTrajets && (
        <>
          {step === "initial" && (
            <SectionInitiale
              permis={permis}
              handlePermisClick={handlePermisClick}
              permisInputRef={permisInputRef}
              handlePermisChange={handlePermisChange}
              photoPermis={photoPermis}
              handlePhotoPermisClick={handlePhotoPermisClick}
              photoPermisInputRef={photoPermisInputRef}
              handlePhotoPermisChange={handlePhotoPermisChange}
              onSoumettre={() => setStep("vehicule")}
              errors={errors}
              setErrors={setErrors}
            />
          )}
          {step === "vehicule" && (
            <FormVehicule
              vehicule={vehicule}
              setVehicule={setVehicule}
              onEnregistrer={() => setStep("piece")}
              errors={errors}
              setErrors={setErrors}
            />
          )}
          {step === "piece" && (
            <FormPiece
              pieceType={pieceType}
              setPieceType={setPieceType}
              pieceFile={pieceFile}
              pieceInputRef={pieceInputRef}
              setPieceFile={setPieceFile}
              onSoumettre={() => setStep("recap")}
              errors={errors}
              setErrors={setErrors}
            />
          )}
          {step === "recap" && (
            <RecapProfil
              bio={bio}
              onUpdate={resetProfil}
              errors={errors}
              setErrors={setErrors}
              onBioChange={setBio}
            />
          )}
        </>
      )}
      {showTrajets && <TrajetsAVEnirConducteur onBack={handleBackToInitial} />}
      <Nav activeMenu="profil" />
    </div>
  );
}
