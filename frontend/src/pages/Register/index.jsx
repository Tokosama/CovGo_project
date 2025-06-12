import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-itim">
      {/* Illustration et titre */}
      <div className="w-full max-w-[400px] rounded-b-2xl overflow-hidden">
        <div className="relative w-full h-[280px] bg-[#EDEDED]">
          {/* Overlay gris léger */}
          <div className="absolute inset-0 bg-[#EDEDED] opacity-40 z-10" />
          {/* Illustration */}
          <img src="/illustration_3.svg" alt="Créer un compte" className="absolute inset-0 w-full h-full object-contain z-0" />
          {/* Texte centré */}
          <div className="absolute inset-0 flex items-start justify-center z-20">
            <span className="text-[22px] font-extrabold text-black " style={{fontFamily: 'Itim, cursive', textShadow: '2px 2px 6px #0008', letterSpacing: 1, marginTop: '10rem'}}>
              Creer votre Compte
            </span>
          </div>
        </div>
      </div>
      {/* Formulaire */}
      <form className="w-full max-w-[400px] flex flex-col items-center px-4 pt-4">
        <h2 className="text-[18px] font-bold text-center mb-4 mt-2 text-[#000000]">Renseigner vos informations</h2>
        <div className="flex w-full gap-2 mb-2">
          <input type="text" placeholder="Nom" className="flex-1 border border-black rounded-full px-4 py-2 text-[15px] outline-none text-black placeholder:text-gray-400 bg-white" />
          <div className="w-[60px] h-[60px] bg-[#EDEDED] rounded-xl flex items-center justify-center border border-[#D9D9D9]">
            <FontAwesomeIcon icon={faCamera} className="text-gray-500 text-2xl" />
          </div>
        </div>
        <input type="text" placeholder="Prenom" className="w-full border border-black rounded-full px-4 py-2 text-[15px] outline-none mb-2 text-black placeholder:text-gray-400 bg-white" />
        <input type="email" placeholder="Email" className="w-full border border-black rounded-full px-4 py-2 text-[15px] outline-none mb-2 text-black placeholder:text-gray-400 bg-white" />
        <input type="tel" placeholder="Telephone" className="w-full border border-black rounded-full px-4 py-2 text-[15px] outline-none mb-2 text-black placeholder:text-gray-400 bg-white" />
        <input type="text" placeholder="Adresse" className="w-full border border-black rounded-full px-4 py-2 text-[15px] outline-none mb-2 text-black placeholder:text-gray-400 bg-white" />
        <select className="w-full border border-black rounded-full px-4 py-2 text-[15px] outline-none mb-4 bg-white text-black">
          <option value="">Role</option>
          <option value="conducteur">Conducteur</option>
          <option value="passager">Passager</option>
        </select>
        <button type="button" className="w-full bg-[#D9D9D9] text-black text-[18px] font-bold rounded-md py-2 mb-2 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition" onClick={() => window.location.href = '/home'}>S'inscrire</button>
        <div className="w-full text-center mt-2 mb-6">
          <span className="text-[15px] font-bold text-black">Deja un Compte? </span>
          <span className="text-[15px] text-[#a5a5a5] font-bold cursor-pointer hover:underline" onClick={() => window.location.href = '/login'}>se connecter</span>
        </div>
      </form>
    </div>
  );
}
