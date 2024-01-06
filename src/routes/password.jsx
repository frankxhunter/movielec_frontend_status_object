import { useState } from "react";
import { axiosInstance } from "../methods";
import urls from "../../urls.json"
import { useNavigate } from "react-router-dom";

function setPasswordInLocalStorage(password) {
    localStorage.setItem("password", password)
}
// eslint-disable-next-line react/prop-types
export function Password() {
    const [password, setPassword] = useState(localStorage.getItem("password"));
    const [message, setMessage]= useState("");
    const navigate = useNavigate()

    async function handleClick(e) { 
        e.preventDefault()
        setMessage("")
        
        try{
            setPasswordInLocalStorage(password)
            setPassword("")
            const result = await axiosInstance().get(urls.getAllAdmin + "/12345")
            console.log(result.data)
            navigate("/admin")


        }catch(error){
            if (error.response && error.response.status === 401) {
                setMessage("Contraseña de administrador invalida, intente nuevamente")
            }
            console.log(error)
        }

    }

    return <div className="container_password">
        <div className="message_password">Introduzca su clave de administrador</div>
        <form onSubmit={handleClick} className="form_password">
            <input className="input_password" type="text" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="accept_password" type="submit" >Aceptar</button>
        </form>
        {message ? <div className="errorMessage_password">{message}</div> : ""}
    </div>
}