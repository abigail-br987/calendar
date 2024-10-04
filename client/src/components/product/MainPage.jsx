import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { io } from "socket.io-client";
import NameForm from "./NameForm";
import GlobalStore from "../../lib/context/GlobalStore";
import { useContext } from "react";
import logo from "/timlotpng.png"

function MainPage() {
  const [{userName}, updateStore] = useContext(GlobalStore)
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const socket = useMemo(() => io.connect("http://localhost:3006"), []);

  const createCalendar = () => {
    if (!userName) {
      alert("Please enter your name!");
    } else {
    socket.emit("createCalendar", { userId: userName });
    socket.on("calendarCreated", ({ roomId, url }) => {
      updateStore({link:url});
      console.log("url:", url);
      navigate(`/calendar/${roomId}`);
    })};
  };

  const joinCalendar = () => {
    if (!userName) {
      alert("Please enter your name!");
    } else {
    if (roomId) {
      navigate(`/calendar/${roomId}`);
    }
  }};

  return (
    <>
      <div className="w-screen h-screen bg-primary flex justify-center items-center">
        <div className="max-w-3xl items-center flex flex-col bg-white p-5 border-2 border-black space-y-3">
          <img className="max-w-32 mb-3" src={logo} />
          <NameForm/>
          <h2>Create!</h2>
          <button onClick={createCalendar}>Create Link</button>
          <h2>Join!</h2>
          <div className="flex w-full space-x-3">
            <input
              autoComplete="off"
              type="text"
              placeholder="Enter Room ID"
              className="w-full"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button onClick={joinCalendar}>Join</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
