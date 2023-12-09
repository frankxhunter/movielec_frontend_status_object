/* eslint-disable react/prop-types */
import  axios  from "axios";
import { useState } from "react";
import  urls  from "../../urls.json"
import { useNavigate, useLoaderData } from "react-router-dom";

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("password")}`,
    },
});

const status =  (await axiosInstance(urls.getStatus)).data

async function  getData(id) {
    const response = await axiosInstance(urls.getOrdens + "/" + id)
    return response.data
}
// eslint-disable-next-line react-refresh/only-export-components
export async function loader ({params}){
    const data = await getData(params.id)
    return data

}

export default function ModificateData() {
   const [data, setData] = useState(useLoaderData()[0])
    const navigate = useNavigate();       
    function modificateData(prop, value){
        const newData = {...data}
        newData[prop] = value;
        setData(newData)
    }

    async function updateData(){
        try{
            const newData = await axiosInstance.put(`${urls.update}/${data.id}`, data)
            console.log(newData)
            navigate("/admin")
            alert("La ficha ha sido actualizada")
        }catch(error){
            if(error.response && error.response.status === 401){
                console.log("hola")
                navigate("/admin")
            }
            console.log(error.response.data)
        }
        
    }

    return <div>
        <input type="number" placeholder="Numero de orden" value={Number(data.orden)} onChange={(e)=> modificateData("orden",Number(e.target.value) )} />
        <select placeholder="" name="Status" id="1" value={data.estado} onChange={(e)=> modificateData("estado",e.target.value )} >
            {status.map((e)=>(
                <option value={e} key={e}>{e}</option>
            ))}
        </select>
        <input type="text" placeholder="Nombre del Cliente" value={data.cliente} onChange={(e)=> modificateData("cliente",e.target.value )} />
        <input type="number" placeholder="Telefono del cliente" value={data.numeroTelefonico} onChange={(e)=> modificateData("numeroTelefonico",e.target.value )} />
        <input type="date" placeholder="fechaPrevista" value={data.fechaPrevista} onChange={(e)=> modificateData("fechaPrevista",e.target.value )} />
        <textarea  placeholder="Notas adicionales" value={data.notas} onChange={(e)=> modificateData("notas",e.target.value )} />
        <button onClick={updateData} >Aceptar</button>
        <button onClick={()=>{navigate("/admin")}}>Cancelar</button>

    </div> 



}