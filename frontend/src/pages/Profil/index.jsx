import React, { useRef, useState } from 'react';
import Nav from '../../components/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faStar, faIdCard, faCamera, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Profil() {
  const navigate = useNavigate();
  const permisInputRef = useRef(null);
  const photoPermisInputRef = useRef(null);
  const [permis, setPermis] = useState(null);
  const [photoPermis, setPhotoPermis] = useState(null);
  const [showVehiculeForm, setShowVehiculeForm] = useState(false);
  const [vehicule, setVehicule] = useState({ marque: '', modele: '', couleur: '', immat: '' });
  const [showPieceForm, setShowPieceForm] = useState(false);
  const [pieceType, setPieceType] = useState('CIP');
  const [pieceFile, setPieceFile] = useState(null);
  const pieceInputRef = useRef(null);
  const [showProfileRecap, setShowProfileRecap] = useState(false);
  const [bio, setBio] = useState("Bonjour je suis tokoSama , bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla");

  const handlePermisClick = () => permisInputRef.current && permisInputRef.current.click();
  const handlePhotoPermisClick = () => photoPermisInputRef.current && photoPermisInputRef.current.click();

  const handlePermisChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) {
      alert('Format non supporté. PNG, JPG ou PDF uniquement.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Fichier trop volumineux (max 2 Mo).');
      return;
    }
    setPermis(file.name);
  };

  const handlePhotoPermisChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      alert('Format non supporté. PNG ou JPG uniquement.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Fichier trop volumineux (max 2 Mo).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPermis(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Fonction pour reset le profil à l'état initial
  const resetProfil = () => {
    setShowVehiculeForm(false);
    setShowPieceForm(false);
    setShowProfileRecap(false);
    setVehicule({ marque: '', modele: '', couleur: '', immat: '' });
    setPieceType('CIP');
    setPieceFile(null);
  };

  return (
    <div className="min-h-screen bg-white pb-24 font-itim w-full overflow-y-auto">
      {/* En-tête avec flèche de retour */}
      <div className="w-full bg-[#D9D9D9] flex items-center px-2 py-4 relative shadow-sm">
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ x: -4 }}
          onClick={() => navigate('/messages')}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 focus:outline-none"
          aria-label="Retour"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[22px] text-black" />
        </motion.button>
        <h1 className="flex-1 text-center text-[20px] font-bold text-black">Profils</h1>
      </div>
      {/* En-tête + avatar + infos (toujours visible) */}
      <div className="w-full bg-[#ffffff] px-0 pt-4 pb-6 flex flex-col items-center">
        <div className="flex flex-row items-center w-full max-w-[350px] mx-auto px-2">
          {/* Avatar cerclé */}
          <div className="flex-shrink-0 w-[80px] h-[80px] rounded-full border-2 border-gray-400 flex items-center justify-center bg-white">
            <FontAwesomeIcon icon={faUserCircle} className="text-[70px] text-black" />
          </div>
          {/* Infos */}
          <div className="flex flex-col justify-center ml-4 flex-1">
            <span className="font-bold text-[18px] text-black">toko Sama</span>
            <span className="text-[14px] text-black leading-tight">18 ans</span>
            <span className="text-[14px] text-black leading-tight">+229 0197000000</span>
            <span className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="text-gray-400 text-base" />
              ))}
            </span>
          </div>
        </div>
        <hr className="w-[90%] border-t border-gray-400 mt-2" />
      </div>
      {/* Section dynamique sous l'en-tête */}
      {!showVehiculeForm && !showPieceForm && (
        <>
          <div className="w-full text-center text-[15px] font-bold text-black mb-12">Vérifiez vos Informations avant de publier des trajets</div>
          {/* Bloc permis */}
          <div className="w-full max-w-[300px] mx-auto flex flex-col gap-2 mb-2">
            <span className="font-bold text-[15px] text-black">Rajouter votre Permis de conduire</span>
            <div className="flex items-center bg-[#EDEDED] rounded-xl border border-gray-300 px-3 py-2 cursor-pointer transition hover:shadow-md" onClick={handlePermisClick}>
              <FontAwesomeIcon icon={faIdCard} className="text-gray-500 text-xl mr-2" />
              <span className="flex-1 text-[15px] text-gray-500 truncate">{permis ? permis : 'Permis de conduire'}</span>
              <input
                type="file"
                accept="image/png, image/jpeg,application/pdf"
                style={{ display: 'none' }}
                ref={permisInputRef}
                onChange={handlePermisChange}
              />
            </div>
          </div>
          {/* Bloc photo permis */}
          <div className="w-full max-w-[300px] mx-auto flex flex-col gap-2 mb-2 mt-2">
            <span className="font-bold text-[15px] text-black">Rajouter une photo de vous avec le permis de conduire</span>
            <div className="flex items-center justify-center bg-[#EDEDED] rounded-xl border border-gray-300 px-3 py-2 cursor-pointer transition hover:shadow-md" onClick={handlePhotoPermisClick}>
              {photoPermis ? (
                <img src={photoPermis} alt="Aperçu" className="w-12 h-12 object-cover rounded-lg" />
              ) : (
                <FontAwesomeIcon icon={faCamera} className="text-gray-500 text-2xl" />
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                style={{ display: 'none' }}
                ref={photoPermisInputRef}
                onChange={handlePhotoPermisChange}
              />
            </div>
          </div>
          {/* Bouton soumettre */}
          <div className="w-full flex justify-center mt-4 mb-6">
            <button
              className="bg-[#D9D9D9] text-black text-[18px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
              onClick={() => setShowVehiculeForm(true)}
              type="button"
            >
              Soumettre
            </button>
          </div>
          <hr className="w-[80%] mx-auto mt-2 mb-2 border-gray-300" />
        </>
      )}
      {/* Formulaire véhicule (apparition conditionnelle) */}
      {showVehiculeForm && !showPieceForm && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center mt-8"
        >
          <div className="w-full max-w-[350px] mx-auto">
            <div className="w-full text-center text-[16px] font-bold text-black mb-2">Rajouter les infos de votre vehicule</div>
            <div className="flex flex-col gap-3 mb-3">
              <input
                type="text"
                placeholder="Marque"
                className="rounded-full bg-[#EDEDED] text-black px-4 py-2 text-[15px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
                value={vehicule.marque}
                onChange={e => setVehicule({ ...vehicule, marque: e.target.value })}
              />
              <input
                type="text"
                placeholder="Modele"
                className="rounded-full bg-[#EDEDED] px-4 py-2 text-black text-[15px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
                value={vehicule.modele}
                onChange={e => setVehicule({ ...vehicule, modele: e.target.value })}
              />
              <input
                type="text"
                placeholder="Couleur"
                className="rounded-full bg-[#EDEDED] px-4 py-2 text-black text-[15px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
                value={vehicule.couleur}
                onChange={e => setVehicule({ ...vehicule, couleur: e.target.value })}
              />
              <input
                type="text"
                placeholder="Immatriculation"
                className="rounded-full bg-[#EDEDED] px-4 py-2 text-black text-[15px] outline-none border border-gray-200 focus:border-blue-400 font-itim"
                value={vehicule.immat}
                onChange={e => setVehicule({ ...vehicule, immat: e.target.value })}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[#D9D9D9] text-black text-[18px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
                type="button"
                onClick={() => setShowPieceForm(true)}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {/* Formulaire pièce (apparition conditionnelle) */}
      {showPieceForm && !showProfileRecap && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center mt-8"
        >
          <hr className="w-[90%] border-t border-gray-400 mb-2" />
          <div className="w-full max-w-[350px] mx-auto">
            <div className="w-full text-center text-[16px] font-bold text-black mb-2">Rajouter votre piece</div>
            <div className="mb-2">
              <label className="block text-[13px] text-gray-600 mb-1">Choix de la piece</label>
              <div className="relative">
                <select
                  className="appearance-none w-full rounded-full bg-[#EDEDED] px-4 py-2 text-[15px] text-black border border-gray-200 focus:border-blue-400 font-itim pr-8 z-10 cursor-pointer"
                  value={pieceType}
                  onChange={e => setPieceType(e.target.value)}
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  <option value="CIP">CIP</option>
                  <option value="CNI">CNI</option>
                  <option value="Passeport">Passeport</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg z-0">▼</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[13px] text-gray-600 mb-1">Ajoutez la piece</label>
              <div
                className="flex items-center bg-[#EDEDED] rounded-full border border-gray-300 px-3 py-2 cursor-pointer hover:shadow-md transition"
                onClick={() => pieceInputRef.current && pieceInputRef.current.click()}
              >
                <FontAwesomeIcon icon={faIdCard} className="text-gray-500 text-xl mr-2" />
                <span className="flex-1 text-[15px] text-gray-500 truncate">{pieceFile ? pieceFile.name : pieceType}</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg,application/pdf"
                  style={{ display: 'none' }}
                  ref={pieceInputRef}
                  onChange={e => setPieceFile(e.target.files[0])}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[#D9D9D9] text-black text-[18px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
                type="button"
                onClick={() => setShowProfileRecap(true)}
              >
                Soumettre
              </button>
            </div>
          </div>
          <hr className="w-[80%] border-t border-gray-400 mt-4" />
        </motion.div>
      )}
      {/* Récap profil après soumission pièce */}
      {showProfileRecap && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center mt-8"
        >
          <div className="w-full max-w-[350px] mx-auto">
            <div className="bg-[#EDEDED] rounded-md border border-gray-300 px-3 py-2 text-[14px] text-black mb-2">
              {bio}
            </div>
            <div className="flex justify-center mb-4">
              <button
                className="bg-[#D9D9D9] text-black text-[15px] font-bold rounded-md py-2 px-8 shadow-sm border border-black/20 hover:bg-[#bdbdbd] transition"
                onClick={resetProfil}
              >
                Mettre à jour
              </button>
            </div>
            <hr className="w-[90%] border-t border-gray-400 mx-auto mt-2 mb-2" />
            <div className="w-full text-center text-[16px] font-bold text-black mt-2">Trajet a venir</div>
          </div>
        </motion.div>
      )}
      <Nav activeMenu="profil" />
    </div>
  );
}