import '@/assets/styles/App.css'
import Home from '@/pages/Home';
import useWebSocket from "@/websocket/hooks/useWebSocket";

function App() {
  useWebSocket();
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
