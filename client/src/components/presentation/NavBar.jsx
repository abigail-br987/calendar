import { Link } from "react-scroll";
import logo2 from "/timlotpng.png";

const navItems = [
  { name: "Benefits", to: "benefits" },
  { name: "FAQ", to: "faq" },
  { name: "Contact", to: "contact" },
];

function Navbar() {
  return (
    <nav className="p-2 fixed w-full top-0 z-10">
      <ul className="items-start flex justify-between">
        <Link
          activeClass="active"
          offset={-70}
          smooth
          spy
          to={"home"}
          duration={500}
        >
          <div className="max-w-16 cursor-pointer">
            <img src={logo2} alt="Home Logo" className="h-full" />
          </div>
        </Link>

        <div className="flex md:space-x-4">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="flex md:hover:px-5 font-bold uppercase transition-all backdrop-blur-3xl cursor-pointer bg-primary  border-2 border-black px-3 py-1"
            >
              <Link
                activeClass="active"
                offset={-70}
                smooth
                spy
                to={item.to}
                duration={500}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
