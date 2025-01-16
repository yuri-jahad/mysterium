import "./App.css";
import Home from "./config/Home";
import useWebSocket from "./hook/useWebSocket";

function App() {
  useWebSocket();
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
