import React, { useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import machine from "@/machine/gameMachine";
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
  const [state, send] = useMachine(machine);
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState<CreateRoomForm>({
    gameName: "Bombparty",
    visibility: "public",
    roomName: "",
  });

  useEffect(() => {
    console.log("cc");
    send({ type: "CONNECTED" });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.roomName.trim() || !username.trim()) return;

    send({
      type: "CREATE_ROOM",
      roomName: formData.roomName.trim(),
      gameName: formData.gameName,
      isPrivate: formData.visibility === "private",
    });

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
      {state.value === "connecting" && (
        <div className="bg-yellow-500/10 text-yellow-500 p-3 rounded-lg mb-4">
          Connexion en cours...
        </div>
      )}

      {state.value === "disconnected" && state.context.error && (
        <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4">
          {state.context.error}
        </div>
      )}

      <div className="mb-8 space-y-4">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          {state.matches("connected") ? "Créer une partie" : "Connexion"}
        </h1>

        <div className="rooms">
          {state.matches("connected") && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Rooms disponibles
              </h2>
              {state.context.rooms.length === 0 ? (
                <p className="text-gray-400">Aucune room disponible</p>
              ) : (
                <ul className="space-y-2">
                  {state.context.rooms.map((room, index) => (
                    <li
                      key={index}
                      className="p-3 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                    >
                      {room}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Social login buttons */}
        <AuthButtons/>
        {/* Separator */}
        <div className="relative my-6" role="separator" aria-label="ou">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">Ou</span>
          </div>
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

      {/* Room creation form */}
      {state.matches("connected") && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-label="Création de room"
        >
          <div>
            <label
              htmlFor="gameSelect"
              className="block text-sm font-medium text-gray-300 mb-2"
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
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Type de jeu"
            >
              <option value="Bombparty">Bombparty</option>
              <option value="Popsauce">Popsauce</option>
            </select>
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-gray-300 mb-2">
              Visibilité
            </legend>
            <div className="flex gap-6" role="radiogroup">
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
                  className="mr-2 text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600"
                  aria-label="Room publique"
                />
                <label htmlFor="public" className="text-gray-300">
                  Public
                </label>
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
                  className="mr-2 text-blue-500 focus:ring-blue-500 bg-gray-700 border-gray-600"
                  aria-label="Room privée"
                />
                <label htmlFor="private" className="text-gray-300">
                  Privé
                </label>
              </div>
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="roomName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
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
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            disabled={!formData.roomName.trim() || !username.trim()}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 font-medium"
            aria-disabled={!formData.roomName.trim() || !username.trim()}
          >
            Créer ROOM
          </button>
        </form>
      )}
    </main>
  );
};

export default Home;
