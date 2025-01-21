import { useEffect, useRef, useState } from "react";
import type { SocketEvents } from "@/websocket/types/websocket";

export default function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const [rooms, setRooms] = useState(null)
  const SERVER_URL = import.meta.env.VITE_LOCAL_SERVER || "ws://localhost:3000";

  useEffect(() => {
    // Création de la connexion
    socketRef.current = new WebSocket(SERVER_URL);

    // Gestionnaires d'événements
    socketRef.current.addEventListener("open", () => {
      console.log("WebSocket connecté !");
      setIsConnected(true);
    });

    socketRef.current.addEventListener("message", (event) => {
       if (event.data) {
        const data = JSON.parse(event.data); 
        if (data.type === "BROADCAST_ROOMS") {
          setRooms(data)
        }
       }
    });

    socketRef.current.addEventListener("close", () => {
      console.log("WebSocket déconnecté");
      setIsConnected(false);
    });

    socketRef.current.addEventListener("error", (error) => {
      console.error("Erreur WebSocket:", error);
      setIsConnected(false);
    });

    // Nettoyage à la destruction du composant
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // Fonction pour envoyer des messages
  const sendMessage = (message: SocketEvents): void => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return {
    socket: socketRef.current,
    isConnected,
    sendMessage,
    rooms
  };
}
