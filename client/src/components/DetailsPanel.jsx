import NameForm from "./NameForm";
import MonthsDisplay from "./MonthsDisplay";
import DatesNotes from "./DatesNotes";

function DetailsPanel({ months, hoveredDay, notes }) {
  return (
    <div className="bg-white space-y-5 h-full">
      <NameForm />
      <MonthsDisplay months={months} hoveredDay={hoveredDay} />
      <DatesNotes notes={notes} />
    </div>
  );
}

export default DetailsPanel;
