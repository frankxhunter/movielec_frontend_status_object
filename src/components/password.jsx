import { useState } from "react";

// eslint-disable-next-line react/prop-types
export function Password({value, setValue, message}){
    const [password, setPassword] = useState(value);
    return <div>
        {message ?<div>{message}</div>: ""}
        <div>Introduzca su clave de administrador</div>
        <input type="text" value={password} onChange={e=> setPassword(e.target.value)} />
        <button onClick={()=> setValue(password)} >Aceptar</button>
    </div>
}