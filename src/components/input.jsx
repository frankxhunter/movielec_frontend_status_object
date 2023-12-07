import { useState } from "react";

// eslint-disable-next-line react/prop-types
export function InputNumber({ changeNumber}) {
    const [number, setNumber] = useState("");
    async function action (){
        await changeNumber(number)
        setNumber("")
    }
    return <>
        <input type="text" placeholder="Numero de telefono" value={number} onInput={ (e)=>validarNumero(e)} onChange={(e)=>{setNumber(e.target.value)}} />
        <button onClick={()=>{action()}} >Buscar</button>
    </>
}

function validarNumero(input) {
    // Eliminar caracteres no numéricos usando una expresión regular
    input.target.value = input.target.value.replace(/[^0-9]/g, '');
    if (input.target.value.length > 9) {
        input.target.value = input.target.value.substring(0, 9)
    }
}


