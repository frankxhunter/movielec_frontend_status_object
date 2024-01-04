import { useState } from "react"
import { Filter } from "../components/filterPhoneNumber";
import { Card } from "../components/card";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import urls from "../../urls.json"

export default function App() {
  const navigate = useNavigate()

  const [ordens, setOrdens] = useState([])

  async function fetchData(numberFind) {
    try {
      const response = await axios.get(urls.getOrdens + "/" + numberFind)
      setOrdens(response.data)
    } catch (error) {
      setOrdens([])
      console.log(error)
    }
  }

  return <>
      <Filter changeNumber={fetchData} onlyNumber={true} description={"Numero de telefono"} />
      {ordens.map((orden) => (
        <Card
          {...orden}
          key={orden.id}
        />
      ))}
        <div onClick={()=>(navigate("/admin"))} style={{"fontSize":"10px"}}>Modo Admin</div>

  </>
}