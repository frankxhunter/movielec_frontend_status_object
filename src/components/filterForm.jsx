import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function FilterForm({filter, setFilter, isAvanced, changeSearchAvanced, sort, handleSort}){
    const navigate = useNavigate()
    return <>
    <div className="form">
                    <input 
                        type="text" 
                        placeholder="Numero de orden" 
                        value={filter} 
                        onChange={e => setFilter(e.target.value)} 
                    />
                    <div>
                        <input 
                            type="checkbox" 
                            value={isAvanced} 
                            onChange={changeSearchAvanced} 
                            />
                        Busqueda avanzada
                    </div>
                    <div>
                        Ordenar por: 
                        <select 
                            value={sort} 
                            onChange={(e)=>{
                            handleSort(e.target.value)
                            }} 
                            >
                        <option value="orden">Numero de orden</option>
                        <option value="cliente">Nombre de cliente</option>
                        <option value="numeroTelefonico">Numero de telefono</option>
                        <option value="fechaPrevista">Fecha prevista</option>

                    </select>
                    </div>
                </div>
                <button onClick={() => { navigate("/createAdmin") }} >Añadir nuevo</button>
    </>
}