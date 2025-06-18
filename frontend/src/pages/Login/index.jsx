import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const{login, isLoggingIn} = useAuthStore();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setAlertMessage(''); // Réinitialiser le message d'alerte
    
    if (Object.keys(newErrors).length === 0) {
      try {
        login(formData);

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
          if (serverError.password) {
            setErrors(prev => ({ ...prev, password: serverError.password }));
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-itim">
      {/* Illustration et titre */}
      <div className="w-full max-w-[1000px] rounded-b-2xl overflow-hidden">
        <div className="relative w-full h-[280px] bg-[#EDEDED]">
          {/* Overlay gris léger */}
          <div className="absolute inset-0 bg-[#D9D9D9] opacity-40 z-10" />
          {/* Illustration */}
          <img src="/illustration_3.svg" alt="Connexion" className="absolute inset-0 w-full h-full object-contain z-0" />
          {/* Texte centré */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <span className="text-[32px] font-extrabold text-black" style={{fontFamily: 'Itim, cursive', textShadow: '2px 2px 6px #0008', letterSpacing: 1, marginTop: '4rem'}}>
              Connecter-vous
            </span>
          </div>
        </div>
      </div>
      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="w-full max-w-[400px] flex flex-col items-center px-4 pt-4">
        <h2 className="text-[24px] font-bold text-center mb-4 mt-2 text-[#000000]">Renseigner vos informations</h2>
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
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password" 
            className={`w-full border ${errors.password ? 'border-red-500' : 'border-black'} rounded-full px-4 py-2 text-[16px] outline-none mb-3 text-black placeholder:text-gray-400 bg-white`} 
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full bg-[#D9D9D9] text-black text-[24px] font-bold rounded-md py-2 mb-2 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="flex items-center justify-center">
            {isLoading ? (
              <>
                Connexion en cours
                <span className="spinner ml-2"></span>
              </>
            ) : (
              'Se connecter'
            )}
          </span>
        </button>
        {alertMessage && (
          <p className="text-red-500 text-sm mb-4 w-full text-center">{alertMessage}</p>
        )}
        <div className="w-full text-center mb-6">
          <span className="text-[16px] font-bold text-black">Nouveau? </span>
          <span className="text-[16px] text-[#a5a5a5] font-bold cursor-pointer hover:underline" onClick={() => navigate('/register')}>s'inscrire</span>
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
