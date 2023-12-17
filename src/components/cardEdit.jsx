import urls from "../../urls.json"

import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../methods"
// eslint-disable-next-line react/prop-types
export function CardEdit({ orden, cliente, fechaPrevista, estado, notas, numeroTelefonico, id,  update }) {

    const navigate = useNavigate()
    async function actionDelete() {
        if (!confirm("Seguro q desea borrar este elemento?")) {
            return null
        }
        try {
            // eslint-disable-next-line react/prop-types
            await axiosInstance().delete(urls.delete + "/" + id)
            update()
        } catch (error) {
            if (error.response && error.response.status === 401) {
                update()
            }
            console.log(error)
        }
    }

    return <div className="card">
        <h3 className="card_status">{estado}</h3>
        <img src="https://drive.google.com/uc?export=download&id=1-AGZLG9CxDVqNc-euAbCnmykGiUurN24" alt="e-bike" style={{"width":"100px"}} />
        <div className="card_orden" >{orden}</div>
        <div className="card_cliente" >{cliente}</div>
        <div className="card_numeroTelefonico">{numeroTelefonico}</div>
        <div className="card_orden" >{fechaPrevista}</div>
        <p className="card_orden" >{notas}</p>
        <button onClick={() => navigate(`/editAdmin/${numeroTelefonico}`)}>Editar</button>
        <button onClick={actionDelete} >Eliminar</button>
    </div>
}