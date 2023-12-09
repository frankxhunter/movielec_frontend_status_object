
export function validateData(object){
    const result = {data: object};
    if(!object){
        result["error"] = "The object is null"
        
    }
    else if(!object.orden || typeof object.orden !=="number" || object.orden < 0 || object.orden > 10000 ){
        result["error"] = "La orden esta fuera del rango aceptable";
    }
    else if(!object.cliente || typeof object.cliente !=="string"|| object.cliente.length !== 0 || object.cliente.length > 20 ){
        result["error"] = "El nombre del cliente no es valido "
    }
    else if(!object.numeroTelefonico || typeof object.numeroTelefonico !=="string" || !onlyNumbers(object.numeroTelefonico) || object.numeroTelefonico.length < 0 || object.numeroTelefonico.length > 15 ){
        result["error"] = "La orden esta fuera del rango aceptable"
    }else if(!object.cliente || typeof object.cliente !=="string" || object.cliente.length == 0 || object.cliente.length > 20 ){
        result["error"] = "La orden esta fuera del rango aceptable"
    }else if(!object.cliente || typeof object.cliente !=="string" || object.cliente.length == 0 || object.cliente.length > 20 ){
        result["error"] = "La orden esta fuera del rango aceptable"
    }else if(!object.cliente || typeof object.cliente !=="string" || object.cliente.length == 0 || object.cliente.length > 20 ){
        result["error"] = "La orden esta fuera del rango aceptable"
    }
    return result
}

function onlyNumbers(str) {
    return /^\d+$/.test(str);
}