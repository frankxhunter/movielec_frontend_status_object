import { useState } from "react"
import { FilterPhoneNumber } from "../components/filterPhoneNumber";
import { Card } from "../components/card";
import axios from "axios";
import urls from "../../urls.json"

export default function App() {
  const [ordens, setOrdens] = useState([])

  async function fetchData(numberFind) {
    try {
      const response = await axios.get(urls.getOrdens + "/" + numberFind)
      console.log(response)
      setOrdens(response.data)
    } catch (error) {
      setOrdens([])
      console.log(error)
    }
  }

  return <>
    <FilterPhoneNumber changeNumber={fetchData} />
    {ordens.map((orden)=>(
      <Card 
      key={orden.id}
      orden={orden.orden} 
      cliente={orden.cliente} 
      fechaPrevista={orden.fechaPrevista}
      estado={orden.estado}
      notas={orden.notas} />
      ))}
  </>
}