import { useState } from "react";

function setPasswordInLocalStorage(password) {
    localStorage.setItem("password", password)
}
// eslint-disable-next-line react/prop-types
export function Password({ message, update }) {
    const [password, setPassword] = useState(localStorage.getItem("password"));

    function handleClick() {
        setPasswordInLocalStorage(password)
        console.log("password update")
        update()
    }

    return <div>
        {message ? <div>{message}</div> : ""}
        <div>Introduzca su clave de administrador</div>
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleClick} >Aceptar</button>
    </div>
}