import { useState } from "react";

function setPasswordInLocalStorage(password) {
    localStorage.setItem("password", password)
}
// eslint-disable-next-line react/prop-types
export function Password({ message, update }) {
    const [password, setPassword] = useState(localStorage.getItem("password"));

    function handleClick(e) {
        e.preventDefault()
        setPasswordInLocalStorage(password)
        update()
        setPassword("")

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