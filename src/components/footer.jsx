import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

export function Footer() {
    return <footer className="footer">
        <div className="followUs_footer">
            <div>
                Siguenos en:
            </div>
            <a href="https://www.instagram.com/movielecbarcelona/" className="instagram_footer">
                <FaInstagram className="icon_instagram" /><span>Instagram</span>
            </a>
        </div>
        <div className="contactUs_footer">
            <div>Contantanos por:</div>
            <span className="whatsapp_footer">
                <FaWhatsapp className="icon_Whatsapp"/>  <span>Whatsapp</span>
            </span>
        </div>

    </footer>
}