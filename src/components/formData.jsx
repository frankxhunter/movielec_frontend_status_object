import axios from "axios"
import urls from "../../urls.json"
import { Formik, Form, Field, ErrorMessage } from "formik"

const status = (await axios(urls.getStatus)).data

export const Formulario = () => {
    return (
        <Formik
            initialValues={{
                estado: "En progreso",
                orden: "",
                cliente: "",
                numeroTelefonico: "",
                fechaPrevista: "",
                notas: ""
            }
            }
            onSubmit={(values, { resetForm }) => {
                console.log("formulario enviado")
                console.log(values)
                resetForm();
            }
            }
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
                else if (!/^[a-zA-Z0-9_ -]{8,30}$/.test(values.cliente)) {
                    errors.cliente = "El nombre del cliente es invalido"
                }
                if (!values.numeroTelefonico) {
                    errors.numeroTelefonico = "Por favor introduzca el numero telefonico del cliente"
                }
                else if (!/^\d{8,16}$/.test(values.numeroTelefonico)) {
                    errors.numeroTelefonico = "El numero telefonico del cliente es invalido"
                }
                if (!values.fechaPrevista) {
                    errors.fechaPrevista = "Por favor seleccione la fecha prevista"
                }
                else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.fechaPrevista)) {
                    errors.fechaPrevista = "El formato de la fecha es invalido"
                }
                return errors
            }}
        >
            {() => (
                <Form  >
                    <div>
                        <label htmlFor="estado">Estado</label>
                        <Field
                            as="select"
                            name="estado"

                        >
                            <option value="" selected>Selecione un estado</option>
                            {status.map((e) => (
                                <option value={e} key={e} label={e} />
                            ))}

                        </Field>
                        <ErrorMessage name="estado" />

                    </div>
                    <div>
                        <label htmlFor="orden">Numero de orden</label>
                        <Field
                            type="number"
                            name="orden"
                            placeholder="798"

                        />
                        <ErrorMessage name="orden" />

                    </div>
                    <div>
                        <label htmlFor="cliente">Nombre del cliente</label>
                        <Field type="text" name="cliente" placeholder="Josepha García" />
                        <ErrorMessage name={"cliente"} />
                    </div>
                    <div>
                        <label htmlFor="numeroTelefonico">Numero de telefono</label>
                        <Field type="text" name="numeroTelefonico" placeholder="633995167" />
                        <ErrorMessage name={"numeroTelefonico"} />
                    </div>
                    <div>
                        <label htmlFor="fechaPrevista">Fecha prevista</label>
                        <Field type="date" name="fechaPrevista" placeholder="2023-12-24" />
                        <ErrorMessage name={"fechaPrevista"} />
                    </div>
                    <div>
                        <label htmlFor="notas">Notas</label>
                        <Field as="textarea" name="notas" placeholder="Notas adicionales" />

                    </div>
                    <input type="submit" value="Aceptar" />
                </Form>
            )}
        </Formik>
    )
}