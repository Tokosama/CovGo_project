import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const { login } = useAuthStore();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setAlertMessage("");

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsLoading(true);
        const result = await login(formData);
        console.log("Login result:", result);

        toast.success("Connexion réussie !");

        if (result.data.role === "conducteur") {
          return navigate("/publier");
        }
        return navigate("/home");
      } catch (error) {
        console.error("Erreur:", error);
        setAlertMessage("Erreur lors de la connexion.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-itim">
      <div className="w-full max-w-[1000px] shadow-custom rounded-b-4xl overflow-hidden">
        <div className="relative w-full h-[280px] bg-[#00B4D8]">
          <div className="absolute inset-0 bg-[#D9D9D9] opacity-0 z-10" />
          <img
            src="/illustration_7.png"
            alt="Connexion"
            className="absolute inset-0 w-full h-full object-contain z-0"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <span
              className="text-[36px] font-extrabold text-white"
              style={{
                fontFamily: "Itim, cursive",
                textShadow: "2px 2px 6px #0008",
                letterSpacing: 1,
                marginTop: "14rem",
              }}
            >
              Connecter-vous
            </span>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] flex flex-col items-center px-4 pt-4"
      >
        <h2 className="text-[28px] text-center mb-4 mt-2 text-[#1F2937]">
          Renseigner vos informations
        </h2>
        <div className="w-full">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-black"
            } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}
        </div>
        <div className="w-full mt-2">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full border ${
              errors.password ? "border-red-500" : "border-black"
            } rounded-2xl shadow-custom px-4 py-2 text-[20px] outline-none mb-1 text-black placeholder:text-gray-400 bg-white`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#3B82F6] text-white text-[24px] rounded-md mt-10 py-2 mb-2 shadow-custom border border-black/20 hover:bg-[#3B82F6]/80 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="flex items-center justify-center">
            {isLoading ? (
              <>
                Connexion en cours <span className="spinner ml-2"></span>
              </>
            ) : (
              "Se connecter"
            )}
          </span>
        </button>
        {alertMessage && (
          <p className="text-red-500 text-sm mb-4 w-full text-center">
            {alertMessage}
          </p>
        )}
        <div className="w-full text-center mt-5 mb-6">
          <span className="text-[16px] font-bold text-black">Nouveau? </span>
          <span
            className="text-[16px] text-[#3B82F6] font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            s'inscrire
          </span>
        </div>
      </form>

      <div className="spinner"></div>

      <style>
        {`
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
`}
      </style>
    </div>
  );
}
