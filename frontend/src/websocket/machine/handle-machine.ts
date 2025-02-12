import { getFromLocalStorage } from "@/utils/local-storage";
import { setup } from "xstate";
import { assign } from "xstate";

export interface ModalContext {
  usernameRegister: {
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
  };
}

type ModalEvents = { type: "UPDATE_USERNAME"; value: string };
interface Context {
  username: {
    value: string;
    error?: string;
  };
}

type Events = {
  type: "UPDATE_USERNAME";
  value: string;
};

export const modalsMachine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
}).createMachine({
  id: "modalMachine",
  context: {
    username: {
      value: "",
    },
  },
  on: {
    UPDATE_USERNAME: {
      actions: assign({
        username: ({ event }) => ({
          value: event.value,
          error: event.value.length < 3 ? "Minimum 3 caractères" : undefined,
        }),
      }),
    },
  },
});