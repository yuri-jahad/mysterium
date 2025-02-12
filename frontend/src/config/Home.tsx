

import { Demo } from "@/components/ui/dialog";
import { DialogFull } from "@/shared/dialog";
import React, { useState } from "react";

type GameType = "Bombparty" | "Popsauce";
type RoomVisibility = "public" | "private";

interface CreateRoomForm {
  gameName: GameType;
  visibility: RoomVisibility;
  roomName: string;
}

interface CreateRoomMessage {
  type: "CREATE_ROOM";
  roomName: string;
  gameName: GameType;
  isPrivate: boolean;
  hostname: string;
}

const Home = () => {
  const [formData, setFormData] = useState<CreateRoomForm>({
    gameName: "Bombparty",
    visibility: "public",
    roomName: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.roomName.trim()) return;

    const message: CreateRoomMessage = {
      type: "CREATE_ROOM",
      roomName: formData.roomName.trim(),
      gameName: formData.gameName,
      isPrivate: formData.visibility === "private",
      hostname: "Mohamed",
    };

    console.log({DialogFull})
    //sendMessage(message);

    // Reset form
    setFormData((prev) => ({
      ...prev,
      roomName: "",
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <DialogFull/>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="gameSelect"
              className="block text-sm font-medium mb-1"
            >
              Sélectionner un jeu
            </label>
            <select
              id="gameSelect"
              value={formData.gameName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  gameName: e.target.value as GameType,
                }))
              }
              className="w-full p-2 border rounded"
            >
              <option value="Bombparty">Bombparty</option>
              <option value="Popsauce">Popsauce</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="public"
              name="visibility"
              value="public"
              checked={formData.visibility === "public"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  visibility: e.target.value as RoomVisibility,
                }))
              }
              className="mr-2"
            />
            <label htmlFor="public">Public</label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="private"
              name="visibility"
              value="private"
              checked={formData.visibility === "private"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  visibility: e.target.value as RoomVisibility,
                }))
              }
              className="mr-2"
            />
            <label htmlFor="private">Privé</label>
          </div>
        </div>

        <div>
          <label htmlFor="roomName" className="block text-sm font-medium mb-1">
            Nom de la room
          </label>
          <input
            id="roomName"
            type="text"
            value={formData.roomName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                roomName: e.target.value,
              }))
            }
            placeholder="Taper le nom de votre room"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!formData.roomName.trim()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded
                     hover:bg-blue-600 disabled:bg-gray-400"
        >
          Créer ROOM
        </button>
      </form>
    </div>
  );
};

export default Home;
