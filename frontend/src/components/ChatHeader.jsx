import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);
  const fullName = `${selectedUser.prenom} ${selectedUser.nom}`;
  const profilePic = selectedUser.photo || "/avatar.png";
console.log(selectedUser)
  return (
    <div className="p-2.5 bg-[#ADE8F4] shadow-custom text-black sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={profilePic}
                alt={fullName}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{fullName}</h3>
            <p
              className={`text-sm ${
                isOnline ? "text-green-500" : "text-red-500"
              }`}
            >
              {isOnline ? "En ligne" : "Hors ligne"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X/>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
