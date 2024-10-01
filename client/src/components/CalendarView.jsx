export const getMonthData = (year) => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      months.push({
        name: date.toLocaleString("default", { month: "long" }),
        daysInMonth,
      });
    }
    return months;
};

function CalendarView ({ months, notes, setHoveredDay, updateStore }) {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthColors = [
      "bg-blue-100",
      "bg-green-100",
      "bg-red-100",
      "bg-yellow-100",
      "bg-purple-100",
      "bg-pink-100",
      "bg-indigo-100",
      "bg-gray-100",
      "bg-teal-100",
      "bg-orange-100",
      "bg-rose-100",
      "bg-sky-100",
    ];
  
    const renderDays = () => {
        const days = [];
    
        months.forEach((month, monthIndex) => {
          for (let day = 1; day <= month.daysInMonth; day++) {
            const key = `${monthIndex}-${day}`;
    
            days.push(
              <div
                key={`${month.name}-${day}`}
                onMouseEnter={() => setHoveredDay({ monthIndex, day })}
                onMouseLeave={() => setHoveredDay(null)} 
                    onClick={() => updateStore({ selectedDay: key })}
                className={`flex flex-col items-center justify-center border border-gray-600
                 w-full h-full ${monthColors[monthIndex]}`}
              >
                <div className="p-2 flex relative justify-between items-center w-full">
                  <div className="flex-1 text-center">
                    <p>{day}</p>
                  </div>
                  <button className="border absolute border-black bg-white px-2">
                    +
                  </button>
                </div>
                {notes[key] && (
                  <div className="w-full bg-white bg-opacity-60 border-t-2 border-black ">
                    <div className="p-2 text-xs">
                      {`${userName}: ${notes[key].start} - ${notes[key].end}`}
                    </div>
                  </div>
                )}
              </div>
            );
          }
        });
    
        const totalCells = Math.ceil(days.length / 7) * 7;
        for (let i = days.length; i < totalCells; i++) {
          days.push(
            <div
              key={`empty-${i}`}
              className="flex items-center justify-center w-full h-full border"
            />
          );
        }
    
        return days;
      };
    

    return (
        <div className="h-full w-full  overflow-auto">
          <div className="grid grid-cols-7 w-full">
            {dayNames.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="flex items-center justify-center font-bold p-1  border-2 border-black overflow-hidden"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">{renderDays()}</div>
        </div>
    )
}

export default CalendarView