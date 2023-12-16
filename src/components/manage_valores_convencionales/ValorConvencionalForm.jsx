import { useEffect, useState } from "react"
import { Divider } from "../layout/Divider"
import { onOptionsSelect, verificarFormatoFecha } from "../recursos/Funciones"
import { useOthersEntities } from "../../hooks/useOthersEntities"
import { useValoresConvencionales } from "../../hooks/useValoresConvencionales"

export const ValorConvencionalForm = ({ valorConvencionalSelected, handlerCloseForm }) => {

    const { initialValorConvencionalForm, handlerAddValorConvencional, errors, initialValuesCalculo,
        handlerCalcularValorConvencional, valorTotal, addError } = useValoresConvencionales()

    const { tiposNegociacionesSindicales, negociacionesSindicales, sindicatos,
        tiposNegociacionesSindicalesBySindicatoId, negociacionesSindicalesByTipoNegociacionSindicalId,
        getAllNegociacionesSindicalesByTipoNegociacionSindicalId,
        getAllTiposNegociacionesSindicalesBySindicatoId, distinctNameSalariosConfig,
    } = useOthersEntities()

    const [valorConvencionalForm, setValorConvencionalForm] = useState(initialValorConvencionalForm);
    const [valuesCalculo, setValuesCalculo] = useState(initialValuesCalculo);

    const { id, fechaSolicitud, valor, observacion, idEstadoAuxilio, idSindicato,
        idTipoNegociacionSindical, idNegociacionSindical, fechaOpcionalCalculo } = valorConvencionalForm;

    const { concepto, factor } = valuesCalculo;

    useEffect(() => {
        setValorConvencionalForm({ ...valorConvencionalSelected })
    }, [valorConvencionalSelected])

    useEffect(() => {
        console.log(valorTotal);
        if (typeof valorTotal === 'number' && !isNaN(valorTotal))
            setValorConvencionalForm(prevState => ({
                ...prevState,
                valor: valorTotal.toFixed(2)
            }));
    }, [valorTotal])


    useEffect(() => {
        const { idSindicato } = valorConvencionalForm
        valorConvencionalSelected?.id == 0 && (
            setValorConvencionalForm({
                ...initialValorConvencionalForm,
                idSindicato
            })
        )
        getAllTiposNegociacionesSindicalesBySindicatoId(idSindicato)
    }, [idSindicato])


    useEffect(() => {
        const { idSindicato, idTipoNegociacionSindical } = valorConvencionalForm
        valorConvencionalSelected?.id == 0 && (
            setValorConvencionalForm({
                ...initialValorConvencionalForm,
                idSindicato,
                idTipoNegociacionSindical
            })
        )
        getAllNegociacionesSindicalesByTipoNegociacionSindicalId(idTipoNegociacionSindical)
    }, [idTipoNegociacionSindical])

    useEffect(() => {
        const { idSindicato, idTipoNegociacionSindical, idNegociacionSindical } = valorConvencionalForm;
        valorConvencionalSelected?.id == 0 && (
            setValorConvencionalForm({
                ...initialValorConvencionalForm,
                idSindicato,
                idTipoNegociacionSindical,
                idNegociacionSindical
            })
        )

    }, [idNegociacionSindical])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setValorConvencionalForm(
            {
                ...valorConvencionalForm,
                [name]: value
            }
        )
    }

    const onInputChangeCalculo = ({ target }) => {
        const { name, value } = target;
        if (name == 'concepto') {
            setValuesCalculo(
                {
                    ...valuesCalculo,
                    [name]: distinctNameSalariosConfig.find(d => d.id == value)
                }
            )
        } else if (name == 'factor') {
            setValuesCalculo(
                {
                    ...valuesCalculo,
                    [name]: value
                }
            )
        }
    }

    useEffect(() => {
        console.log(valorConvencionalForm)
    }, [valorConvencionalForm])

    useEffect(() => {
        console.log(valuesCalculo)
    }, [valuesCalculo])

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(valorConvencionalForm);
        handlerAddValorConvencional(valorConvencionalForm);
    }

    const onCalcular = (event) => {
        event.preventDefault();
        if (!verificarFormatoFecha(fechaSolicitud) && fechaSolicitud) {
            addError({ fechaSolicitud: 'Fecha de Solicitud debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaOpcionalCalculo) && fechaOpcionalCalculo) {
            addError({ fechaOpcionalCalculo: 'Fecha Opcional debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        const values = {
            fechaSolicitud,
            fechaOpcionalCalculo,
            ...valuesCalculo
        }
        handlerCalcularValorConvencional(values);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setValorConvencionalForm(initialValorConvencionalForm);
    }

    return (
        <>
            <form className="" onSubmit={onSubmit} noValidate disabled>
                <div className="row">
                    <div className="col px-2">

                        <Divider content={'Sindicato'} />

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Sindicato</label>
                            <select
                                className="form-select rounded-pill fs-16px-login-input py-0"
                                name="idSindicato"
                                onChange={onInputChange}
                                disabled={id != 0}
                                value={idSindicato}
                            >
                                {onOptionsSelect(sindicatos, 'Seleccione un Sindicato', false)}
                            </select>
                            <p className="text-danger mb-0">{errors?.idSindicato}</p>
                        </div>

                        <Divider content={'Negociacion Sindical'} />

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Tipo Negociacion Sindical</label>
                            <select
                                disabled={idSindicato == 0 || valorConvencionalForm.id != 0}
                                className="form-select rounded-pill fs-16px-login-input py-0"
                                name="idTipoNegociacionSindical"
                                onChange={onInputChange}
                                value={idTipoNegociacionSindical}
                            >
                                {onOptionsSelect(tiposNegociacionesSindicalesBySindicatoId, "Tipo Negociacion Sindical", false)}
                            </select>
                            <p className="text-danger mb-0">{errors?.idTipoNegociacionSindical}</p>
                        </div>

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Negociacion Sindical</label>
                            <select
                                disabled={idSindicato == 0 || idTipoNegociacionSindical == 0 || valorConvencionalForm.id != 0}
                                className="form-select rounded-pill fs-16px-login-input py-0"
                                name="idNegociacionSindical"
                                onChange={onInputChange}
                                value={idNegociacionSindical}
                            >
                                {onOptionsSelect(negociacionesSindicalesByTipoNegociacionSindicalId, "Negociacion Sindical", false)}
                            </select>
                            <p className="text-danger mb-0">{errors?.idNegociacionSindical}</p>
                        </div>

                    </div>
                    <div className="col px-2 overflow-auto" style={{ height: "55vh" }}>

                        <Divider content={'Datos del Auxilio'} />
                        {(idNegociacionSindical != 0 && idTipoNegociacionSindical != 0 && idSindicato != 0) &&
                            <>
                                <div className="mb-1">
                                    <label className="form-label fs-16px-login-label mb-0">Fecha de Solicitud</label>
                                    <input
                                        type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                                        placeholder="Fecha de la Solicutud"
                                        name='fechaSolicitud'
                                        value={fechaSolicitud || ''}
                                        onChange={onInputChange}
                                    />
                                    <p className="text-danger mb-0">{errors?.fechaSolicitud}</p>
                                </div>

                                <div className="mb-1">
                                    <label className="form-label fs-16px-login-label mb-0">Observacion</label>
                                    <textarea
                                        className="form-control date rounded-4 fs-16px-login-input py-0"
                                        placeholder="Observacion"
                                        name='observacion'
                                        value={observacion}
                                        onChange={onInputChange}
                                    />
                                </div>

                                <Divider content={'Valor del Auxilio'} />

                                <div className="mb-1">
                                    <label className="form-label fs-16px-login-label mb-0">{"(Opcional) Fecha de Calculo"}</label>
                                    <input
                                        type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                                        placeholder="Fecha Calculo "
                                        name='fechaOpcionalCalculo'
                                        value={fechaOpcionalCalculo || ''}
                                        onChange={onInputChange}
                                    />
                                    <p className="d-flex justify-content-end fw-bold fs-7 m-0">Por defecto: Fecha de solicitud </p>
                                    <p className="text-danger mb-0">{errors?.fechaOpcionalCalculo}</p>
                                </div>

                                <div>
                                    <label className="form-label fs-16px-login-label mb-0">Valor del auxilio</label>

                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className=" me-2">
                                            <label className="form-label fs-6 mb-0">Concepto</label>
                                            <select
                                                className="form-select rounded-pill fs-16px-login-input py-0"
                                                name="concepto"
                                                onChange={onInputChangeCalculo}
                                                value={concepto?.id}
                                            >
                                                {onOptionsSelect(distinctNameSalariosConfig, "Concepto", false)}
                                            </select>
                                            <p className="text-danger mb-0">{errors?.concepto}</p>
                                        </div>

                                        <div className="mb-0">
                                            <label className="form-label fs-16 mb-0">{'Factor'}</label>
                                            <input
                                                type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                                                placeholder="Factor" name='factor' value={factor}
                                                onChange={onInputChangeCalculo}
                                            />
                                            <p className="text-danger mb-0">{errors?.factor}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <button
                                                className="btn btn-login btn-sm py-0 me-2"
                                                type="button"
                                                onClick={onCalcular}
                                            >
                                                Calcular:
                                            </button>

                                            <div className="mb-0">
                                                <input
                                                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                                                    placeholder="Valor del auxilo" name='valor' value={valor}
                                                    onChange={onInputChange}
                                                />
                                                <p className="text-danger mb-0">{errors?.valor}</p>
                                            </div>
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
                        {valorConvencionalSelected?.id == '' ? 'Agregar' : 'Editar'}
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