/* eslint-disable react/prop-types */
import  axios  from "axios";
import { useState } from "react";
import  urls  from "../../urls.json"
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("password")}`,
    },
});

const status =  (await axiosInstance(urls.getStatus)).data

export default function CreateData() {
   const [data, setData] = useState({})
    const navigate = useNavigate();       
    function modificateData(prop, value){
        const newData = {...data}
        newData[prop] = value;
        setData(newData)
    }

    async function createData(){
        console.log(data);
        /*
        try{
            const newData = await axiosInstance.get(`${urls.create}`, data)
            console.log(newData)
            navigate("/admin")
            alert("La ficha ha sido creada")
        }catch(error){
            if(error.response && error.response.status === 401){
                console.log("hola")
            }
            console.log(error.response.data)
        }
        */
        
    }

    return <div>
        <input type="number" placeholder="Numero de orden" value={(data.orden ?? "" )} onChange={(e)=> modificateData("orden",Number(e.target.value) )} />
        <select placeholder="" name="Status" id="1" value={data.estado ?? ""} onChange={(e)=> modificateData("estado",e.target.value )} >
            {status.map((e)=>(
                <option value={e} key={e}>{e}</option>
            ))}
        </select>
        <input type="text" placeholder="Nombre del Cliente" value={data.cliente ?? ""} onChange={(e)=> modificateData("cliente",e.target.value )} />
        <input type="number" placeholder="Telefono del cliente" value={data.numeroTelefonico ?? ""} onChange={(e)=> modificateData("numeroTelefonico",e.target.value )} />
        <input type="date" placeholder="fechaPrevista" value={data.fechaPrevista ?? ""} onChange={(e)=> modificateData("fechaPrevista",e.target.value )} />
        <textarea  placeholder="Notas adicionales" value={data.notas ?? ""} onChange={(e)=> modificateData("notas",e.target.value )} />
        <button onClick={createData} >Aceptar</button>
        <button onClick={()=>{navigate("/admin")}}>Cancelar</button>

    </div> 



}