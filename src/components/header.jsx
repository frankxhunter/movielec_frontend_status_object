import { faHamburger, faHelmetUn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function Header() {

  return (
     <header className="header">
        <div className="img_header">
        <img src="src\assets\logoMovielec.png" alt="" />
        </div>
        <div className="movielec_header">MOVIELEC</div>
        <div>
         <FontAwesomeIcon icon={faHamburger}/>
        </div>
     </header>
  );
}

