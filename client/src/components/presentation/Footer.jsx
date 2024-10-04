import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import logo from "/timlotpng.png"

function Footer() {
    return (
      <div className="mt-20 p-4 flex flex-col items-center justify-center space-y-2 w-full">
        <img src={logo} alt="Logo" className="max-w-64 mb-4" />
        <h1>Coming Soon</h1>
        <p>
          For further inquiries, please feel free to contact me:
        </p>
        <p>
          <strong>Abigail Briones Aranda</strong>
        </p>

          <div className="flex items-center">
            <FaWhatsapp className="mr-2" />
            <p className="inline">
              WhatsApp: 
              <a href="https://wa.me/51967111332" target="_blank" className="hover:underline"> +51 967 111 332</a>
            </p>
          </div>
          <div className="flex items-center">
            <FaInstagram className="mr-2" />
            <p className="inline">
              Instagram: 
              <a href="https://www.instagram.com/abigail_br987" target="_blank"  className="hover:underline"> @abigail_br987</a>
            </p>
          </div>
          <div className="flex items-center">
            <FaLinkedin className="mr-2" />
            <p className="inline">
              Linkedin: 
              <a href="https://www.linkedin.com/in/abigail-briones-aranda-b28973293/" target="_blank"  className="hover:underline"> Abigail Briones</a>
            </p>
          </div>
      </div>
    );
  }
  
  export default Footer;
  