import {useState } from "react"
import urls from "../../urls.json"
import { CardEdit } from "../components/cardEdit";
import { axiosInstance, createUrl } from "../methods";
import { FilterForm } from "../components/filterForm";
import { useNavigate } from "react-router-dom";

export default function App() {
    const [asyncComponent, setAsyncComponent] = useState(null);
    const navigate = useNavigate()

    async function fetchData(filter, isAvanced, orderBy) {
        if (!localStorage.getItem("password")) {
            return navigate("/validate")
        }
        try {
            const url = createUrl(filter, isAvanced)
            const response = await axiosInstance().get(urls.getAllAdmin + url)
            let data = []
            if (response.data[0] && response.data[0].item) {
                data = response.data.map(e => e.item)
            }
            else {
                data = response.data
            }
            data.sort((a, b) => {
                if (a[orderBy] < b[orderBy]) return -1;
                if (a[orderBy] > b[orderBy]) return 1;
                return 0
            })
            return setAsyncComponent(<>


                {data.map((orden) => {
                    return <CardEdit
                        {...orden}
                        key={orden.id}
                        update={fetchData} />
                })}
            </>)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return navigate("/validate")
            }
            setAsyncComponent(<h1>Error</h1>)
        }

    }

    return <>
        <FilterForm
            fetchData={fetchData}
        />
        {asyncComponent !== null ? asyncComponent : <h1 style={{"marginTop": "40px"}}>Cargando...</h1>}

    </>
}