import { useState } from "react";

const TimeSlot = ({ isSelected, onMouseDown, onMouseEnter, isFullHour }) => {
  return (
    <div
      className={`cursor-pointer h-2
         ${
           isFullHour ? "border-t-2 border-black" : "border-t-2 border-gray-300"
         } 
         ${isSelected ? "bg-blue-200" : "hover:bg-gray-200"}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      <div></div>
    </div>
  );
};

const TimeBlock = ({ start, end, times }) => {
  const startTime = times[start];
  const endTime = times[end];
  const blockHeight = (end - start + 1) * 0.5;

  if (blockHeight <= 1) {
    return null;
  }

  return (
    <div
      className="absolute bg-primary-light border-2 border-black w-full"
      style={{
        top: `${start * 0.5}rem`,
        height: `${blockHeight}rem`,
      }}
    >
      <p className="text-sm p-2">{`${startTime} → ${endTime}`}</p>
    </div>
  );
};

const times = [];

const DayCalendar = ({
  selectedRange,
  setSelectedRange,
  isDragging,
  setIsDragging,
}) => {
  for (let hour = 6; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedTime = `${hour % 12 || 12}:${
        minute === 0 ? "00" : minute
      } ${hour < 12 ? "AM" : "PM"}`;
      times.push(formattedTime);
    }
  }
  const handleMouseDown = (index) => {
    setSelectedRange({ start: index, end: index });
    setIsDragging(true);
  };

  const handleMouseEnter = (index) => {
    if (isDragging) {
      setSelectedRange((prev) => ({ ...prev, end: index }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative flex border border-gray-300 select-none"
      onMouseUp={handleMouseUp}
    >
      <div className="w-24 flex flex-col border-gray-300 ">
        {Array.from({ length: 18 }, (_, hour) => (
          <div
            key={hour}
            className="text-right text-sm [margin-top:3px] [margin-bottom:9px] mr-3"
          >
            {hour + 6}:00{hour + 6 < 12 ? "AM" : "PM"}
          </div>
        ))}
      </div>

      <div className="flex-1 relative mt-3">
        {times.map((_, index) => {
          const isSelected =
            selectedRange.start !== null &&
            selectedRange.end !== null &&
            index >= selectedRange.start &&
            index <= selectedRange.end;
          const isFullHour = index % 4 === 0;
          return (
            <TimeSlot
              key={index}
              isSelected={isSelected}
              onMouseDown={() => handleMouseDown(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              isFullHour={isFullHour}
            />
          );
        })}
        {selectedRange.start !== null && selectedRange.end !== null && (
          <TimeBlock
            start={selectedRange.start}
            end={selectedRange.end}
            times={times}
          />
        )}
      </div>
    </div>
  );
};

function TimePicker({ selectedDay, onClose, handleSubmit, userName }) {

  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });

  const [isDragging, setIsDragging] = useState(false);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!userName) {
      alert("Your name!");
      onClose()
      return;
    }
    const noteData = {
      start: times[selectedRange.start],
      end: times[selectedRange.end],
      userName,
    };
    handleSubmit(selectedDay, noteData);
    setSelectedRange({ start: null, end: null });
    onClose();
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center transition-all z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Selected Day: {selectedDay}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <form onSubmit={(e) => handleFormSubmit(e)} className="mt-2">
          <div className="h-96 overflow-auto">
            <DayCalendar
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
            />
          </div>
          <button
            type="submit"
            className="border-2 border-black bg-primary-light p-2 rounded w-full"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default TimePicker;
