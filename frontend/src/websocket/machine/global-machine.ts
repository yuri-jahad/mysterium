import socketMachine from "@/websocket/machine/socket-machine";
import { modalsMachine } from "@/websocket/machine/handle-machine";

export const globalMachine = socketMachine;
export const modalMachine = modalsMachine;
