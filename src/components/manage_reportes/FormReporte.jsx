import { useEffect, useState } from "react"
import { onOptionsSelect, verificarFormatoFecha } from "../recursos/Funciones";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { OptionsReporte } from "./OptionsReporte";
import { useReportes } from "../../hooks/useReportes";
import { SwalToastNotFound } from "../recursos/SweetAlerts";

export const FormReporte = ({ formReporte, setFormReporte, dataReporte }) => {
    const { handlerGenerarReporte, errors, addError, reportes, campos1, campos2, initialFormReporte } = useReportes();
    const { sindicatos: allSindicatos, tiposAuxiliosIndividuales, negociacionesByTiposNegociacionesIds,
        vinculaciones, tiposNegociacionesBySindicatosIds, allEstadosAuxilios, getAllNegociacionesByTiposNegociacionesIds,
        getAllTiposNegociacionesBySindicatosIds } = useOthersEntities()
    
    const { idReporte, idFuncionario, sindicatos, tiposNegociaciones, negociaciones, estados,
        campos, startDate, endDate } = formReporte;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormReporte(
            {
                ...formReporte,
                [name]: value
            }
        )
    }

    const onSelectMultipleChange = (event, allValues, values) => {

        const { target } = event
        const { value } = target;
        let updatedSelection = [];
        const valueInt = parseInt(value)

        console.log(valueInt)

        const isOptionSelected = values.includes(valueInt); // Comprobar si la opción ya está seleccionada

        console.log(isOptionSelected)

        if (valueInt == 0) {
            updatedSelection = allValues.map(item => item.id);
        } else if (isOptionSelected) {// Si la opción ya está seleccionada, se elimina
            updatedSelection = values.filter(option => option != valueInt);
        } else {// Si no está seleccionada, la agregamos
            updatedSelection = [...values, valueInt];
        }

        setFormReporte({
            ...formReporte,
            [event.currentTarget?.name]: updatedSelection
        });

        updatedSelection = []
    };

    useEffect(() => {
        console.log(formReporte)
    }, [formReporte])

    useEffect(() => {
        setFormReporte(prevState => ({
            ...initialFormReporte,
            idReporte: prevState?.idReporte,
            endDate: prevState?.endDate,
            startDate: prevState?.startDate,
        }));
    }, [idReporte])

    useEffect(() => {
        setFormReporte(prevState => ({
            ...initialFormReporte,
            idReporte: prevState?.idReporte,
            sindicatos: prevState?.sindicatos,
            campos: prevState?.campos,
            estados: prevState?.estados,
            idFuncionario: prevState?.idFuncionario,
            endDate: prevState?.endDate,
            startDate: prevState?.startDate,
        }));
    }, [sindicatos])

    useEffect(() => {
        setFormReporte(prevState => ({
            ...initialFormReporte,
            idReporte: prevState?.idReporte,
            sindicatos: prevState?.sindicatos,
            tiposNegociaciones: prevState?.tiposNegociaciones,
            estados: prevState?.estados,
            idFuncionario: prevState?.idFuncionario,
            campos: prevState?.campos,
            endDate: prevState?.endDate,
            startDate: prevState?.startDate,
        }));
    }, [tiposNegociaciones])

    useEffect(() => {
        getAllTiposNegociacionesBySindicatosIds(sindicatos);
    }, [sindicatos])

    useEffect(() => {
        getAllNegociacionesByTiposNegociacionesIds(tiposNegociaciones);
    }, [tiposNegociaciones])

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(formReporte)

        if (idReporte==0 || !idReporte) {
            addError({ idReporte: 'Debes Selecionar un Tipo de reporte' })
            return
        }

        if (formReporte.campos.length <= 0) {
            addError({ campos: 'Debes selecionar por lo menos UNA opcion' })
            return
        }

        if (!verificarFormatoFecha(startDate) && startDate) {
            addError({ startDate: 'La fecha de Inicio debe tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(endDate) && endDate) {
            addError({ endDate: 'La fecha Final debe tener el formato: MM/DD/AAAA' })
            return
        }

        handlerGenerarReporte(formReporte)
    }

    return (
        <>
            <form onSubmit={onSubmit} noValidate >
                <div className="rounded shadow-xx">
                    <div className="m-0 p-0 mt-2 py-2 overflow-auto " style={{ maxWidth: '100%', maxHeight: '50vh' }}>
                        <div className="m-0 p-0 row ">
                            <div className="col-4 mb-1">
                                <label className="form-label fs-16px-login-label mb-0">Tipo de Reporte</label>
                                <select
                                    className="form-select rounded-pill fs-16px-login-input py-0"
                                    name="idReporte"
                                    value={idReporte}
                                    onChange={onInputChange}
                                >
                                    {onOptionsSelect(reportes, 'Reporte', false)}
                                </select>
                                <p className="text-danger mb-0">{errors?.idReporte}</p>
                            </div>
                            {idReporte <= 0 ||
                                <>
                                    <div className="col-4 mb-1">
                                        <label className="form-label fs-16px-login-label mb-0">Campos</label>
                                        <select
                                            multiple={true}
                                            size="3"
                                            className="form-select rounded-1 fs-16px-login-input py-0 m-0 p-0"
                                            name="campos"
                                            value={campos}
                                            readOnly={true}
                                            onMouseDown={(event) => onSelectMultipleChange(event, idReporte == 1 ? campos1 : campos2, campos)}
                                        >
                                            {onOptionsSelect(idReporte == 1 ? campos1 : campos2, 'Seleccionar Todo', false)}
                                        </select>
                                        <p className="text-danger mb-0">{errors?.campos}</p>
                                    </div>

                                    <div className="col-4 mb-1">
                                        <div className="mb-1">
                                            <label className="form-label fs-16px-login-label mb-0">Rango de fechas (Opcional)</label>
                                            <div className="d-flex justify-content-center align-content-center align-items-center">
                                                {/* <label className="form-label fs-16px-login-input mb-0">Desde: </label> */}
                                                <input
                                                    type="date" className="form-control date rounded-2 fs-16px-login-input py-0"
                                                    placeholder="Fecha fin" name='startDate'
                                                    value={startDate}
                                                    onChange={onInputChange}
                                                />
                                                <i className="bi bi-arrow-right mx-2"></i>
                                                {/* <label className="form-label fs-16px-login-input mb-0">Hasta: </label> */}
                                                <input
                                                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                                                    placeholder="Fecha de inicio" name='endDate'
                                                    value={endDate}
                                                    onChange={onInputChange}
                                                />
                                            </div>
                                            <p className="text-danger mb-0">{errors?.startDate}</p>
                                            <p className="text-danger mb-0">{errors?.endDate}</p>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        {idReporte <= 0 ||
                            <div className="m-0 p-0 row ">
                                <div className="col-3 mb-1">
                                    <label className="form-label fs-16px-login-label mb-0">Sindicato (Opcional)</label>
                                    <select
                                        multiple={true}
                                        size="3"
                                        className="form-select rounded-1 fs-16px-login-input py-0"
                                        name="sindicatos"
                                        readOnly={true}
                                        value={sindicatos}
                                        onMouseDown={(event) => onSelectMultipleChange(event, allSindicatos, sindicatos)}
                                    >
                                        {onOptionsSelect(allSindicatos, 'Todas las Opciones', false)}
                                    </select>
                                    <p className="text-danger mb-0">{errors?.sindicato}</p>
                                </div>
                                <div className="col-4 mb-1">
                                    <label className="form-label fs-16px-login-label mb-0">Tipo Negociacion (Opcional)</label>
                                    <select
                                        multiple={true}
                                        size="3"
                                        className="form-select rounded-1 fs-16px-login-input py-0 m-0 p-0"
                                        name="tiposNegociaciones"
                                        readOnly={true}
                                        value={tiposNegociaciones}
                                        onMouseDown={(event) => onSelectMultipleChange(event, idReporte == 1 ? vinculaciones : tiposNegociacionesBySindicatosIds, tiposNegociaciones)}
                                    >
                                        {onOptionsSelect(idReporte == 1 ? vinculaciones : tiposNegociacionesBySindicatosIds, 'Seleccionar todo', false)}
                                    </select>
                                    <p className="text-danger mb-0">{errors?.tipoNegociacion}</p>
                                </div>

                                <div className="col-5 mb-1">
                                    <label className="form-label fs-16px-login-label mb-0">Negociacion (Opcional)</label>
                                    <select
                                        multiple={true}
                                        size="3"
                                        className="form-select rounded-1 fs-16px-login-input py-0 m-0 p-0"
                                        name="negociaciones"
                                        readOnly={true}
                                        value={negociaciones}
                                        onMouseDown={(event) => onSelectMultipleChange(event, idReporte == 1 ? tiposAuxiliosIndividuales : negociacionesByTiposNegociacionesIds, negociaciones)}
                                    >
                                        {onOptionsSelect(idReporte == 1 ? tiposAuxiliosIndividuales : negociacionesByTiposNegociacionesIds, 'Seleccionar todo', false)}
                                    </select>
                                    <p className="text-danger mb-0">{errors?.negociacion}</p>
                                </div>
                            </div>
                        }
                        {idReporte <= 0 ||
                            <div className="m-0 p-0 row">
                                {idReporte < 1 ||
                                    <div className="col-4 mb-1">
                                        <label className="form-label fs-16px-login-label mb-0">Estado del Auxilio (Opcional)</label>
                                        <select
                                            multiple={true}
                                            size="3"
                                            className="form-select rounded-1 fs-16px-login-input py-0 m-0 p-0"
                                            name="estados"
                                            readOnly={true}
                                            value={estados}
                                            onMouseDown={(event) => onSelectMultipleChange(event, allEstadosAuxilios, estados)}
                                        >
                                            {onOptionsSelect(allEstadosAuxilios, 'Seleccionar todo', false)}
                                        </select>
                                        <p className="text-danger mb-0">{errors?.estado}</p>
                                    </div>
                                }
                                {idReporte == 1 &&
                                    <div className="mb-1 col-4">
                                        <label className="form-label fs-16px-login-label mb-0">Identificacion del Funcionario (Opcional)</label>
                                        <input
                                            type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                                            placeholder="Identificacion del Funcionario" name='idFuncionario'
                                            value={idFuncionario}
                                            onChange={onInputChange}
                                        />
                                        <p className="text-danger mb-0">{errors?.idFuncionario}</p>
                                    </div>
                                }
                            </div>
                        }


                    </div>

                    <hr className="m-0 p-0" />

                    <div className="">
                        <OptionsReporte
                            dataReporte={dataReporte}
                            onSubmit={onSubmit}
                        />
                    </div>
                </div>

            </form>
        </>
    )
}