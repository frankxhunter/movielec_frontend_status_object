import { Outlet } from "react-router-dom"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
export function MainView(){
    return <>
    <Header></Header>
    <div>
        <Outlet></Outlet>
    </div>
    <Footer></Footer>
    </> 
}