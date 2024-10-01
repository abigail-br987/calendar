function MonthsDisplay({ months, hoveredDay }) {
  return (
    <div>
      <h2>2024</h2>
      <div className="grid lg:grid-cols-2 md:grid-cols-1">
        {months.map((month, index) => (
          <p
            key={index}
            className={`text-black transition-all ${
              hoveredDay?.monthIndex === index ? "py-1 font-bold underline" : ""
            }`}
          >
            - {month.name}
          </p>
        ))}
      </div>
    </div>
  );
}
export default MonthsDisplay;