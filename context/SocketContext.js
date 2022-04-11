import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000/messages");
const Context = createContext({ socket });
function SocketContext({ children }) {
  return <Context.Provider value={socket}>{children}</Context.Provider>;
}
export const useSocket = () => useContext(Context);
export default SocketContext;