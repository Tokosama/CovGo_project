import React from 'react';
import Nav from '../../components/Nav';

export default function Messages() {
  return (
    <div className="min-h-screen bg-white pb-24 font-itim w-full overflow-y-auto">
      <div className="w-full bg-[#00B4D8] flex items-center justify-center px-2 h-[90px] shadow-custom relative">
        <h1 className="flex-1 text-center text-[24px]  text-black">Messages</h1>
      </div>
      <div className="flex flex-col items-center justify-center mt-10 text-gray-400 text-[16px]">Aucun message pour le moment.</div>
      <Nav activeMenu="messages" />
    </div>
  );
}