import type { Services } from "@/websocket/machine/socket-machine";
import { globalMachine } from "@/websocket/machine/global-machine";
import { useActor } from "@xstate/react";
import { css } from "styled-system/css";
import { Avatar } from "@/components/ui/avatar";
import { DialogFull } from "@/shared/dialog";

const Home = () => {
  const [state, send] = useActor(globalMachine);
  return (
    <>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6",
          w: "full",
          mt: "6",
        })}
      >
        <div>{state.context.auth.username}</div>
        <Avatar src={state.context.auth.avatar || ""} />
      </div>
      <DialogFull />
    </>
  );
};

export default Home;
