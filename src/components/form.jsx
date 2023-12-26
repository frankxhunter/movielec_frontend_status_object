/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik"
import { defaultImagen, getLinkOfImagenToDrive } from "../methods"
import { useState } from "react"


// eslint-disable-next-line react/prop-types
export function Formulario({ estado, orden, cliente, numeroTelefonico, fechaPrevista, notas, imageUrl, id, fetchingData, cancelAction, status }) {
    const [imagen, setImagen] = useState(imageUrl =="" || imageUrl == null ? defaultImagen: imageUrl)
    console.log(imagen)
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
                    imageUrl: values.imageUrl === defaultImagen? null: values.imageUrl,
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
                if(values.imageUrl && values.imageUrl !== ""){
                    const result = getLinkOfImagenToDrive(values.imageUrl);
                    if(result.success){
                        setImagen(result.link)
                    }else{
                        errors.imageUrl = result.error
                    }
                }else{
                     setImagen(defaultImagen)
                }
                return errors
            }}
        >
            {() => (
                <Form>
                    <div className="form_container_field">
                        <label htmlFor="estado">Estado: </label>
                        <Field
                            as="select"
                            name="estado"

                        >
                            <option value="">Selecione un estado</option>
                            {status.map((e) => (
                                <option value={e} key={e} label={e} />
                            ))}

                        </Field>
                        <ErrorMessage name="estado" />

                    </div>
                    <div className="form_container_field">
                        <label htmlFor="orden">Numero de orden: </label>
                        <Field
                            type="number"
                            name="orden"
                            placeholder="798" />
                        <ErrorMessage name="orden" />

                    </div>
                    <div className="form_container_field">
                        <label htmlFor="cliente">Nombre del cliente: </label>
                        <Field type="text" name="cliente" placeholder="Josepha García" />
                        <ErrorMessage name={"cliente"} />
                    </div>
                    <div className="form_container_field">
                        <label htmlFor="numeroTelefonico">Numero de telefono: </label>
                        <Field type="text" name="numeroTelefonico" placeholder="633995167" />
                        <ErrorMessage name={"numeroTelefonico"} />
                    </div>
                    <div className="form_container_field">
                        <label htmlFor="fechaPrevista">Fecha prevista: </label>
                        <Field type="date" name="fechaPrevista" placeholder="2023-12-24" />
                        <ErrorMessage name={"fechaPrevista"} />
                    </div>
                    <div className="form_container_field">
                        <label htmlFor="imageUrl">Imagen</label>
                        <Field type="text" name="imageUrl" placeholder="Link de imagen de drive" ></Field>
                        <img src={imagen} alt="Imagen de drive" style={{width: "250px", height:"250px"}}/>
                        <ErrorMessage name="imageUrl" />

                    </div>
                    <div className="form_container_field">
                        <label htmlFor="notas">Notas: </label>
                        <Field as="textarea" name="notas" placeholder="Notas adicionales" />

                    </div>
                    <input type="submit" value="Aceptar" />
                    <button type="button" onClick={cancelAction} >Cancel</button>
                </Form>
            )}
        </Formik>
    )
}