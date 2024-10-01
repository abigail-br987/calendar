import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import io from "socket.io-client";

function SocketExample() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const socket = useMemo(() => io.connect("http://localhost:3006"), []);

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };
  
  useEffect(() => {
    const handleMessageReceive = (data) => {
      setMessageReceived((prevMessages) => [...prevMessages, data.message]);
    };
    socket.on("receive_message", handleMessageReceive);
    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [socket]);


  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <input
          placeholder="Message..."
          className="border-2 border-black"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          className="bg-gray-100 border-2 border-black"
          onClick={sendMessage}
        >
          Send Message
        </button>
        <h1>Message:</h1>
        <div className="flex flex-wrap space-x-2">
          {messageReceived.map((msg, index) => (
            <span key={index} className="bg-gray-200 p-1 rounded">
              {msg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SocketExample;
