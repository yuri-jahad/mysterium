// machines/roomMachine.ts
import { createMachine } from "xstate";

const gameMachine = createMachine({
  id: "mysterium",
  context: {
    auth: {
      username: null,
      token: null,
      service: null,
    },
    rooms: [],
  },
  states: {
    
  }
});
