/* eslint-disable react-hooks/exhaustive-deps */
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
export function FilterForm({ fetchData }) {
    const [filter, setFilter] = useState("");
    const [isAvanced, setIsAvanced] = useState(false);
    const [sort, setSort] = useState("orden")
    const navigate = useNavigate()
    
    function changeSearchAvanced() {
        setIsAvanced(!isAvanced)
    }

    useEffect(()=>{
        if(filter.length == 0){
            handlefetch()
        }
    },[filter])

    useEffect(()=>{
            handlefetch()
    },[sort])

    function handlefetch(){
        fetchData(filter, isAvanced, sort);
    }
  
    function handleAction(e){
        e.preventDefault();
        handlefetch()
    }
    return <>
        <button onClick={() => { navigate("/createAdmin") }} className="addButton" ><IoIosAddCircleOutline className="iconAdd_buttonAdd"/></button>
        <form className="filter_content" onSubmit={handleAction} >
            <div className="filter" >
            <input
                type="text"
                className='input_filter'
                placeholder="Numero de orden"
                value={filter}
                onChange={e => setFilter(e.target.value)}
            />
            <button className='button_filter' type="submit"><FaSearch className='icon_filter' /></button>

            </div>
            <div className="checkbox_filter" >
                <input
                    type="checkbox"
                    value={isAvanced}
                    onChange={changeSearchAvanced}
                />
                Busqueda avanzada
            </div>
            <div className="orderBy_filter">
                Ordenar por:
                <select
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value)
                    }}
                >
                    <option value="orden">Numero de orden</option>
                    <option value="cliente">Nombre de cliente</option>
                    <option value="numeroTelefonico">Numero de telefono</option>
                    <option value="fechaPrevista">Fecha prevista</option>

                </select>
            </div>
        </form>
    </>
}