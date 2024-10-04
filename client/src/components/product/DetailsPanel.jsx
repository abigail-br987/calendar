import MonthsDisplay from "./MonthsDisplay";
import DatesNotes from "./DatesNotes";
import NameForm from "./NameForm";


function DetailsPanel({ months, hoveredDay, notes, userName, calendarLink }) {
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value).then(() => {
      alert("Copied to clipboard!");
    });
  };
  
  return (
    <div className="bg-white space-y-5 h-full">
      <NameForm/>
      {calendarLink && (
        <input
          autoComplete="off"
          type="text"
          value={`Send Link: ${calendarLink}`} 
          readOnly
          className="w-full cursor-pointer opacity-40 hover:opacity-100 transition-all"
          onClick={() => copyToClipboard(calendarLink)}
        />
      )}
      <MonthsDisplay months={months} hoveredDay={hoveredDay} />
      <DatesNotes notes={notes} />
    </div>
  );
}

export default DetailsPanel;
