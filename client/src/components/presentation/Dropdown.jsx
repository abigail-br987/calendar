import { useState } from "react";

const Dropdown = ({ question, answer, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div {...props}>
            <div onClick={toggleDropdown} className="cursor-pointer">
                {question}
            </div>
            {isOpen && <p> {answer} </p>}
        </div>
    );
};

export default Dropdown;
