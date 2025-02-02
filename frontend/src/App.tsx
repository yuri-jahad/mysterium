import "@/assets/styles/index.css";
import Home from "@/pages/Home";
import { globalMachine } from "@/websocket/machine/global-machine";
import { useActor } from "@xstate/react";
import { useEffect } from "react";

const App = () => {
  const [state, send] = useActor(globalMachine);

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (code) {
      send({ type: "AUTH.CODE_RECEIVED", code});
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
