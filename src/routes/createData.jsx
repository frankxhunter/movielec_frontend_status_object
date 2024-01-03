/* eslint-disable react/prop-types */
import axios from "axios";
import urls from "../../urls.json"
import { useNavigate } from "react-router-dom";
import { Formulario } from "../components/form";

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("password")}`,
    },
});

//const status = (await axiosInstance(urls.getStatus)).data

export default function CreateData() {

    const navigate = useNavigate();


    async function createData({ data }) {
        try {
            console.log(data)
            const newData = await axiosInstance.post(`${urls.create}`, data)
            console.log("hola")
            console.log(newData)
            navigate("/admin")
            alert("La ficha ha sido creada")
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log(error)
            }
            console.log(error.response.data)
        }

    }
    async function getStatus(){
        return (await axios(urls.getStatus)).data
    }
   

    return <>
        <Formulario
            fetchingData={createData}
            status={getStatus()}
            cancelAction ={() => {navigate("/admin")}
            }
        />
    </>



}