import { useMemo } from 'react';

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

function CalendarView({ months, notes, setHoveredDay, updateStore }) {
  const days = useMemo(() => {
    const result = [];

    months.forEach((month, monthIndex) => {
      for (let day = 1; day <= month.daysInMonth; day++) {
        const cellContent = (
          <div className={`flex flex-col items-center justify-center border border-gray-600
            w-full h-full ${monthColors[monthIndex] || ''}`}>
            <div className="p-2 flex relative justify-between items-center w-full">
              <div className="flex-1 text-center">
                <p>{day}</p>
              </div>
              <button className="border absolute border-black bg-white py-0 px-1.5">
                +
              </button>
            </div>
          </div>
        );

        if (notes || setHoveredDay || updateStore) {
          result.push(
            <div
              key={`${month.name}-${day}`}
              onMouseEnter={() => setHoveredDay({ monthIndex, day })}
              onMouseLeave={() => setHoveredDay(null)}
              onClick={() => updateStore({ selectedDay: `${monthIndex + 1}-${day}` })}
            >
              {cellContent}
            </div>
          );
        } else {
          result.push(
            <div key={`${month.name}-${day}`}>
              {cellContent}
            </div>
          );
        }
      }
    });

    const totalCells = Math.ceil(result.length / 7) * 7;
    for (let i = result.length; i < totalCells; i++) {
      result.push(
        <div
          key={`empty-${i}`}
          className="flex items-center justify-center w-full h-full border"
        />
      );
    }

    return result;
  }, [months, notes, setHoveredDay]);

  return (
    <div className={`h-full w-full ${notes || setHoveredDay ? 'overflow-auto' : 'overflow-hidden'}`}>
      <div className="grid grid-cols-7 w-full">
        {dayNames.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="flex items-center justify-center font-bold p-1 border-2 border-black overflow-hidden"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">{days}</div>
    </div>
  );
}

export default CalendarView;
