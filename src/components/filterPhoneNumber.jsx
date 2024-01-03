import { FaSearch } from "react-icons/fa";

import { useState } from "react";

// eslint-disable-next-line react/prop-types
export function Filter({ changeNumber, onlyNumber }) {
    const [filter, setFilter] = useState("");
    async function handleAction(e) {
        e.preventDefault();
        await changeNumber(filter)
        setFilter("")
    }
    function validarNumero(input) {
        // Eliminar caracteres no numéricos usando una expresión regular
        if(!onlyNumber){
            return 
        }
        input.target.value = input.target.value.replace(/[^0-9]/g, '');
        if (input.target.value.length > 9) {
            input.target.value = input.target.value.substring(0, 9)
        }
    }


    return <form onSubmit={handleAction} className='filter'>
            <input 
            className='input_filter' 
            type="text" 
            value={filter} 
            placeholder='Numero de telefono'
            onInput={(e) => validarNumero(e)} onChange={(e) => { setFilter(e.target.value) }}/>
            <button className='button_filter' type="submit"><FaSearch className='icon_filter'/></button>
        </form>
        

}




