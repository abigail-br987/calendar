import { useReducer } from "react";
import MainPage from "./components/MainPage";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import GlobalStore, {
  defaultStore,
  storeReducer,
} from "./lib/context/GlobalStore";
// import io from "socket.io-client";
// import SocketExample from "./SocketExample";

function App() {
  const globalStore = useReducer(storeReducer, defaultStore());
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);

  // const socket = useMemo(() => io.connect("http://localhost:3006"), []);
  // const sendMessage = () => {
  //  socket.emit("send_message", { message });
  // };
  // useEffect(() => {
    
    // const handleMessageReceive = (data) => {
      // setMessageReceived((prevMessages) => [...prevMessages, data.message]);
    //};
    // socket.on("receive_message", handleMessageReceive);
    // return () => {
      // socket.off("receive_message", handleMessageReceive); };   }, [socket]);
  return (
    <GlobalStore.Provider value={globalStore}>
      <MainPage />
     {/*  <SocketExample/>*/} 
    </GlobalStore.Provider>
  );
}

export default App;
