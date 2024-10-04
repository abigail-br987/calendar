import React, { useState, useEffect } from 'react';
function convertToMinutes(time) {
  const [hour, minute] = time.split(':');
  const meridiem = time.slice(-2);
  let hoursIn24 = parseInt(hour);

  if (meridiem === "PM" && hoursIn24 !== 12) {
      hoursIn24 += 12;
  } else if (hoursIn24 === 12 && meridiem === "AM") {
      hoursIn24 = 0;
  }

  return hoursIn24 * 60 + parseInt(minute);
}

function findBestMeetingTime(schedules) {
  let days = {};

  // Group schedules by day
  schedules.forEach(schedule => {
    if (!days[schedule.selectedDay]) {
        days[schedule.selectedDay] = [];
    }
    days[schedule.selectedDay].push({
        userName: schedule.userName,
        start: convertToMinutes(schedule.start),
        end: convertToMinutes(schedule.end)
    });
  });

  let overlaps = [];

  // Compare each user's schedule on the same day
  for (let day in days) {
    let timeSlots = [];

    for (let i = 0; i < days[day].length; i++) {
      for (let j = i + 1; j < days[day].length; j++) {
        // Only consider overlaps between different users
        if (days[day][i].userName !== days[day][j].userName) {
          let startMax = Math.max(days[day][i].start, days[day][j].start);
          let endMin = Math.min(days[day][i].end, days[day][j].end);

          if (startMax < endMin) {
            timeSlots.push({
              day,
              start: startMax,
              end: endMin,
              users: [days[day][i].userName, days[day][j].userName]
            });
          }
        }
      }
    }

    // Combine time slots if they have the same start and end times
    for (let slot of timeSlots) {
      let matchingSlot = overlaps.find(
        overlap => overlap.day === slot.day && overlap.start === slot.start && overlap.end === slot.end
      );
      if (matchingSlot) {
        matchingSlot.users = [...new Set([...matchingSlot.users, ...slot.users])];
      } else {
        overlaps.push(slot);
      }
    }
  }

  // Sort by the number of users overlapping in the same time slot
  overlaps.sort((a, b) => b.users.length - a.users.length);

  function convertToTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    let meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 
    return `${hours}:${mins.toString().padStart(2, '0')} ${meridiem}`;
  }

  // Return the top 3 meeting circumstances with the most user overlap
  return overlaps.slice(0, 3).map(overlap => ({
    day: overlap.day,
    start: convertToTime(overlap.start),
    end: convertToTime(overlap.end),
    users: overlap.users
  }));
}

function DatesNotes({ notes }) {
  const [bestMeetingTimes, setBestMeetingTimes] = useState([]);
  useEffect(() => {
    if (notes && notes.length > 0) {
      const result = findBestMeetingTime(notes);
      
      setBestMeetingTimes(result);
    }
  }, [notes]);

  const groupNotesByUserAndDate = (notes) => {
    return notes.reduce((acc, note) => {
      const user = note.userName || "Unknown User";
      const date = note.selectedDay;

      if (!acc[user]) {
        acc[user] = {};
      }

      if (!acc[user][date]) {
        acc[user][date] = [];
      }

      acc[user][date].push(note);
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
          <div className="bg-white p-3 border-2 border-black">
            <h3>Top 3 Best Meeting Times</h3>
            {bestMeetingTimes.length > 0 ? (
              bestMeetingTimes.map((time, index) => (
                <p key={index}>
                  {time.day}: {time.start} - {time.end} (Users: {time.users.join(", ")})
                </p>
              ))
            ) : (
              <p>No matching time found for at least 2 users.</p>
            )}

            {Object.keys(groupedNotes).length > 0 ? (
              Object.entries(groupedNotes).map(([user, userNotes]) => (
                <div key={user}>
                  <h2>{user}</h2>
                  <div className="pl-2">
                    {Object.entries(userNotes).map(([date, userDateNotes]) => (
                      <div key={date}>
                        <h3 className="inline">{date}: </h3>
                        {userDateNotes.map((noteData, index) => (
                          <span key={index}>
                            {`(${noteData.start}) - (${noteData.end})`}
                            {index < userDateNotes.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
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