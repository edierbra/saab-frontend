import { useEffect, useState } from "react";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { Divider } from "../layout/Divider"
import { onOptionsSelect } from "../recursos/Funciones";
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";

export const DatosTipoAuxilioForm = ({ onlyShow, funcionarioForm, auxilioForm, setAuxilioForm, onInputChange, initialAuxiliosIndividualForm }) => {

    const { semestres, motivosIncapacidades, motivosJubilaciones, parentescos, estudiosFormales,
        programasbyestudioformal, initialOthersEntities, tiposAuxiliosIndividualesBySindicatoId,
        beneficiariosEstudio, getTiposAuxiliosIndividualesBySindicatoId, getProgramasByIdEstudioFormal 
    } = useOthersEntities();

    const { errors, clearErrors } = useAuxiliosIndividuales();

    const { id, fechaSolicitud, fechaViabilidad, resolucion, fechaResolucion, rdp, fechaRdp, valor, valorTransporteRegreso,
        diasDesplazamiento, lugarDesplazamiento, fechaRenuncia, fechaAceptacionRenuncia, fechaInicioIncapacidad,
        fechaFinIncapacidad, valorMatricula, promedio, fechaReciboMatricula, referenciaReciboMatricula,
        observacion, idFuncionario, idMotivoJubilacion, idMotivoIncapacidad, idSemestre, idEstadoAuxilio,
        idParentesco, idEstudioFormal, idPrograma, idSindicato, idTipoAuxilioIndividual, fechaOtorgamientoAnteojos,
        diasIncapacidad, fechaOpcionalCalculo, idBeneficiarioEstudio } = auxilioForm;

    const [tipoSelect, setTipoSelect] = useState(initialOthersEntities);
    const [diferenceInDays, setDiferenceInDays] = useState("")

    useEffect(() => {
        setTipoSelect(tiposAuxiliosIndividualesBySindicatoId.find(tipo =>
            tipo.id == idTipoAuxilioIndividual
        ));

        const { idFuncionario: idFun, id: idAux, idSindicato: idSin, idTipoAuxilioIndividual: idTipoAux } = auxilioForm;
        setAuxilioForm({
            ...initialAuxiliosIndividualForm,
            idFuncionario: idFun,
            id: idAux,
            idSindicato:idSin,
            idTipoAuxilioIndividual: idTipoAux,
        })

        clearErrors()
    }, [idTipoAuxilioIndividual])

    useEffect(() => {
        const { idFuncionario: idFun, id: idAux, idSindicato: idSin } = auxilioForm;
        setAuxilioForm({
            ...initialAuxiliosIndividualForm,
            idFuncionario: idFun,
            id: idAux,
            idSindicato: idSin
        })

    }, [idSindicato])

    useEffect(() => {
        setAuxilioForm(
            {
                ...auxilioForm,
                diasIncapacidad: diferenceInDays
            }
        )
    }, [diferenceInDays])

    useEffect(() => {
        setAuxilioForm(
            {
                ...auxilioForm,
            }
        )
    }, [idEstudioFormal])

    const selectInputs = (id) => {
        // 1 = DESPLAZAMIENTO
        // 2 = JUBILACION
        // 3 = FUNERARIO
        // 4 = INCAPACIDAD
        // 5 = ANTEOJOS
        // 6 = APOYO ECONOMICO ESTUDIO
        if (auxilioForm == 6) {
            // 1 = TRABAJADOR OFICIAL
            // 2 = EMPLEADO PUBLICO
            // 3 = ASISTENCIAL
        }
        return tipoSelect?.id == id ? "mb-1" : "d-none";
    }

    useEffect(() => {
        diferenceDays(fechaInicioIncapacidad, fechaFinIncapacidad)
    }, [, fechaFinIncapacidad, fechaInicioIncapacidad])

    const diferenceDays = (fecha1, fecha2) => {
        const miliseconsByDay = 1000 * 60 * 60 * 24;
        const difeInDays = Math.floor((new Date(fecha2) - new Date(fecha1)) / miliseconsByDay);
        (!difeInDays && difeInDays != 0) ? setDiferenceInDays('') : (
            difeInDays < 0 ? setDiferenceInDays(difeInDays - 1) : setDiferenceInDays(difeInDays + 1)
        )
    }

    return (
        <>
            <Divider content={'Datos del Auxilio'} />

            <div className="mb-1 d-none">
                <label className="form-label fs-16px-login-label mb-0">Id</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Id" name='idFuncionario' value={funcionarioForm?.id}
                    onChange={onInputChange} disabled={onlyShow}
                />
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Fecha de Solicitud</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha de la Solicutud" name='fechaSolicitud' value={fechaSolicitud}
                    onChange={onInputChange} disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.fechaSolicitud}</p>
            </div>

            <div className={selectInputs(1)}>
                <label className="form-label fs-16px-login-label mb-0">Valor Transporte de Regreso</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Valor Transporte de Regreso" name='valorTransporteRegreso' value={valorTransporteRegreso}
                    onChange={onInputChange} disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.valorTransporteRegreso}</p>
            </div>
            
            <div className={selectInputs(1)}>
                <label className="form-label fs-16px-login-label mb-0">Lugar del Desplazamiento</label>
                <input
                    type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Lugar del Desplazamiento" name='lugarDesplazamiento' value={lugarDesplazamiento}
                    onChange={onInputChange} disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.lugarDesplazamiento}</p>
            </div>

            <div className={selectInputs(1)}>
                <label className="form-label fs-16px-login-label mb-0">Dias de Desplazamiento</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Dias de Desplazamiento" name='diasDesplazamiento' value={diasDesplazamiento}
                    onChange={onInputChange} disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.diasDesplazamiento}</p>
            </div>

            <div className={selectInputs(2)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha de la Renuncia</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha de la Renuncia" name='fechaRenuncia' value={fechaRenuncia}
                    onChange={onInputChange} disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.fechaRenuncia}</p>
            </div>

            <div className={selectInputs(2)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha Aceptacion de la Renuncia</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Aceptacion de la Renuncia" name='fechaAceptacionRenuncia' value={fechaAceptacionRenuncia}
                    onChange={onInputChange} disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.fechaAceptacionRenuncia}</p>
            </div>

            <div className={selectInputs(4)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha Inicio Incapacidada</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Inicio Incapacidada" name='fechaInicioIncapacidad' value={fechaInicioIncapacidad}
                    onChange={onInputChange} disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.fechaInicioIncapacidad}</p>
            </div>

            <div className={selectInputs(4)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha Fin Incapacidada</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Fin Incapacidada" name='fechaFinIncapacidad' value={fechaFinIncapacidad}
                    onChange={onInputChange} disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.fechaFinIncapacidad}</p>
            </div>

            <div className={selectInputs(4)}>
                <label className="form-label fs-16px-login-label mb-0">Dias de incapacidad</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Dias de incapacidad" name='diasIncapacidad' value={diasIncapacidad}
                    onChange={onInputChange}  disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.diasIncapacidad}</p>
            </div>

            <div className={selectInputs(5)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha otorgamiento anteojos</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha otorgamiento anteojos" name='fechaOtorgamientoAnteojos' value={fechaOtorgamientoAnteojos}
                    onChange={onInputChange} disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.fechaOtorgamientoAnteojos}</p>
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Estudio formal</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idEstudioFormal" onChange={onInputChange} 
                    disabled={onlyShow}  value={idEstudioFormal}
                >
                    {onOptionsSelect(estudiosFormales, 'Estudio formal', false)}
                </select>
                <p className="text-danger mb-0">{errors?.idEstudioFormal}</p>
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Programa</label>
                <select
                    disabled={idEstudioFormal == "0" || onlyShow}
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idPrograma" onChange={onInputChange}  value={idPrograma}
                >
                    {onOptionsSelect(programasbyestudioformal, "Programa", false)}
                </select>
                <p className="text-danger mb-0">{errors?.idPrograma}</p>
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Semestre</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idSemestre" onChange={onInputChange}
                    disabled={onlyShow} value={idSemestre}
                >
                    {onOptionsSelect(semestres, 'Semestre', false)}
                </select>
                <p className="text-danger mb-0">{errors?.idSemestre}</p>
            </div>

            {/* !(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none' */}
            <div className={selectInputs(6)}>
                <label className="form-label fs-16px-login-label mb-0">Beneficiario estudio</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idBeneficiarioEstudio" onChange={onInputChange}
                    disabled={onlyShow} value={idBeneficiarioEstudio}
                >
                    {onOptionsSelect(beneficiariosEstudio, 'Beneficiario estudio', false)}
                </select>
                <p className="text-danger mb-0">{errors?.idBeneficiarioEstudio}</p>
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Fecha recibo matricula</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Recibo Matricula" name='fechaReciboMatricula' value={fechaReciboMatricula}
                    onChange={onInputChange} disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.fechaReciboMatricula}</p>
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Referencia recibo matricula</label>
                <input
                    type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Referencia recibo matricula" name='referenciaReciboMatricula' value={referenciaReciboMatricula}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.referenciaReciboMatricula}</p>
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Valor Matricula</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Valor Matricula" name='valorMatricula' value={valorMatricula}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.valorMatricula}</p>
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Promedio</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Promedio" name='promedio' value={promedio}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.promedio}</p>
            </div>

            <div className={selectInputs(2)}>
                <label className="form-label fs-16px-login-label mb-0">Motivo jubilacion</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idMotivoJubilacion"
                    onChange={onInputChange}
                    disabled={onlyShow}
                    value={idMotivoJubilacion}
                >
                    {onOptionsSelect(motivosJubilaciones, 'Motivo jubilacion', false)}
                </select>
                <p className="text-danger mb-0">{errors?.idMotivoJubilacion}</p>
            </div>

            <div className={selectInputs(4)}>
                <label className="form-label fs-16px-login-label mb-0">Motivo incapacidad</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idMotivoIncapacidad"
                    onChange={onInputChange}
                    disabled={onlyShow}
                    value={idMotivoIncapacidad}
                >
                    {onOptionsSelect(motivosIncapacidades, 'Motivo incapacidad', false)}
                </select>
                <p className="text-danger mb-0">{errors?.idMotivoIncapacidad}</p>
            </div>

            <div className={selectInputs(3)}>
                <label className="form-label fs-16px-login-label mb-0">Parentesco</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idParentesco"
                    onChange={onInputChange}
                    disabled={onlyShow}
                    value={idParentesco}
                >
                    {onOptionsSelect(parentescos, 'Parentesco', false)}
                </select>
                <p className="text-danger mb-0">{errors?.idParentesco}</p>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Observacion</label>
                <textarea
                    type="number" className="form-control date rounded-4 fs-16px-login-input py-0"
                    placeholder="Observacion" name='observacion' value={observacion}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
                <p className="text-danger mb-0">{errors?.observacion}</p>
            </div>


        </>
    )
}