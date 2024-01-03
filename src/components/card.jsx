import { defaultImagen } from "../methods";

// eslint-disable-next-line react/prop-types
export function Card({ orden, cliente, fechaPrevista, estado, imageUrl, notas }) {
    return <div className="card">
        <h2>Orden Activa</h2>
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