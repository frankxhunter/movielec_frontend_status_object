// eslint-disable-next-line react/prop-types
export function Card({ orden, cliente, fechaPrevista, estado, notas }) {
    return <div className="card">
        <img className="img_card" src="https://drive.google.com/uc?export=download&id=1-AGZLG9CxDVqNc-euAbCnmykGiUurN24" alt="" />
        <div className="card_status"><span>Estado: </span><span>{estado}</span></div>
        <div className="card_orden"><span>Numero de orden: </span><span>{orden}</span></div>
        <div className="card_cliente" ><span>Cliente: </span><span>{cliente}</span></div>
        <div className="card_fechaPrevista" ><span>Fecha prevista de finalización: </span><span>{fechaPrevista}</span></div>
        <div className="card_notas">
            <span>Notas adicionales:</span>
            <p>{notas == null || notas ==="" ? "No hay notas adicionales para esta orden": notas}</p>
        </div>

    </div>
}