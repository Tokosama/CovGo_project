import React from "react";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  FileText,
  Settings,
} from "lucide-react";

const VerificationMessage = ({
  userRole,
  onEditProfile,
  justificatifs = [],
  isVerified = false,
}) => {
  const getGlobalStatus = () => {
    if (isVerified) {
      return {
        status: "verified",
        message: "Compte vérifié",
        icon: <CheckCircle className="w-12 h-12 text-green-500" />,
        colorClass: "bg-green-50 border-green-200",
        textColor: "text-green-800",
      };
    } else {
      return {
        status: "pending",
        message: "Documents en cours de vérification",
        icon: <Clock className="w-12 h-12 text-blue-500" />,
        colorClass: "bg-blue-50 border-blue-200",
        textColor: "text-blue-800",
      };
    }
  };

  const globalStatus = getGlobalStatus();

  const getRequiredDocuments = () => {
    return userRole === "conducteur" ? ["PERMIS DE CONDUIRE"] : ["CIP"];
  };

  const requiredDocuments = getRequiredDocuments();

  const getSubmittedDocuments = () => {
    return requiredDocuments.map((docType) => {
      const submitted = justificatifs.find((doc) => doc.type === docType);
      return {
        type: docType,
        submitted: !!submitted,
        submittedAt: submitted?.createdAt,
      };
    });
  };

  const submittedDocuments = getSubmittedDocuments();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Message principal */}
      <div className={`${globalStatus.colorClass} border rounded-lg p-6 mb-6`}>
        <div className="flex items-center justify-center mb-4">
          {globalStatus.icon}
        </div>

        <div className="text-center mb-4">
          <h2
            className={`text-xl font-semibold ${globalStatus.textColor} mb-2`}
          >
            {isVerified ? "Compte vérifié" : "Compte en cours de vérification"}
          </h2>
          <p className={`${globalStatus.textColor} mb-4`}>
            {globalStatus.message}
          </p>
          <div
            className={`text-sm ${globalStatus.textColor.replace(
              "800",
              "600"
            )}`}
          >
            {isVerified
              ? "Votre compte a été vérifié avec succès. Vous avez accès à toutes les fonctionnalités."
              : userRole === "conducteur"
              ? "Vos documents de conduite sont en cours de vérification par notre équipe."
              : "Votre pièce d'identité est en cours de vérification par notre équipe."}
          </div>
        </div>

        {/* Détails des documents */}
        <div className="mt-4">
          <h4
            className={`font-medium ${globalStatus.textColor} mb-3 flex items-center`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Statut de vos documents
          </h4>
          <div className="space-y-2">
            {submittedDocuments.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-md border text-black"
              >
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      isVerified
                        ? "bg-green-500"
                        : doc.submitted
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="font-medium">
                    {doc.type === "PERMIS DE CONDUIRE"
                      ? "Permis de conduire"
                      : doc.type === "CIP"
                      ? "CIP"
                      : doc.type}
                  </span>
                </div>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    isVerified
                      ? "bg-green-100 text-green-800"
                      : doc.submitted
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {isVerified
                    ? "Validé"
                    : doc.submitted
                    ? "En cours de vérification"
                    : "Non soumis"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={onEditProfile}
          className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <User className="w-5 h-5 mr-3 text-gray-600" />
          <div className="text-left">
            <div className="font-medium text-gray-900">Modifier mon profil</div>
            <div className="text-sm text-gray-500">
              Nom, prénom, téléphone...
            </div>
          </div>
        </button>

        <div
          className={`flex items-center justify-center p-4 border border-gray-200 rounded-lg ${
            isVerified ? "bg-green-50" : "bg-gray-50"
          }`}
        >
          <Settings
            className={`w-5 h-5 mr-3 ${
              isVerified ? "text-green-600" : "text-gray-400"
            }`}
          />
          <div className="text-left">
            <div
              className={`font-medium ${
                isVerified ? "text-green-700" : "text-gray-500"
              }`}
            >
              {isVerified ? "Compte activé" : "Fonctionnalités limitées"}
            </div>
            <div
              className={`text-sm ${
                isVerified ? "text-green-600" : "text-gray-400"
              }`}
            >
              {isVerified ? "Accès complet" : "En attente de validation"}
            </div>
          </div>
        </div>
      </div>

      {/* Informations supplémentaires */}
      {!isVerified && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">
            Temps de traitement
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            La vérification de votre compte prend généralement entre 24 et 48
            heures ouvrables.
          </p>

          <h4 className="font-medium text-gray-900 mb-2">
            Que se passe-t-il ensuite ?
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Notre équipe vérifie vos documents</li>
            <li>
              • Vous recevrez une notification une fois la vérification terminée
            </li>
            <li>• En cas de problème, nous vous contacterons directement</li>
            <li>
              • Une fois validé, vous aurez accès à toutes les fonctionnalités
            </li>
          </ul>
        </div>
      )}

      {/* Message de remerciement pour les comptes vérifiés */}
      {isVerified && (
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">Félicitations !</h4>
          <p className="text-sm text-green-700 mb-3">
            Votre compte a été vérifié avec succès. Vous pouvez maintenant
            profiter de toutes les fonctionnalités de l'application.
          </p>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Accès complet à l'application</li>
            <li>• Possibilité de réserver des trajets</li>
            {userRole === "conducteur" && (
              <li>• Possibilité de publier des trajets</li>
            )}
            <li>• Messagerie et notifications activées</li>
          </ul>
        </div>
      )}

      {/* Message de contact */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Des questions ? Contactez-nous à{" "}
          <a
            href="mailto:support@votre-app.com"
            className="text-blue-600 hover:text-blue-800"
          >
            support@votre-app.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerificationMessage;
