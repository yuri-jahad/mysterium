import type { Services } from "@/websocket/machine/socket-machine";
import {
  GithubIcon,
  GoogleIcon,
  DiscordIcon,
} from "@/auth/components/providers-icons";
import { globalMachine } from "@/websocket/machine/global-machine";
import { useActor } from "@xstate/react";

// Components/AuthButtons.tsx
const AuthButtons = () => {
  const [state, send] = useActor(globalMachine);

  const handleAuth = (service: Services) => {
    send({ type: "AUTH.SERVICE", service });
  };

  return (
    <div
      className="grid grid-cols-3 gap-4"
      role="group"
      aria-label="Options de connexion sociale"
    >
      <button
        className="flex items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300"
        aria-label="Se connecter avec Github"
        onClick={() => handleAuth("github")}
      >
        <GithubIcon />
      </button>
      
      <button
        className="flex items-center justify-center p-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all duration-300"
        aria-label="Se connecter avec Google"
        onClick={() => handleAuth("google")}
      >
        <GoogleIcon />
      </button>
      <button
        className="flex items-center justify-center p-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-all duration-300"
        aria-label="Se connecter avec Discord"
        onClick={() => handleAuth("discord")}
      >
        <DiscordIcon />
      </button>
    </div>
  );
};

export default AuthButtons;