/* eslint-disable react/prop-types */
import  axios  from "axios";
import  urls  from "../../urls.json"
import { useNavigate, useLoaderData } from "react-router-dom";
import { Formulario } from "../components/Formulario";
import { axiosInstance } from "../methods";



const status =  (await axios(urls.getStatus)).data

async function  getData(id) {
    const response = await axios(urls.getOrdens + "/" + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("password")}`,
        }})
    return response.data
}
// eslint-disable-next-line react-refresh/only-export-components
export async function loader ({params}){
    const data = await getData(params.id)
    return data

}

export default function ModificateData() {

    const navigate = useNavigate();       
    
    const getData = ()=>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const data = useLoaderData()[0]
        return data;
    }

    async function updateData({data,id}){
        try{
            const axios = axiosInstance();
            const newData = await axios.put(`${urls.update}/${id}`, data)
            console.log(newData)
            navigate("/admin")
            alert("La ficha ha sido actualizada")
        }catch(error){
            if(error.response && error.response.status === 401){
                console.log("hola")
                navigate("/admin")
            }
            console.log(error)
        }
        
    }

    return <>
       <Formulario 
       {...getData()}
       fetchingData={updateData}
       status={status}
       cancelAction={()=>{navigate("/admin")}}
       />
    </>



}