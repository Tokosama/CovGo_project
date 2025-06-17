import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(false);
  const [photoErrorMessage, setPhotoErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    mot_de_passe: '',
    biographie: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom) {
      newErrors.nom = 'Le nom est requis';
    }
    if (!formData.prenom) {
      newErrors.prenom = 'Le prénom est requis';
    }
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.telephone) {
      newErrors.telephone = 'Le numéro de téléphone est requis';
    } else if (!/^\+229[0-9]{10}$/.test(formData.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Format invalide. Exemple: +2290157222709';
    }
    if (!formData.adresse) {
      newErrors.adresse = 'L\'adresse est requise';
    }
    if (!formData.biographie) {
      newErrors.biographie = 'La biographie est requise';
    }
    if (!formData.role) {
      newErrors.role = 'Le rôle est requis';
    }
    if (!formData.mot_de_passe) {
      newErrors.mot_de_passe = 'Le mot de passe est requis';
    }
    if (!photo) {
      setPhotoError(true);
      setPhotoErrorMessage('Photo requise');
    } else {
      setPhotoError(false);
      setPhotoErrorMessage('');
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setAlertMessage(''); // Réinitialiser le message d'alerte
    
    if (Object.keys(newErrors).length === 0 && !photoError) {
      try {
        setIsLoading(true);
        
        // TODO: Décommenter et adapter cette partie une fois le backend prêt
        /*
        // Création d'un objet FormData pour envoyer les données et la photo
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
        });
        
        // Conversion de la photo en Blob
        const photoBlob = await fetch(photo).then(r => r.blob());
        formDataToSend.append('photo', photoBlob, 'photo.jpg');

        // Envoi de la requête au backend
        const response = await axios.post('http://localhost:3000/api/register', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.success) {
          // Stockage du token si nécessaire
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
          }
        }
        */

        // Simulation d'un délai de chargement de 3 secondes
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Sauvegarde de la biographie dans le localStorage
        localStorage.setItem('bio', formData.biographie);
        
        // Redirection vers la page d'accueil sans changer l'état
        window.location.replace('/home');
      } catch (error) {
        console.error('Erreur:', error);
        setIsLoading(false);
        // TODO: Décommenter et adapter cette partie une fois le backend prêt
        /*
        if (error.response) {
          // Gestion des erreurs du serveur
          const serverError = error.response.data;
          if (serverError.email) {
            setErrors(prev => ({ ...prev, email: serverError.email }));
          }
          if (serverError.telephone) {
            setErrors(prev => ({ ...prev, telephone: serverError.telephone }));
          }
          if (serverError.message) {
            setAlertMessage(serverError.message);
          }
        } else if (error.request) {
          // Le serveur n'a pas répondu
          setAlertMessage('Le serveur ne répond pas. Veuillez vérifier votre connexion internet.');
        } else {
          // Erreur de configuration de la requête
          setAlertMessage('Impossible de se connecter au serveur. Veuillez réessayer plus tard.');
        }
        */
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Traitement spécial pour le numéro de téléphone
    if (name === 'telephone') {
      // Supprime tous les caractères non numériques sauf le +
      processedValue = value.replace(/[^\d+]/g, '');
      
      // S'assure que le numéro commence par +229
      if (!processedValue.startsWith('+229')) {
        if (processedValue.startsWith('+')) {
          processedValue = '+229' + processedValue.substring(1);
        } else {
          processedValue = '+229' + processedValue;
        }
      }
      
      // Limite la longueur totale à 14 caractères (+229 + 10 chiffres)
      if (processedValue.length > 14) {
        processedValue = processedValue.substring(0, 14);
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
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
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!['png', 'jpg'].includes(fileExtension)) {
      setPhotoError(true);
      setPhotoErrorMessage('Format non supporté. Choisissez un fichier .png ou .jpg');
      return;
    }

    // Vérification de la taille (2Mo = 2 * 1024 * 1024 octets)
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError(true);
      setPhotoErrorMessage('Fichier trop volumineux (max 2 Mo)');
      return;
    }

    setPhotoError(false);
    setPhotoErrorMessage('');
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-itim">
      {/* Illustration et titre */}
      <div className="w-full max-w-[1000px] rounded-b-2xl overflow-hidden">
        <div className="relative w-full h-[280px] bg-[#EDEDED]">
          {/* Overlay gris léger */}
          <div className="absolute inset-0 bg-[#D9D9D9] opacity-40 z-10" />
          {/* Illustration */}
          <img src="/illustration_3.svg" alt="Créer un compte" className="absolute inset-0 w-full h-full object-contain z-0" />
          {/* Texte centré */}
          <div className="absolute inset-0 flex items-start justify-center z-20">
            <span className="text-[32px] font-extrabold text-black " style={{fontFamily: 'Itim, cursive', textShadow: '2px 2px 6px #0008', letterSpacing: 1, marginTop: '10rem'}}>
              Creer votre Compte
            </span>
          </div>
        </div>
      </div>
      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="w-full max-w-[400px] flex flex-col items-center px-4 pt-4">
        <h2 className="text-[24px] font-bold text-center mb-4 mt-2 text-[#000000]">Renseigner vos informations</h2>
        <div className="flex w-full gap-2 mb-2">
          <div className="flex-1">
            <input 
              type="text" 
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom" 
              className={`w-full border ${errors.nom ? 'border-red-500' : 'border-black'} rounded-full px-4 py-2 text-[16px] outline-none text-black placeholder:text-gray-400 bg-white`} 
            />
            {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
          </div>
          <div 
            className={`w-[35px] h-[35px] bg-[#EDEDED] rounded-xl flex items-center justify-center border ${photoError ? 'border-red-500' : 'border-[#D9D9D9]'} cursor-pointer relative`} 
            onClick={handleCameraClick}
          >
            {photo ? (
              <img src={photo} alt="Aperçu" className="w-full h-full object-cover rounded-xl" />
            ) : photoError ? (
              <FontAwesomeIcon icon={faXmark} className="text-red-500 text-2xl" />
            ) : (
              <FontAwesomeIcon icon={faCamera} className="text-gray-500 text-2xl" />
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
        {photoErrorMessage && (
          <p className="text-red-500 text-sm mb-2 w-full">{photoErrorMessage}</p>
        )}
        <div className="w-full">
          <input 
            type="text" 
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prenom" 
            className={`w-full border ${errors.prenom ? 'border-red-500' : 'border-black'} rounded-full px-4 py-2 text-[16px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`} 
          />
          {errors.prenom && <p className="text-red-500 text-sm mb-2">{errors.prenom}</p>}
        </div>
        <div className="w-full">
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email" 
            className={`w-full border ${errors.email ? 'border-red-500' : 'border-black'} rounded-full px-4 py-2 text-[16px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`} 
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
        </div>
        <div className="w-full">
          <input 
            type="tel" 
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Telephone" 
            className={`w-full border ${errors.telephone ? 'border-red-500' : 'border-black'} rounded-full px-4 py-2 text-[16px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`} 
          />
          {errors.telephone && <p className="text-red-500 text-sm mb-2">{errors.telephone}</p>}
        </div>
        <div className="w-full">
          <input 
            type="text" 
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Adresse" 
            className={`w-full border ${errors.adresse ? 'border-red-500' : 'border-black'} rounded-full px-4 py-2 text-[16px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`} 
          />
          {errors.adresse && <p className="text-red-500 text-sm mb-2">{errors.adresse}</p>}
        </div>
        <div className="w-full">
          <input 
            type="password" 
            name="mot_de_passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            placeholder="Mot de passe" 
            className={`w-full border ${errors.mot_de_passe ? 'border-red-500' : 'border-black'} rounded-full px-4 py-2 text-[16px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`} 
          />
          {errors.mot_de_passe && <p className="text-red-500 text-sm mb-2">{errors.mot_de_passe}</p>}
        </div>
        <div className="w-full">
          <input 
            type="text" 
            name="biographie"
            value={formData.biographie}
            onChange={handleChange}
            placeholder="Biographie" 
            className={`w-full border ${errors.biographie ? 'border-red-500' : 'border-black'} rounded-full px-4 py-2 text-[16px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`} 
          />
          {errors.biographie && <p className="text-red-500 text-sm mb-2">{errors.biographie}</p>}
        </div>
        <div className="w-full">
          <select 
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full border ${errors.role ? 'border-red-500' : 'border-black'} rounded-full px-4 py-2 text-[16px] outline-none mb-4 bg-white text-black`}
          >
            <option value="">Role</option>
            <option value="conducteur">Conducteur</option>
            <option value="passager">Passager</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mb-2">{errors.role}</p>}
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full bg-[#D9D9D9] text-black text-[24px] font-bold rounded-md py-2 mb-2 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="flex items-center justify-center">
            {isLoading ? (
              <>
                Inscription en cours
                <span className="spinner ml-2"></span>
              </>
            ) : (
              'S\'inscrire'
            )}
          </span>
        </button>
        <div className="w-full text-center mt-2 mb-6">
          <span className="text-[16px] font-bold text-black">Deja un Compte? </span>
          <span className="text-[16px] text-[#a5a5a5] font-bold cursor-pointer hover:underline" onClick={() => navigate('/login')}>se connecter</span>
        </div>
      </form>

      <style jsx>{`
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid #000;
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
