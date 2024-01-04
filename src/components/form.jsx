/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik"
import { defaultImagen, getLinkOfImagenToDrive } from "../methods"
import { useEffect, useState } from "react"
import urls from "../../urls.json"
import axios from "axios"


// eslint-disable-next-line react/prop-types
export function Formulario({ estado, orden, cliente, numeroTelefonico, fechaPrevista, notas, imageUrl, id, fetchingData, cancelAction, }) {
    const [imagen, setImagen] = useState(imageUrl == "" || imageUrl == null ? defaultImagen : imageUrl)
    const [asyncSelects, setAsyncSelects] = useState()

    async function selects(){
        const status = await axios(urls.getStatus)
        const selects=  status.data.map((e) => (
            <option value={e} key={e} label={e} />
        ))
        setAsyncSelects(selects)
    }
    useEffect(()=>{
        selects()
    },[])
    return (
        <Formik
            initialValues={{
                estado: estado ?? "",
                orden: orden ?? "",
                cliente: cliente ?? "",
                numeroTelefonico: numeroTelefonico ?? "",
                fechaPrevista: fechaPrevista ?? "",
                imageUrl: imageUrl ?? "",
                notas: notas ?? ""
            }}
            onSubmit={(values, { resetForm }) => {
                const data = {
                    estado: values.estado,
                    orden: values.orden,
                    cliente: values.cliente,
                    numeroTelefonico: values.numeroTelefonico,
                    fechaPrevista: values.fechaPrevista,
                    imageUrl: values.imageUrl === defaultImagen ? null : values.imageUrl,
                    notas: values.notas
                }
                fetchingData({ data, id })
                resetForm()
            }}
            validate={(values) => {
                let errors = {}
                if (!values.estado) {
                    errors.estado = "Por favor seleccione un estado"
                }
                if (!values.orden) {
                    errors.orden = "Por favor introduzca el numero de orden"
                }
                else if (values.orden < 0 || values.orden > 10000) {
                    errors.orden = "El numero de orden esta fuera del rango permitido "
                }
                if (!values.cliente) {
                    errors.cliente = "Por favor introduzca el nombre del cliente"
                }
                else if (!/^[a-zA-Z0-9_ -]{4,30}$/.test(values.cliente)) {
                    errors.cliente = "El nombre del cliente es invalido"
                }
                if (!values.numeroTelefonico) {
                    errors.numeroTelefonico = "Por favor introduzca el numero telefonico del cliente"
                }
                else if (!/^\d{8,12}$/.test(values.numeroTelefonico)) {
                    errors.numeroTelefonico = "El numero telefonico del cliente es invalido"
                }
                if (!values.fechaPrevista) {
                    errors.fechaPrevista = "Por favor seleccione la fecha prevista"
                }
                else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.fechaPrevista)) {
                    errors.fechaPrevista = "El formato de la fecha es invalido"
                }
                if (values.imageUrl && values.imageUrl !== "") {
                    const result = getLinkOfImagenToDrive(values.imageUrl);
                    if (result.success) {
                        setImagen(result.link)
                    } else {
                        errors.imageUrl = result.error
                    }
                } else {
                    setImagen(defaultImagen)
                }
                return errors
            }}
        >
            {() => (
                <Form className="formik">
                    <h2>{id? "Modifica el registro": "Crea un registro"}</h2>
                    <div className="formik_container_field">
                        <label className="label_formik" htmlFor="estado">Estado: </label>
                        <Field className="input_formik"
                            as="select"
                            name="estado"

                        >
                            <option value="" className="input_formik">Selecione un estado</option>
                            {asyncSelects}

                        </Field>
                        <div className="error_formik">
                            <ErrorMessage name="estado" />
                        </div>
                    </div>
                    <div className="formik_container_field">
                        <label className="label_formik" htmlFor="orden">Numero de orden: </label>
                        <Field
                            autoComplete="off"
                            className="input_formik"
                            type="number"
                            name="orden"
                            placeholder="798" />
                        <div className="error_formik">
                            <ErrorMessage name="orden" />
                        </div>
                    </div>
                    <div className="formik_container_field">
                        <label className="label_formik" htmlFor="cliente">Nombre del cliente: </label>
                        <Field 
                        className="input_formik"
                        autoComplete="off"
                        type="text" 
                        name="cliente" 
                        placeholder="Josepha García" />
                        <div className="error_formik">
                            <ErrorMessage name="cliente" />
                        </div>
                    </div>
                    <div className="formik_container_field">
                        <label className="label_formik" htmlFor="numeroTelefonico">Numero de telefono: </label>
                        <Field 
                        className="input_formik" 
                        type="text" 
                        name="numeroTelefonico" 
                        placeholder="633995167"
                        autoComplete="off"
                        />
                        <div className="error_formik">
                            <ErrorMessage name="numeroTelefonico" />
                        </div>
                    </div>
                    <div className="formik_container_field">
                        <label className="label_formik" htmlFor="fechaPrevista">Fecha prevista: </label>
                        <Field 
                        className="input_formik" 
                        type="date" 
                        name="fechaPrevista" 
                        placeholder="2023-12-24" 
                        autoComplete="off"
                        />
                        <div className="error_formik">
                            <ErrorMessage name="fechaPrevista" />
                        </div>
                    </div>
                    <div className="formik_container_field">
                        <label className="label_formik" htmlFor="imageUrl">Imagen</label>
                        <Field 
                        className="input_formik" 
                        type="text" 
                        name="imageUrl" 
                        placeholder="Link de imagen de drive" 
                        autoComplete="off"
                        />
                        <div className="content_image_formik">
                        <img className="image_formik" src={imagen} alt="Imagen de drive" style={{ width: "250px", height: "250px" }} />

                        </div>
                    
                        <div className="error_formik">
                            <ErrorMessage name="imageUrl" />
                        </div>

                    </div>
                    <div className="formik_container_field">
                        <label className="label_formik" htmlFor="notas">Notas: </label>
                        <Field className="input_formik" as="textarea" name="notas" placeholder="Notas adicionales" />

                    </div>
                    <div className="formik_buttonsContainer">
                    <input type="submit" value="Aceptar" className="formik_acceptButton button"/>
                    <button type="button" onClick={cancelAction} className="formik_cancelButton button" >Cancel</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}