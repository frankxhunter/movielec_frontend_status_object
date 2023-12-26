/* eslint-disable no-unreachable */
import axios from "axios";

export function axiosInstance(){
     const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("password")}`,
        },
    })
    return axiosInstance;
}

export function createUrl(filter, isAvanced){
    let url = "";
    if (filter.trim().length > 0) {
        url += "/" + filter;
        if (isAvanced) {
            url += "/" + isAvanced
        }
    }
    return url
}

//Funciones para conseguir la url de una imagen de drive
export function getLinkOfImagenToDrive(originalAddress){
    try{
        return {
            success: true,
            link: originalAddress
        }
        const id = extractID(originalAddress)
        const link = `https://drive.google.com/uc?export=download&id=${id}`;
        
        return {
            success: true,
            link
        }
    }catch(error){
        return{
            success: false,
            error: error.message
        }
    }
}

function extractID(originalAddress){
    const match = originalAddress.match(/\/file\/d\/([^/]+)/)
    if(!match){
        throw new Error("La url no corresponde a una imagen de drive") 
    }
    return match[1]
}

export const defaultImagen = "https://drive.google.com/uc?export=download&id=1-AGZLG9CxDVqNc-euAbCnmykGiUurN24"