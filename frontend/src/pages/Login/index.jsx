import React from 'react';

export default function Login() {
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
      <form className="w-full max-w-[400px] flex flex-col items-center px-4 pt-4">
        <h2 className="text-[24px] font-bold text-center mb-4 mt-2 text-[#000000]">Renseigner vos informations</h2>
        <input type="email" placeholder="Email" className="w-full border border-black rounded-full px-4 py-2 text-[16px] outline-none mb-3 text-black placeholder:text-gray-400 bg-white" />
        <input type="password" placeholder="Password" className="w-full border border-black rounded-full px-4 py-2 text-[16px] outline-none mb-6 text-black placeholder:text-gray-400 bg-white" />
        <button type="button" className="w-full bg-[#D9D9D9] text-black text-[24px] font-bold rounded-md py-2 mb-6 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition" onClick={() => window.location.href = '/home'}>Se connecter</button>
        <div className="w-full text-center mb-6">
          <span className="text-[16px] font-bold text-black">Nouveau? </span>
          <span className="text-[16px] text-[#a5a5a5] font-bold cursor-pointer hover:underline" onClick={() => window.location.href = '/register'}>s'inscrire</span>
        </div>
      </form>
    </div>
  );
}
