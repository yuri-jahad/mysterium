import React, { useState } from "react";
import useWebSocket from "@/hook/useWebSocket";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const { sendMessage } = useWebSocket();

  const handleCreateRoom = () => {
    sendMessage({
      type: "CREATE_ROOM",
      roomName: "CHEZ MOMOY",
      hostname: "Mohamed",
      maxPlayers: 5,
    });
  };

  return (
    <div>
      <button onClick={handleCreateRoom} type="button">
        Créer ROOM
      </button>
    </div>
  );
};

export default Home;
