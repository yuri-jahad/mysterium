import { useEffect } from "react";
import { useActor } from "@xstate/react";
import { globalMachine } from "@/websocket/machine/global-actor";



const OauthProviders = () => {
  const [state, send] = useActor(globalMachine);
  
  useEffect(() => {
    // Détecter la présence du code et laisser la machine gérer le reste
    const params = new URLSearchParams(location.search);
    if (params.has('code')) {
      send({ type: "" });
    }
  }, [location.search]);
};


export default OauthProviders;
