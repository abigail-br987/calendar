import { useContext } from "react";
import GlobalStore from "../lib/context/GlobalStore";
import { useState } from "react";

function NameForm() {
    const [userName, setUserName] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [{}, updateStore] = useContext(GlobalStore);
  
    const handleInputChange = (e) => setUserName(e.target.value);
  
    const handleSubmit = () => {
      if (!isSubmitted) {
        updateStore({ userName });
        setIsSubmitted(true);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          onChange={handleInputChange}
          value={userName}
          placeholder="Enter your name..."
          className="mt-4 p-2 border-2 w-full border-black"
          disabled={isSubmitted}
        />
        {!isSubmitted && (
          <button
            onClick={handleSubmit}
            className="mt-2 p-2 bg-primary border-2 w-full border-black"
          >
            Send Name
          </button>
        )}
      </div>
    );
  }
  
  export default NameForm;
  