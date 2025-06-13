import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Nav from '../../components/Nav';
import ListTrips from '../../components/List-Trips';
import Details from '../../components/Details';

export default function Home() {
  const [showListTrips, setShowListTrips] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowListTrips(true);
  };

  const handleTripClick = (idx) => {
    setSelectedTrip(idx);
    setShowDetails(true);
  };

  const handleBackFromDetails = () => {
    setShowDetails(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-itim relative pb-20">
      {!showListTrips && !showDetails && (
        <>
          {/* Illustration et titre */}
          <div className="w-full max-w-[1000px] overflow-hidden">
            <div className="w-full h-[280px] bg-[#D9D9D9] flex items-center justify-center">
              <img src="/illustration_4.svg" alt="Illustration d'une recherche de trajet" className="absolute inset-0 w-full h-[225px] object-contain" />
            </div>
          </div>
          <h1 className="text-[24px] font-bold text-center text-black mt-2 mb-4" style={{fontFamily: 'Itim, cursive', textShadow: '2px 2px 6px #0008', letterSpacing: 1, marginTop: '-4rem'}}>Trouvez  Votre trajet</h1>
          {/* Carte de recherche */}
          <form className="w-full max-w-[300px] bg-[#b1b0b0] rounded-2xl shadow-lg flex flex-col items-center px-4 pt-4 pb-6 mb-4" style={{boxShadow: '2px 4px 8px #0002'}} onSubmit={handleSubmit}>
            {/* Point de départ */}
            <label htmlFor="depart" className="sr-only">Point de départ</label>
            <div className="w-full flex items-center border border-black rounded-lg bg-[#b1b0b0] px-4 py-2 mb-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600 mr-2" />
              <input id="depart" type="text" placeholder="Point de depart" className="flex-1 bg-transparent outline-none text-[14px] text-black placeholder:text-black" />
            </div>
            {/* Point de destination */}
            <label htmlFor="destination" className="sr-only">Point de destination</label>
            <div className="w-full flex items-center border border-black rounded-lg bg-[#b1b0b0] px-4 py-2 mb-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 mr-2" />
              <input id="destination" type="text" placeholder="Point de destination" className="flex-1 bg-transparent outline-none text-[14px] text-black placeholder:text-black" />
            </div>
            {/* Date/heure et No Place */}
            <div className="w-full flex gap-2 mb-4">
              <label htmlFor="datetime" className="sr-only">Date et heure</label>
              <div className="flex items-center border border-black rounded-lg bg-[#b1b0b0] px-3 py-2" style={{flexBasis: '60%'}}>
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                <input id="datetime" type="text" placeholder="Date et heure" className="w-full bg-transparent outline-none text-[14px] text-black placeholder:text-black" />
              </div>
              <label htmlFor="places" className="sr-only">Nombre de places</label>
              <div className="flex items-center border border-black rounded-lg bg-[#b1b0b0] px-3 py-2" style={{flexBasis: '40%'}}>
                <FontAwesomeIcon icon={faUserFriends} className="mr-0" />
                <input id="places" type="number" min="1" placeholder="No Place" inputMode="numeric" className="w-full bg-transparent outline-none text-[14px] text-black placeholder:text-black text-center" style={{MozAppearance: 'textfield'}} onWheel={e => e.target.blur()} />
              </div>
            </div>
            {/* Bouton rechercher */}
            <button type="submit" className="w-full bg-[#b1b0b0] text-black text-[24px] font-bold rounded-md py-2 mt-2 border border-black shadow-sm hover:bg-[#d1d1d1] transition">Rechercher</button>
          </form>
        </>
      )}
      {showListTrips && !showDetails && (
        <ListTrips onBack={() => setShowListTrips(false)} onTripClick={handleTripClick} />
      )}
      {showDetails && (
        <Details onBack={handleBackFromDetails} trip={selectedTrip} />
      )}
      <Nav className="fixed bottom-0 left-0 right-0 z-50" />
      <style>{`input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{ -webkit-appearance: none; margin: 0; }`}</style>
    </div>
  );
}
