import { FaArrowDown } from "react-icons/fa";

function Landing() {
  return (
      <div className="z-10 h-screen flex justify-center items-end text-center" id="home">
        <div className="flex flex-col justify-center items-center mb-3">
          <h1 className="text-6xl">Meet Smart, Not Hard</h1>
          <h3>
            Are you tired of endless back-and-forth messages just to find the
            right time for a meeting? With timLOT, scheduling becomes easy,
            allowing you to focus on what truly matters.
          </h3>
          <FaArrowDown className="animate-bounce mb-3 mt-20 text-3xl"/>
        </div>
      </div>
  );
}

export default Landing;
