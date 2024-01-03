import { useEffect, useState } from "react"
import urls from "../../urls.json"
import { Password } from "../components/password";
import { CardEdit } from "../components/cardEdit";
import { axiosInstance, createUrl } from "../methods";
import { FilterForm } from "../components/filterForm";

export default function App() {
    const [filter, setFilter] = useState("");
    const [isAvanced, setIsAvanced] = useState(false);
    const [orderBy, setOrderBy] = useState("orden")
    const [asyncComponent, setAsyncComponent] = useState(null);



    function changeSearchAvanced() {
        setIsAvanced(!isAvanced)
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, isAvanced, orderBy])

    async function fetchData() {
        if (!localStorage.getItem("password")) {
            return setAsyncComponent(<Password update={fetchData} />)
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
                <FilterForm
                    filter={filter}
                    setFilter={setFilter}
                    isAvanced={isAvanced}
                    changeSearchAvanced={changeSearchAvanced}
                    sort={orderBy}
                    handleSort={setOrderBy}
                    fetchData= {fetchData}
                />

                {data.map((orden) => {
                    return <CardEdit
                        {...orden}
                        key={orden.id}
                        update={fetchData} />
                })}
            </>)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return setAsyncComponent(<Password update={fetchData} message="Contraseña de administrador invalida" />)
            }
            console.log(error)
            setAsyncComponent(<h1>Error</h1>)
        }

    }

    return <>
        {asyncComponent !== null ? asyncComponent : <h1>Cargando...</h1>}

    </>
}