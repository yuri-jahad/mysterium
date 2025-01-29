import React, { useEffect, useState } from "react";
import useWebSocket from "@/websocket/machine/useWebSocket";
import { Github } from "lucide-react";
import { useMachine, createActorContext } from "@xstate/react";
import machine from "@/machine/gameMachine";
import type { CreateRoom } from "@/websocket/types/websocket";

// Icons components
const DiscordIcon = () => (
  <svg
    viewBox="0 -28.5 256 256"
    className="w-6 h-6"
    fill="currentColor"
    aria-hidden="true"
    role="img"
  >
    <title>Discord</title>
    <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 246.021633,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true" role="img">
    <title>Google</title>
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

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
        <div
          className="grid grid-cols-3 gap-4"
          role="group"
          aria-label="Options de connexion sociale"
        >
          <button
            className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300"
            aria-label="Se connecter avec Github"
          >
            <Github className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            className="flex items-center justify-center p-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all duration-300"
            aria-label="Se connecter avec Google"
          >
            <GoogleIcon />
          </button>
          <button
            className="flex items-center justify-center p-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-all duration-300"
            aria-label="Se connecter avec Discord"
          >
            <DiscordIcon />
          </button>
        </div>

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
