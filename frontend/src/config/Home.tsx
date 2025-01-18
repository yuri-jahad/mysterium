import React, { useRef, useState } from "react";
import useWebSocket from "@/hook/useWebSocket";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const { sendMessage } = useWebSocket();
  const inputCreateRoomRef = useRef<HTMLInputElement>(null);

  const handleCreateRoom = () => {
    const input = inputCreateRoomRef.current;
    if (!input) return;

    sendMessage({
      type: "CREATE_ROOM",
      roomName: input.value,
      flag: "fr",
      hostname: "Mohamed",
      maxPlayers: 5,
    });
  };

  return (
    <div>
      <select title="choice game" name="Mysterium" id="Mysterium">
        <option value="Bombparty">Bombparty</option>
        <option value="Popsauce">Popsauce</option>
      </select>
      <button onClick={handleCreateRoom} type="button">
        Créer ROOM
      </button>
      <input ref={inputCreateRoomRef} type="search" placeholder="Taper le nom de votre room" />
    </div>
  );
};

export default Home;
