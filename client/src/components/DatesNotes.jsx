function DatesNotes({ notes }) {
  // Group notes by user and date
  const groupNotesByUserAndDate = (notes) => {
    return notes.reduce((acc, note) => {
      const user = note.noteData.userName || "Unknown User"; // Access userName from noteData
      const date = note.date; // Access the date from the note

      // Initialize user in accumulator if not present
      if (!acc[user]) {
        acc[user] = {};
      }

      // Initialize date in user's notes if not present
      if (!acc[user][date]) {
        acc[user][date] = [];
      }

      // Push noteData for this user and date
      acc[user][date].push(note.noteData);
      return acc;
    }, {});
  };

  const groupedNotes =
    Array.isArray(notes) && notes.length > 0
      ? groupNotesByUserAndDate(notes)
      : {};

  return (
    <div>
      {notes && (
        <>
          <div className="bg-white p-5 border-2 border-black">
            {Object.keys(groupedNotes).length > 0 ? (
              Object.entries(groupedNotes).map(([user, userNotes]) => (
                <>
                  <h2>{user}</h2>
                  <div key={user} className="pl-2">
                    {Object.entries(userNotes).map(([date, userDateNotes]) => (
                      <div key={date}>
                        <h3 className="inline">{date}: </h3>
                        {userDateNotes.map((noteData, index) => (
                          <span key={index}>
                            {`(${noteData.start}) - (${noteData.end})`}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              ))
            ) : (
              <div>Choose something</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default DatesNotes;
