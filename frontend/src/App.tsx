import "@/assets/styles/index.css";
import Home from "@/pages/Home";
import { globalMachine } from "@/websocket/machine/global-machine";
import { useActor } from "@xstate/react";
import { useEffect } from "react";

const App = () => {
  const [state, send] = useActor(globalMachine);

  useEffect(() => {
   
    console.log(location.pathname);

    if (location.pathname === "/auth/callback") {
      console.log("coucou")
      send({ type:"START_AUTH"});
       console.log({ state, send });
    }
  }, [location.pathname]);

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
