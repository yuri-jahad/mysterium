import React, { useEffect, useState } from "react";
import type { CreateRoom } from "@/websocket/types/client/room";
import AuthButtons from "@/auth/components/auth-buttons";

// Icons components

type GameType = "Bombparty" | "Popsauce";
type RoomVisibility = "public" | "private";

interface CreateRoomForm {
  gameName: GameType;
  visibility: RoomVisibility;
  roomName: string;
}

const Home = () => {
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState<CreateRoomForm>({
    gameName: "Bombparty",
    visibility: "public",
    roomName: "",
  });

  useEffect(() => {
    //send({ type: "CONNECTED" });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.roomName.trim() || !username.trim()) return;

    const message: CreateRoom = {
      type: "CREATE_ROOM",
      roomName: formData.roomName.trim(),
      gameName: formData.gameName,
      isPrivate: formData.visibility === "private",
      createdAt: Date.now(),
      hostname: username,
    };

    setFormData((prev) => ({ ...prev, roomName: "" }));
  };

  return (
    <main
      className="max-w-md mx-auto p-6 rounded-lg border border-gray-500 w-2/5 h-4/5"
      role="main"
    >
      {/* Connection state display */}

      {/* Social login buttons */}
      <AuthButtons />
      {/* Separator */}
      <div className="relative my-6" role="separator" aria-label="ou">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800 text-gray-400">Ou</span>
        </div>
      </div>

      {/* User information section */}
      <div className="space-y-4 mb-6">
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Entrez votre pseudo"
            aria-label="Pseudo"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            accept="image/*"
            aria-label="Sélectionner un avatar"
          />
          <label
            htmlFor="avatar"
            className="flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer transition-all duration-300"
            role="button"
          >
            Choisir un avatar
          </label>
        </div>
      </div>
    </main>
  );
};

export default Home;
