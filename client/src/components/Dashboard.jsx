import { useState } from "react";
import DetailsPanel from "./DetailsPanel";
import TimePicker from "./TimePicker";
import GlobalStore from "../lib/context/GlobalStore";
import { useContext } from "react";
import { useMemo } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import CalendarView from "./CalendarView";
import { getMonthData } from "./CalendarView";

function Dashboard() {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [{ selectedDay, notes, userName }, updateStore] = useContext(GlobalStore);
  const months = getMonthData(2024);
  const [notesTest, setNotesTest] = useState([]);
  const socket = useMemo(() => io.connect("http://localhost:3006"), []);
  useEffect(() => {
    socket.on("receive_note", (data) => {
      const { date, noteData } = data;
      setNotesTest((prevNotes) => {
        const updatedNotes = [...prevNotes, { date, noteData }];
        return updatedNotes;
      });
    });
    return () => {
      socket.off("receive_note");
    };
  }, [socket]);

  useEffect(() => {
    updateStore({ notes: notesTest });
  }, [notesTest]);

  const handleSubmit = (selectedDay, noteData) => {
    socket.emit("send_note", { date: selectedDay, noteData });
  };

  return (
    <div className="flex h-screen">
      {selectedDay && (
        <TimePicker
          selectedDay={selectedDay}
          onClose={() => updateStore({ selectedDay: null })}
          handleSubmit={handleSubmit}
          userName={userName}
        />
      )}
      <div className="bg-white space-y-5 flex-grow-0 h-full flex-shrink-0 w-1/5 p-6 flex flex-col">
        <DetailsPanel months={months} hoveredDay={hoveredDay} notes={notes} />
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
}

export default Dashboard;
