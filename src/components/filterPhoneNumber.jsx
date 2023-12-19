import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export function FilterPhoneNumber({ changeNumber }) {
    const [phoneNumber, setPhoneNumber] = useState("");
    async function handleAction(e) {
        e.preventDefault();
        await changeNumber(phoneNumber)
        setPhoneNumber("")
    }


    return <form onSubmit={handleAction} className='filterPhoneNumber'>
            <input 
            className='input_filterPhoneNumber' 
            type="text" 
            value={phoneNumber} 
            placeholder='Numero de telefono'
            onInput={(e) => validarNumero(e)} onChange={(e) => { setPhoneNumber(e.target.value) }}/>
            <button className='button_filterPhoneNumber' type="submit"><FontAwesomeIcon icon={faSearch} className='icon_filterPhoneNumber'/></button>
        </form>
        

}

function validarNumero(input) {
    // Eliminar caracteres no numéricos usando una expresión regular
    input.target.value = input.target.value.replace(/[^0-9]/g, '');
    if (input.target.value.length > 9) {
        input.target.value = input.target.value.substring(0, 9)
    }
}


