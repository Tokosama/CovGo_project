import React, { useState, useEffect } from "react";
import { useVehiculeStore } from "../store/useVehiculeStore";
import { ChevronLeft, Plus, Car, Edit, Trash2, Loader } from "lucide-react";

export default function GestionVehicules({ onBack }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicule, setEditingVehicule] = useState(null);
  const [formData, setFormData] = useState({
    immatriculation: "",
    marque: "",
    model: "",
    couleur: "",
  });
  const [errors, setErrors] = useState({});

  const {
    vehicules,
    isFetching,
    isSubmitting,
    fetchVehicules,
    addVehicule,
    updateVehicule,
    removeVehicule,
  } = useVehiculeStore();

  useEffect(() => {
    fetchVehicules();
  }, [fetchVehicules]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.immatriculation.trim()) {
      newErrors.immatriculation = "L'immatriculation est requise";
    }
    if (!formData.marque.trim()) {
      newErrors.marque = "La marque est requise";
    }
    if (!formData.model.trim()) {
      newErrors.model = "Le modèle est requis";
    }
    if (!formData.couleur.trim()) {
      newErrors.couleur = "La couleur est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const vehiculeData = {
      immatriculation: formData.immatriculation.trim().toUpperCase(),
      marque: formData.marque.trim(),
      model: formData.model.trim(),
      couleur: formData.couleur.trim(),
    };

    let result;
    if (editingVehicule) {
      result = await updateVehicule(editingVehicule._id, vehiculeData);
    } else {
      result = await addVehicule(vehiculeData);
    }

    if (result.success) {
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      immatriculation: "",
      marque: "",
      model: "",
      couleur: "",
    });
    setErrors({});
    setShowAddForm(false);
    setEditingVehicule(null);
  };

  const handleEdit = (vehicule) => {
    setFormData({
      immatriculation: vehicule.immatriculation,
      marque: vehicule.marque,
      model: vehicule.model,
      couleur: vehicule.couleur,
    });
    setEditingVehicule(vehicule);
    setShowAddForm(true);
  };

  const handleDelete = async (vehiculeId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?")) {
      await removeVehicule(vehiculeId);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="size-10 text-[#3B82F6] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 text-black">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 mr-3"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Mes Véhicules</h1>
        </div>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </button>
        )}
      </div>

      {/* Formulaire d'ajout/modification */}
      {showAddForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingVehicule ? "Modifier le véhicule" : "Ajouter un véhicule"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Immatriculation *
              </label>
              <input
                type="text"
                name="immatriculation"
                value={formData.immatriculation}
                onChange={handleInputChange}
                placeholder="Ex: AB-123-CD"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.immatriculation ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.immatriculation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.immatriculation}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marque *
              </label>
              <input
                type="text"
                name="marque"
                value={formData.marque}
                onChange={handleInputChange}
                placeholder="Ex: Toyota, Peugeot, etc."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.marque ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.marque && (
                <p className="text-red-500 text-sm mt-1">{errors.marque}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Modèle *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="Ex: Corolla, 308, etc."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.model ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.model && (
                <p className="text-red-500 text-sm mt-1">{errors.model}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Couleur *
              </label>
              <input
                type="text"
                name="couleur"
                value={formData.couleur}
                onChange={handleInputChange}
                placeholder="Ex: Blanc, Rouge, etc."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.couleur ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.couleur && (
                <p className="text-red-500 text-sm mt-1">{errors.couleur}</p>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting
                  ? "Enregistrement..."
                  : editingVehicule
                  ? "Modifier"
                  : "Ajouter"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des véhicules */}
      <div className="space-y-4">
        {vehicules.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              Aucun véhicule enregistré
            </h3>
            <p className="text-gray-400 mb-4">
              Commencez par ajouter votre premier véhicule
            </p>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Ajouter un véhicule
              </button>
            )}
          </div>
        ) : (
          vehicules.map((vehicule) => (
            <div
              key={vehicule._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {vehicule.marque} {vehicule.model}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {vehicule.immatriculation} • {vehicule.couleur}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(vehicule)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(vehicule._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
