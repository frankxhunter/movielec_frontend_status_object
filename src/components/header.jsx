import { CiMenuBurger } from "react-icons/ci";


export function Header() {

  return (
     <header className="header">
        <div className="img_header">
        <img src="src\assets\logoMovielec.png" alt="" />
        </div>
        <div className="movielec_header">MOVIELEC</div>
        <div>
        <CiMenuBurger />
        </div>
     </header>
  );
}

