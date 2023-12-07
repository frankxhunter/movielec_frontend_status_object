import axios from "axios";
import { useEffect, useState } from "react"
import urls from "../../urls.json"
import { Password } from "../components/password";
import { CardEdit } from "../components/cardEdit";

export default function App() {
    const [filter, setFilter] = useState("");
    const [isAvanced, setIsAvanced] = useState(false);
    const [password, setPassword] = useState(localStorage.getItem("password") ?? "")
    const [asyncComponent, setAsyncComponent] = useState(null);

    function setPasswordInLocalStorage(password){
        setPassword(password);
        localStorage.setItem("password", password)
    }

    function changeSearchAvanced() {
        setIsAvanced(!isAvanced)
        console.log(isAvanced)
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, filter, isAvanced])

    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${password}`,
        },
    });

    async function fetchData() {
        if (!password) {
            return setAsyncComponent(<Password value={password} setValue={setPasswordInLocalStorage} />)
        }
        try {
            let url = "";
            if(filter.trim().length > 0){
                url += "/" + filter;
                if(isAvanced){
                    url+= "/" + isAvanced
                }
            }
            const response = await axiosInstance.get(urls.getAllAdmin + url)
            let data = []
            if(response.data[0] && response.data[0].item){
                data = response.data.map(e => e.item)

            }
            else{
                data = response.data
            }
            return setAsyncComponent(<>
                <div className="form">
                    <input type="text" placeholder="Numero de orden" value={filter} onChange={e => setFilter(e.target.value)} />
                    <div><input type="checkbox" value={isAvanced} onChange={changeSearchAvanced} />Busqueda avanzada</div>
                </div>
                {data.map((orden) => {
                    return <CardEdit
                        key={orden.id}
                        orden={orden.orden}
                        cliente={orden.cliente}
                        fechaPrevista={orden.fechaPrevista}
                        estado={orden.estado}
                        notas={orden.notas}
                        axios={axiosInstance}
                        id={orden.id} />
                })}
            </>)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return setAsyncComponent(<Password value={password} setValue={setPassword} message="Contraseña de administrar invalida" />)
            }
            console.log(error)
            setAsyncComponent(<h1>Error</h1>)
        }

    }

    return <>
        {asyncComponent !== null ? asyncComponent : <h1>Cargando...</h1>}

    </>
}