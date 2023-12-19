import { useEffect, useRef, useState } from "react"
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { verificarFormatoFecha } from "../recursos/Funciones";
import { Divider } from "./Divider";

export const EstadoForm = ({ initialAuxilioForm, errors, handlerUpdateEstadoAuxilio, addError,
    auxilioSelected, handlerCloseForm }) => {

    const [auxilioForm, setAuxilioForm] = useState(initialAuxilioForm);
    const { id, idEstadoAuxilio, fechaViabilidad, fechaSolicitud, resolucion, fechaResolucion, rdp, fechaRdp } = auxilioForm;

    useEffect(() => {
        setAuxilioForm({
            ...auxilioSelected,
        })
    }, [auxilioSelected])

    const onInputChange = ({ target }) => {
        console.log(target)
        const { name, value } = target;
        setAuxilioForm(
            {
                ...auxilioForm,
                [name]: value
            }
        )
        console.log(auxilioForm);
    }

    const onSubmit = (event) => {
        event.preventDefault(); // permite que no se recargue la pagina cundo se envia el formulario
        console.log(auxilioForm)

        if (!verificarFormatoFecha(fechaViabilidad) && fechaViabilidad) {
            addError({ fechaViabilidad: 'La Fecha debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaResolucion) && fechaResolucion) {
            addError({ fechaResolucion: 'La Fecha debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaRdp) && fechaRdp) {
            addError({ fechaRdp: 'La Fecha debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        handlerUpdateEstadoAuxilio(auxilioForm) // Guardar el userFrom en userList
    }

    const onCloseForm = () => {
        setAuxilioForm(initialAuxilioForm);
        handlerCloseForm();
    }

    return (
        <>
            <form className="" onSubmit={onSubmit} noValidate>
                <div className="overflow-auto" style={{ maxHeight: "52vh" }}>
                    <div className=" mx-2">
                        <p className="text-danger mb-0">{errors?.id}</p>
                        <p className="text-danger mb-0">{errors?.fechaSolicitud}</p>

                        <Divider content={'Fecha Solicitud'} />
                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Fecha de la Solicitud</label>
                            <input
                                type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Fecha de la Solicitud" name='fechaSolicitud' value={fechaSolicitud}
                                onChange={onInputChange} disabled={true}
                            />
                            <p className="text-danger mb-0">{errors?.fechaSolicitud}</p>
                        </div>

                        <Divider content={'Viabilidad'} />
                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Fecha de Viabilidad</label>
                            <input
                                type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Fecha de Viabilidad" name='fechaViabilidad' value={fechaViabilidad}
                                onChange={onInputChange} disabled={idEstadoAuxilio == 3}
                            />
                            <p className="text-danger mb-0">{errors?.fechaViabilidad}</p>
                        </div>

                        {idEstadoAuxilio == 1 ||
                            <>
                                <Divider content={'Resolución (Opcional)'} />
                                <div className="row m-0">
                                    <div className="col p-0 pe-1">
                                        <div className={""}>
                                            <label className="form-label fs-16px-login-label mb-0">Resolucion</label>
                                            <input
                                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                                placeholder="Resolucion" name='resolucion' value={resolucion}
                                                onChange={onInputChange}
                                            />
                                            <p className="text-danger mb-0">{errors?.resolucion}</p>
                                        </div>
                                    </div>
                                    <div className="col p-0 ps-1">
                                        <div className="mb-1">
                                            <label className="form-label fs-16px-login-label mb-0">Fecha de Resolucion</label>
                                            <input
                                                type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                                                placeholder="Fecha de la Resolucion" name='fechaResolucion' value={fechaResolucion}
                                                onChange={onInputChange}
                                            />
                                            <p className="text-danger mb-0">{errors?.fechaResolucion}</p>
                                        </div>
                                    </div>
                                </div>

                                <Divider content={'RDP'} />
                                <div className="row m-0 mb-2">
                                    <div className="col p-0 pe-1">
                                        <div className={""}>
                                            <label className="form-label fs-16px-login-label mb-0">RDP</label>
                                            <input
                                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                                placeholder="RDP" name='rdp' value={rdp}
                                                onChange={onInputChange}
                                            />
                                            <p className="text-danger mb-0">{errors?.rdp}</p>
                                        </div>
                                    </div>
                                    <div className="col p-0 ps-1">
                                        <div className="mb-1">
                                            <label className="form-label fs-16px-login-label mb-0">Fecha de RDP</label>
                                            <input
                                                type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                                                placeholder="Fecha del RDP" name='fechaRdp' value={fechaRdp}
                                                onChange={onInputChange}
                                            />
                                            <p className="text-danger mb-0">{errors?.fechaRdp}</p>
                                        </div>
                                    </div>
                                </div>

                            </>
                        }



                    </div>
                </div>

                <hr />
                <div className="">
                    <button
                        className={"btn btn-mybotton btn-color-blue my-2 p-2"}
                        type="submit">
                        {'Editar'}
                    </button>

                    {!handlerCloseForm ||
                        <button
                            className="btn btn-mybotton btn-color-red my-2 p-2"
                            type="button"
                            onClick={onCloseForm}>
                            Cerrar
                        </button>
                    }
                </div>

            </form>
        </>
    )
}