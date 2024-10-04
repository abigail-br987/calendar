import Landing from "./presentation/Landing";
import Benefits from "./presentation/Benefits";
import Navbar from "./presentation/NavBar";
import FAQ from "./presentation/FAQ";
import CalendarView from "./product/CalendarView";
import { getMonthData } from "./product/CalendarView";
import Footer from "./presentation/Footer";
const months = getMonthData(2024);

function LandingPage() {
  return (
    <>
      <Navbar />

      <div className="w-full flex flex-col items-center px-5 py-0">
        <div className="w-5/6 absolute -z-10 h-4/5 overflow-y-hidden ">
          <CalendarView months={months} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-100" />
        </div>
        <div className="max-w-4xl pb-20">

          <div id="landing">
            <Landing />
          </div>

          <div id="benefits">
            <Benefits />
          </div>

          <div id="faq">
            <FAQ />
          </div>

          <div id="waitlist">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
