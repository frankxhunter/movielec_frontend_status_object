import { Outlet } from "react-router-dom"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
export function MainView(){
    return <>
    <Header></Header>
    <div className="main">
        <Outlet ></Outlet>
    </div>
    <Footer></Footer>
    </> 
}