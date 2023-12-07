import urls from "../../urls.json"
// eslint-disable-next-line react/prop-types
export function CardEdit({ orden, cliente, fechaPrevista, estado, notas, axios, id }) {

    async function actionDelete() {
        if(!confirm("Seguro q desea borrar este elemento?")){
            return null
        }
        try {
            // eslint-disable-next-line react/prop-types
            const deleted = await axios.delete(urls.delete + "/" + id)
            console.log(deleted)
        } catch (error) {
            console.log(error)
        }
    }

    return <div className="card">
        <h3 className="card_status">{estado}</h3>
        <div className="card_orden" >{orden}</div>
        <div className="card_cliente" >{cliente}</div>
        <div className="card_orden" >{fechaPrevista}</div>
        <p className="card_orden" >{notas}</p>
        <button>Editar</button>
        <button onClick={actionDelete} >Eliminar</button>
    </div>
}