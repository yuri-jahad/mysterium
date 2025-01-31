import "@/assets/styles/index.css";
import Home from "@/pages/Home";
import { globalMachine } from "@/websocket/machine/global-machine";
import { useActor } from "@xstate/react";

const App = () => {
  const [state, send] = useActor(globalMachine);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("code")) {
      send({ type: "" });
    }
  }, [location.search]);
  return (
    <>
      {/* Debug des données utilisateur */}
      {state.context.auth && (
        <div>
          <pre>{JSON.stringify(state.context.auth, null, 2)}</pre>
        </div>
      )}
      <Home />
    </>
  );
};
export default App;
