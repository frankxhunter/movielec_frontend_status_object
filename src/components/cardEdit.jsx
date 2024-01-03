import urls from "../../urls.json"

import { useNavigate } from "react-router-dom"
import { axiosInstance, defaultImagen } from "../methods"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
// eslint-disable-next-line react/prop-types
export function CardEdit({ orden, cliente, fechaPrevista, estado, notas, numeroTelefonico, imageUrl, id, update }) {

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
        <h2>Orden Activa</h2>
        <div className="contentButtons_card">
            <button onClick={() => navigate(`/editAdmin/${numeroTelefonico}`)} className="editButton_card"><FaEdit className="iconEdit"/></button>
            <button onClick={actionDelete} className="deleteButton_card"><MdDelete className="iconDelete"/></button>
        </div>
        <img className="img_card" src={!imageUrl || imageUrl === "" ? defaultImagen : imageUrl} alt="Imagen del articulo en reparación" />
        <div className="card_status"><strong>Estado: </strong><span>{estado}</span></div>
        <div className="card_orden"><strong>Numero de orden: </strong><span>{orden}</span></div>
        <div className="card_cliente" ><strong>Cliente: </strong><span>{cliente}</span></div>
        <div className="card_fechaPrevista" ><strong>Fecha prevista de finalización: </strong><span>{fechaPrevista}</span></div>
        <div className="card_notas">
            <strong>Notas adicionales:</strong>
            <p>{notas == null || notas === "" ? "No hay notas adicionales para esta orden" : notas}</p>
        </div>

    </div>
}