// eslint-disable-next-line react/prop-types
export function Card({ orden, cliente, fechaPrevista, estado, notas }) {
    return <div className="card">
        <h3 className="card_status">{estado}</h3>
        <div className="card_orden" >{orden}</div>
        <div className="card_cliente" >{cliente}</div>
        <div className="card_orden" >{fechaPrevista}</div>
        <p className="card_orden" >{notas}</p>

    </div>
}