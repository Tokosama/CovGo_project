import React, { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OtpModal({ 
  visible, 
  onValidate, 
  onResendCode, 
  isLoading, 
  error: externalError,
  onClose,
  email 
}) {
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [error, setError] = React.useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 5 minutes en secondes
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputsRef = useRef([]);

  // Réinitialiser l'OTP quand la modal s'ouvre
  useEffect(() => {
    if (visible) {
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setTimeLeft(180);
      setCanResend(false);
      // Focus sur le premier input
      setTimeout(() => {
        if (inputsRef.current[0]) {
          inputsRef.current[0].focus();
        }
      }, 100);
    }
  }, [visible]);

  // Gérer les erreurs externes
  useEffect(() => {
    if (externalError) {
      setError(externalError);
    }
  }, [externalError]);

  useEffect(() => {
    if (visible && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [visible, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResendCode = async () => {
    if (canResend && !isResending) {
      setIsResending(true);
      try {
        if (onResendCode) {
          await onResendCode(email);
        }
        setTimeLeft(180);
        setCanResend(false);
        setError("");
      } catch (error) {
        setError("Erreur lors du renvoi du code. Veuillez réessayer.");
      } finally {
        setIsResending(false);
      }
    }
  };

  const handleChange = useCallback((e, idx) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    setError("");
    if (value && idx < 5) {
      inputsRef.current[idx + 1].focus();
    }
  }, [otp]);

  const handleKeyDown = useCallback((e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  }, [otp]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Veuillez entrer les 6 chiffres du code OTP.");
      return;
    }
    if (onValidate) {
      onValidate(code);
    }
  }, [otp, onValidate]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-[#FFFFFF] rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-[calc(100%-2rem)] max-w-[340px] min-w-[280px] flex flex-col items-center mx-4"
      >
        <h2 className="text-black text-[24px] font-bold mb-2 text-center">Vérification OTP</h2>
        <p className="text-[16px] sm:text-base text-gray-600 mb-4 text-center">
          Veuillez entrer le code reçu par email ou SMS
        </p>
        {email && (
          <p className="text-[14px] text-gray-500 mb-4 text-center">
            Code envoyé à : {email}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <div className="flex gap-4 sm:gap-4 mb-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => (inputsRef.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                className="w-8 h-10 sm:w-10 sm:h-12 text-center text-black text-lg sm:text-xl border border-gray-300 rounded-md focus:border-black/70 outline-none bg-[#D9D9D9]"
                autoFocus={idx === 0}
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#D9D9D9] text-black text-[24px] font-bold rounded-md py-2 mt-2 transition-all duration-300 ease-in-out hover:bg-[#a7a6a6] hover:text-black hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 border border-black/20"
            disabled={isLoading}
          >
            <span className="flex items-center justify-center">
              {isLoading ? (
                <>
                  Vérification
                  <span className="spinner ml-2"></span>
                </>
              ) : (
                "Valider"
              )}
            </span>
          </button>
          <div className="w-full text-center mt-7 mb-2">
            <span className="text-[16px] font-bold text-black">
              Un problème ?{" "}
            </span>
            {canResend ? (
              <span
                className={`text-[16px] font-bold cursor-pointer hover:underline ${
                  isResending ? 'text-gray-400' : 'text-[#a5a5a5]'
                }`}
                onClick={handleResendCode}
              >
                {isResending ? "Envoi en cours..." : "Renvoyer le code OTP"}
              </span>
            ) : (
              <span className="text-[16px] text-[#a5a5a5] font-bold">
                Renvoyer le code OTP dans {formatTime(timeLeft)}
              </span>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Ajout du style pour le spinner
const styles = `
  .spinner {
    width: 20px;
    height: 20px;
    border: 3px solid #000;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
    display: inline-block;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Ajout du style dans le document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
} 