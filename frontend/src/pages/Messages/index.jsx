import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { ChatContainer } from "../../components/ChatContainer"; // à adapter selon l'emplacement

export default function Messages() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  const [isMessages, setIsMessages] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users;
  useEffect(() => {
    if (filteredUsers.length > 0) {
      setIsMessages(true);
    } else {
      setIsMessages(false);
    }
  }, [filteredUsers]);
  return (
    <div className="min-h-screen bg-white pb-24 font-itim w-full overflow-y-auto">
      {/* Si un utilisateur est sélectionné, on affiche ChatContainer */}
      {selectedUser ? (
        <ChatContainer />
      ) : (
        <>
          <div className="w-full bg-[#00B4D8] flex items-center justify-center px-2 h-[90px] shadow-custom relative">
            <h1 className="flex-1 text-center text-[24px] text-black">
              Messages
            </h1>
          </div>
          {!isMessages ? (
            <div className="flex flex-col items-center justify-center mt-10 text-gray-400 text-[16px]">
              Aucun message pour le moment.
            </div>
          ) : (
            <div>
              <div className="overflow-y-auto w-full py-3">
                {filteredUsers.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full p-3 flex items-center shadow-custom gap-3 hover:bg-[#00B4D8] transition-colors ${
                      selectedUser?._id === user._id ? "bg-[#ADE8F4]" : ""
                    }`}
                  >
                    <div className="relative lg:mx-0 mx-3">
                      <img
                        src={user.photo || "/avatar.png"}
                        alt={`${user.prenom} ${user.nom}`}
                        className="size-12 object-cover rounded-full"
                      />
                    </div>
                    <div className="lg:block text-black text-left min-w-0">
                      <div className="font-medium truncate">
                        {user.prenom} {user.nom}
                      </div>
                      <div className="text-sm text-zinc-400">
                        {/* {onlineUsers.includes(user._id) ? "En ligne" : "Hors ligne"} */}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <Nav activeMenu="messages" />
    </div>
  );
}
