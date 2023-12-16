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