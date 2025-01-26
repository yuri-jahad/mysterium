import "@/assets/styles/index.css";
import Home from "@/pages/Home";
import useWebSocket from "@/websocket/machine/useWebSocket";
import useAuthRegister from "@/auth/hooks/useAuthRegister";

function App() {
  useWebSocket();
  //useAuthRegister();
  return (
    <div className="bg-gray-800 h-[100vh] flex items-center justify-center">
      <Home />
    </div>
  );
}

export default App;
