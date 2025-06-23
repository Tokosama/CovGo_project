import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import EditProfile from "../../components/EditProfile";
import FormPiece from "../../components/FormPiece";
import VerificationMessage from "../../components/VerificationMessage";
import { useAuthStore } from "../../store/useAuthStore";
import { useProfilStore } from "../../store/useProfilStore";
import TrajetsAVEnirConducteur from "../../components/TrajetsAVenirConducteur";
import TrajetsAVEnirPassager from "../../components/TrajetsAVenirPassager";

export default function Profil() {
  const [currentView, setCurrentView] = useState("loading");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [hasCheckedDocuments, setHasCheckedDocuments] = useState(false);

  const { authUser } = useAuthStore();
  const {
    justificatifs,
    fetchJustificatifs,
    isFetchingJustificatifs,
    hasRequiredDocuments,
    documentFile,
    documentType,
    setDocumentFile,
    setDocumentType,
  } = useProfilStore();

  useEffect(() => {
    const determineUserState = async () => {
      setHasCheckedDocuments(true);

      if (authUser.verifie === true) {
        setCurrentView("verified");
        return;
      }

      try {
        const result = await fetchJustificatifs(authUser._id);

        if (result.success) {
          const hasAllDocs = hasRequiredDocuments(
            authUser.role,
            result.data.data
          );

          console.log("Documents récupérés:", result.data.data);

          if (hasAllDocs) {
            setCurrentView("pending_verification");
          } else {
            setCurrentView("needs_documents");
            const defaultType =
              authUser.role === "conducteur" ? "PERMIS DE CONDUIRE" : "CIP";
            setDocumentType(defaultType);
          }
        } else {
          setCurrentView("needs_documents");
          const defaultType =
            authUser.role === "conducteur" ? "PERMIS DE CONDUIRE" : "CIP";
          setDocumentType(defaultType);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des justificatifs:",
          error
        );
        setCurrentView("needs_documents");
        const defaultType =
          authUser.role === "conducteur" ? "PERMIS DE CONDUIRE" : "CIP";
        setDocumentType(defaultType);
      }
    };

    determineUserState();
  }, [
    authUser,
    fetchJustificatifs,
    hasCheckedDocuments,
    hasRequiredDocuments,
    setDocumentType,
  ]);

  const recheckDocuments = () => {
    setHasCheckedDocuments(false);
  };

  const handleDocumentSubmissionSuccess = () => {
    setCurrentView("pending_verification");
    recheckDocuments();
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleProfileUpdateSuccess = () => {
    setShowEditProfile(false);
    recheckDocuments();
  };

  const handleBackToProfile = () => {
    setShowEditProfile(false);
  };

  if (!authUser) {
    return (
      <div className="min-h-screen bg-white pb-24 font-itim w-full overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

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
      {currentView === "verified" &&
        !showEditProfile &&
        (authUser.role === "conducteur" ? (
          <TrajetsAVEnirConducteur onBack={handleEditProfile} />
        ) : (
          <TrajetsAVEnirPassager onBack={handleEditProfile} />
        ))}

      {currentView === "verified" && showEditProfile && (
        <div className="p-6">
          <EditProfile
            user={authUser}
            onSuccess={handleProfileUpdateSuccess}
            onCancel={handleBackToProfile}
          />
        </div>
      )}

      {currentView === "pending_verification" && !showEditProfile && (
        <div className="p-6">
          {isFetchingJustificatifs ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
              <span>Vérification des documents...</span>
            </div>
          ) : (
            <VerificationMessage
              userRole={authUser.role}
              onEditProfile={handleEditProfile}
              justificatifs={justificatifs}
              isVerified={authUser.verifie}
            />
          )}
        </div>
      )}

      {currentView === "pending_verification" && showEditProfile && (
        <div className="p-6">
          <EditProfile
            user={authUser}
            onSuccess={handleProfileUpdateSuccess}
            onCancel={handleBackToProfile}
          />
        </div>
      )}

      {currentView === "needs_documents" && !showEditProfile && (
        <div className="p-6">
          {isFetchingJustificatifs ? (
            <div className="flex items-center justify-center py-8 text-black">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
              <span>Vérification des documents...</span>
            </div>
          ) : (
            <>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  Documents requis manquants
                </h3>
                <p className="text-orange-700 mb-4">
                  {authUser.role === "conducteur"
                    ? "Vous devez soumettre votre permis de conduire pour pouvoir utiliser l'application."
                    : "Vous devez soumettre au moins un document d'identité (CIP, CNI ou Passeport) pour pouvoir utiliser l'application."}
                </p>
                <button
                  onClick={handleEditProfile}
                  className="text-blue-600 hover:text-blue-800 underline mb-4 block"
                >
                  Modifier mes informations personnelles
                </button>
              </div>

              <FormPiece
                pieceType={documentType}
                setPieceType={setDocumentType}
                pieceFile={documentFile}
                pieceInputRef={React.createRef()}
                setPieceFile={setDocumentFile}
                onSoumettre={handleDocumentSubmissionSuccess}
                errors={{}}
                setErrors={() => {}}
                isRequired={true}
                userRole={authUser.role}
              />
            </>
          )}
        </div>
      )}

      {currentView === "needs_documents" && showEditProfile && (
        <div className="p-6">
          <EditProfile
            user={authUser}
            onSuccess={handleProfileUpdateSuccess}
            onCancel={handleBackToProfile}
          />
        </div>
      )}

      <Nav activeMenu="profil" />
    </div>
  );
}
