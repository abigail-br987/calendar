import { useState } from "react";
import GlobalStore from "../../lib/context/GlobalStore";
import { useContext } from "react";

function NameForm() {
  const [newUserName, setUserName] = useState("");
  const [{ userName }, updateStore] = useContext(GlobalStore);
  const handleSubmit = () => {
    if (!userName) {
      updateStore({ userName: newUserName });
    }
  };
  return (
    <div className="flex flex-col items-center w-full">
      {!userName ? (
        <div className="lg:flex lg:flex-grow w-full space-x-3">
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={newUserName}
            autoComplete="off"
            className="flex-grow w-full"
            placeholder="..."
            disabled={Boolean(userName)}
          />
          <button className="flex-shrink-0" onClick={handleSubmit}>
            Send Name
          </button>
        </div>
      ) : (
        <h3>Welcome, {userName}!</h3>
      )}
    </div>
  );
}

export default NameForm;
