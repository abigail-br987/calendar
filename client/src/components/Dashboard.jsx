import { useState } from "react";
import DetailsPanel from "./product/DetailsPanel";
import TimePicker from "./product/TimePicker";
import { useContext } from "react";
import { useMemo } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import CalendarView from "./product/CalendarView";
import { getMonthData } from "./product/CalendarView";
import { useParams } from "react-router-dom";
import GlobalStore from "../lib/context/GlobalStore";

const Dashboard = () => {
  const { roomId } = useParams();
  const [hoveredDay, setHoveredDay] = useState(null);
  const [{ selectedDay, notes, userName, link }, updateStore] =
    useContext(GlobalStore);
  const months = getMonthData(2024);
  const [notesTest, setNotesTest] = useState([]);

  const socket = useMemo(
    () => io("http://localhost:3006", { withCredentials: true }),
    []
  );

  useEffect(() => {
    socket.emit("joinRoom", roomId);
    console.log("Joining room:", roomId);
    socket.on("receive_note", (data) => {
      console.log("", data);
      const { noteData } = data;
      setNotesTest((prevNotes) => [...prevNotes, noteData]);
    });

    return () => {
      socket.off("receive_note");
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId, socket]);

  useEffect(() => {
    console.log(notesTest, "notes");
    updateStore({ notes: notesTest });
  }, [notesTest]);

  const handleSubmit = (noteData) => {
    socket.emit("send_note", { roomId, noteData });
  };

  return (
    <div className="flex h-screen w-screen">
      {selectedDay && (
        <TimePicker
          selectedDay={selectedDay}
          onClose={() => updateStore({ selectedDay: null })}
          handleSubmit={handleSubmit}
          userName={userName}
        />
      )}
      <div className="bg-white space-y-5 flex-grow-0 h-full flex-shrink-0 w-1/5 p-6 flex flex-col">
        <DetailsPanel
          months={months}
          hoveredDay={hoveredDay}
          notes={notes}
          userName={userName}
          calendarLink={link}
        />
      </div>
      <div className="basis-4/5 flex items-center justify-center">
        <CalendarView
          months={months}
          notes={notes}
          setHoveredDay={setHoveredDay}
          updateStore={updateStore}
        />
      </div>
    </div>
  );
};

export default Dashboard;
