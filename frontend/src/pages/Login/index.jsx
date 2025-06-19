import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OtpModal from "../../components/OtpModal";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showOtp, setShowOtp] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');

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
    setAlertMessage('');
    setOtpError('');
    
    if (Object.keys(newErrors).length === 0) {
      try {
        setIsLoading(true);
        
        // TODO: Remplacer par l'appel API réel
        // const response = await axios.post('/api/login', formData);
        // if (response.data.requiresOtp) {
        //   setShowOtp(true);
        // } else {
        //   navigate('/home');
        // }
        
        // Simulation pour le moment
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowOtp(true);
        
      } catch (error) {
        console.error('Erreur de connexion:', error);
        setAlertMessage('Email ou mot de passe incorrect');
      } finally {
        setIsLoading(false);
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

  const handleOtpValidate = async (code) => {
    setOtpLoading(true);
    setOtpError('');
    
    try {
      // TODO: Remplacer par l'appel API réel
      // const response = await axios.post('/api/verify-otp', {
      //   code,
      //   email: formData.email
      // });
      // if (response.data.success) {
      //   navigate('/home');
      // }
      
      // Simulation pour le moment
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowOtp(false);
      toast.success('Connexion réussie !', {
        duration: 3000,
        style: {
          fontFamily: 'Itim, cursive',
          background: '#FFFFFF',
          color: '#000000',
          fontSize: '16px',
          fontWeight: 'semibold',
          borderRadius: '8px',
          padding: '12px 16px',
        },
      });
      navigate('/home');
      
    } catch (error) {
      console.error('Erreur OTP:', error);
      setOtpError('Code OTP incorrect. Veuillez réessayer.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async (email) => {
    try {
      // TODO: Remplacer par l'appel API réel
      // await axios.post('/api/resend-otp', { email });
      
      // Simulation pour le moment
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Code OTP renvoyé !', {
        duration: 2500,
        style: {
          fontFamily: 'Itim, cursive',
          background: '#FFFFFF',
          color: '#000000',
          fontSize: '16px',
          fontWeight: 'semibold',
          borderRadius: '8px',
          padding: '10px 14px',
        },
      });
      
    } catch (error) {
      console.error('Erreur renvoi OTP:', error);
      throw new Error('Erreur lors du renvoi du code OTP');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-itim">
      {/* Illustration et titre */}
      <div className="w-full max-w-[1000px] shadow-custom rounded-b-4xl overflow-hidden">
        <div className="relative w-full h-[280px] bg-[#00B4D8]">
          {/* Overlay gris léger */}
          <div className="absolute inset-0 bg-[#D9D9D9] opacity-0 z-10" />
          {/* Illustration */}
          <img src="/illustration_7.png" alt="Connexion" className="absolute inset-0 w-full h-full object-contain z-0" />
          {/* Texte centré */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <span className="text-[36px] font-extrabold text-white" style={{fontFamily: 'Itim, cursive', textShadow: '2px 2px 6px #0008', letterSpacing: 1, marginTop: '14rem'}}>
              Connecter-vous
            </span>
          </div>
        </div>
      </div>
      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="w-full max-w-[400px] flex flex-col items-center px-4 pt-4">
        <h2 className="text-[28px]  text-center mb-4 mt-2 text-[#1F2937]">Renseigner vos informations</h2>
        <div className="w-full">
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email" 
            className={`w-full border ${errors.email ? 'border-red-500' : 'border-black'} rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`} 
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
        </div>
        <div className="w-full mt-2">
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password" 
            className={`w-full border ${errors.password ? 'border-red-500' : 'border-black'} rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`} 
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full bg-[#3B82F6] text-white text-[24px]  rounded-md mt-10 py-2 mb-2 shadow-custom border border-black/20 hover:bg-[#3B82F6]/80 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
        <div className="w-full text-center mt-5 mb-6">
          <span className="text-[16px] font-bold text-black">Nouveau? </span>
          <span className="text-[16px] text-[#3B82F6] font-bold cursor-pointer hover:underline" onClick={() => navigate('/register')}>s'inscrire</span>
        </div>
      </form>
      
      <OtpModal 
        visible={showOtp} 
        onValidate={handleOtpValidate} 
        onResendCode={handleResendOtp}
        isLoading={otpLoading}
        error={otpError}
        email={formData.email}
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
    </div>
  );
}
