import { CiMenuBurger } from "react-icons/ci";
import { logo } from "../methods";


export function Header() {

  return (
     <header className="header">
        <div className="img_header">
        <img src={logo} alt=""  />
        </div>
        <div className="movielec_header">MOVIELEC</div>
        <div>
        <CiMenuBurger />
        </div>
     </header>
  );
}                    

