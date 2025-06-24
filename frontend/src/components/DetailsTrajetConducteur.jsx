import React, { useEffect } from "react";
import {
  faMapMarkerAlt,
  faCalendarAlt,
  faUserFriends,
  faStar,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useTrajetStore } from "../store/useTrajetStore";
import toast from "react-hot-toast";

export default function DetailsTrajetConducteur({ trajet, onBack, isOpen }) {
  const {
    reservationsByTrajet,
    getReservationsByTrajet,
    demarrerTrajet,
    annulerTrajet,
    terminerTrajet,
  } = useTrajetStore();

  useEffect(() => {
    if (trajet?._id && isOpen) {
      getReservationsByTrajet(trajet._id);
    }
  }, [trajet, isOpen, getReservationsByTrajet]);

  const handleAction = async (action) => {
    try {
      if (action === "demarrer") await demarrerTrajet(trajet._id);
      if (action === "annuler") await annulerTrajet(trajet._id);
      if (action === "terminer") await terminerTrajet(trajet._id);
      toast.success(`Trajet ${action} avec succès`);
      onBack(); // Fermer la modal après l'action
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur");
    }
  };

  if (!trajet) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onBack}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-4 bottom-20 bg-[#F5F5F5] rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-w-lg mx-auto"
          >
            {/* En-tête de la modal */}
            <div className="bg-[#00B4D8] shadow-lg flex items-center justify-center px-4 py-4 relative flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.05 }}
                onClick={onBack}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                aria-label="Fermer"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-lg text-black"
                />
              </motion.button>
              <h1 className="text-xl text-white font-bold">
                Détails du trajet
              </h1>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto">
              {/* Infos trajet */}
              <div className="p-4">
                <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
                  <div className="bg-[#ADE8F4] px-4 py-3 border-b border-gray-200">
                    <div className="flex items-start gap-2 mb-2">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-green-600 mt-1"
                      />
                      <div>
                        <span className="font-semibold text-gray-700">
                          De :
                        </span>
                        <div className="text-gray-900">{trajet.depart}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-red-600 mt-1"
                      />
                      <div>
                        <span className="font-semibold text-gray-700">À :</span>
                        <div className="text-gray-900">
                          {trajet.destination}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#ADE8F4] px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-gray-700"
                      />
                      <span className="text-gray-900">
                        {new Date(trajet.date_depart).toLocaleDateString(
                          "fr-FR",
                          {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}{" "}
                        à {trajet.heure_depart}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#ADE8F4] px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faUserFriends}
                        className="text-gray-700"
                      />
                      <span className="text-gray-900">
                        {trajet.places} places
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {trajet.prix} XOF/place
                    </div>
                  </div>
                </div>

                {/* Liste des passagers */}
                <div className="mb-6">
                  <h2 className="font-bold text-gray-900 mb-3 text-lg">
                    Passagers ({reservationsByTrajet.length}) :
                  </h2>

                  {reservationsByTrajet.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <FontAwesomeIcon
                        icon={faUserFriends}
                        className="text-gray-400 text-2xl mb-2"
                      />
                      <p className="text-gray-500">
                        Aucun passager pour ce trajet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {reservationsByTrajet.map((r) => (
                        <motion.div
                          key={r._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src={r.passager_id?.photo || "/avatar.png"}
                              alt="avatar"
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-900">
                                  {r.passager_id?.prenom} {r.passager_id?.nom}
                                </span>
                                <div className="flex gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                      key={i}
                                      icon={faStar}
                                      className="text-yellow-400 text-xs"
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-gray-600">
                                📞 {r.passager_id?.telephone}
                              </span>
                            </div>
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className="text-gray-400"
                            />
                          </div>

                          <div className="bg-gray-50 rounded-lg p-3 mb-2">
                            <div className="text-sm text-gray-700 mb-1">
                              <span className="font-medium">
                                Places réservées :
                              </span>
                              <span className="font-bold text-blue-600 ml-1">
                                {r.places}
                              </span>
                            </div>
                          </div>

                          {r.message && (
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                              <div className="text-sm">
                                <span className="font-medium text-blue-800">
                                  Message du passager :
                                </span>
                                <div className="text-blue-700 mt-1">
                                  "{r.message}"
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Boutons d'action fixes en bas */}
            <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200 space-y-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction("demarrer")}
                className="w-full rounded-lg px-4 py-3 bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition-colors"
              >
                🚀 Démarrer le trajet
              </motion.button>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction("terminer")}
                  className="rounded-lg px-4 py-3 bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition-colors"
                >
                  ✅ Terminer
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction("annuler")}
                  className="rounded-lg px-4 py-3 bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 transition-colors"
                >
                  ❌ Annuler
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
