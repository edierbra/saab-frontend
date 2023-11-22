import { useEffect, useState } from "react";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { Divider } from "../layout/divider"

export const DatosTipoAuxilioForm = ({ onlyShow, onOptionsSelect, funcionarioForm, auxilioForm, setAuxilioForm, onInputChange, initialAuxiliosIndividualForm }) => {

    const { semestres, motivosIncapacidades, motivosJubilaciones, parentescos, estudiosFormales,
        programasbyestudioformal, initialOthersEntities, tiposAuxiliosIndividualesBySindicatoId,
        beneficiariosEstudio, getTiposAuxiliosIndividualesBySindicatoId, getProgramasByIdEstudioFormal } = useOthersEntities();

    const { id, fechaSolicitud, fechaViabilidad, resolucion, fechaResolucion, rdp, fechaRdp, valor, valorTransporteRegreso,
        diasDesplazamiento, lugarDesplazamiento, fechaRenuncia, fechaAceptacionRenuncia, fechaInicioIncapacidad,
        fechaFinIncapacidad, valorMatricula, promedio, fechaReciboMatricula, referenciaReciboMatricula,
        observacion, idFuncionario, idMotivoJubilacion, idMotivoIncapacidad, idSemestre, idEstadoAuxilio,
        idParentesco, idEstudioFormal, idPrograma, idSindicato, idTipoAuxilioIndividual, fechaOtorgamientoAnteojos,
        diasIncapacidad, fechaOpcionalCalculo, idBeneficiarioEstudio } = auxilioForm;

    const [date, setDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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
                idPrograma: 0
            }
        )
    }, [idEstudioFormal])

    useEffect(() => {
        setAuxilioForm(
            {
                ...auxilioForm,
                diasIncapacidad: diferenceInDays
            }
        )
    }, [diferenceInDays])

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

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Fecha de la Solicitud</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha de la Solicutud" name='fechaSolicitud' value={fechaSolicitud}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={selectInputs(1)}>
                <label className="form-label fs-16px-login-label mb-0">Valor Transporte de Regreso</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Valor Transporte de Regreso" name='valorTransporteRegreso' value={valorTransporteRegreso}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={selectInputs(1)}>
                <label className="form-label fs-16px-login-label mb-0">Lugar del Desplazamiento</label>
                <input
                    type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Lugar del Desplazamiento" name='lugarDesplazamiento' value={lugarDesplazamiento}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={selectInputs(1)}>
                <label className="form-label fs-16px-login-label mb-0">Dias de Desplazamiento</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Dias de Desplazamiento" name='diasDesplazamiento' value={diasDesplazamiento}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={selectInputs(2)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha de la Renuncia</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha de la Renuncia" name='fechaRenuncia' value={fechaRenuncia}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={selectInputs(2)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha Aceptacion de la Renuncia</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Aceptacion de la Renuncia" name='fechaAceptacionRenuncia' value={fechaAceptacionRenuncia}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={selectInputs(4)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha Inicio Incapacidada</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Inicio Incapacidada" name='fechaInicioIncapacidad' value={fechaInicioIncapacidad}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={selectInputs(4)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha Fin Incapacidada</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Fin Incapacidada" name='fechaFinIncapacidad' value={fechaFinIncapacidad}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={selectInputs(4)}>
                <label className="form-label fs-16px-login-label mb-0">Dias de incapacidad</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Dias de incapacidad" name='diasIncapacidad' value={diasIncapacidad}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={selectInputs(5)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha otorgamiento anteojos</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha otorgamiento anteojos" name='fechaOtorgamientoAnteojos' value={fechaOtorgamientoAnteojos}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Estudio formal</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idEstudioFormal"
                    onChange={onInputChange}
                    disabled={onlyShow}
                    value={idEstudioFormal}
                >
                    {onOptionsSelect(estudiosFormales, 'Estudio formal', idEstudioFormal)}
                </select>
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Programa</label>
                <select
                    disabled={idEstudioFormal == "0" || onlyShow}
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idPrograma"
                    onChange={onInputChange}
                    value={idPrograma}
                >
                    {onOptionsSelect(programasbyestudioformal, "Tipo de Auxilio", idPrograma)}
                </select>
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Semestre</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idSemestre"
                    onChange={onInputChange}
                    disabled={onlyShow}
                    value={idSemestre}
                >
                    {onOptionsSelect(semestres, 'Semestre', idSemestre)}
                </select>
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Beneficiario estudio</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idBeneficiarioEstudio"
                    onChange={onInputChange}
                    disabled={onlyShow}
                    value={idBeneficiarioEstudio}
                >
                    {onOptionsSelect(beneficiariosEstudio, 'Beneficiario estudio', idBeneficiarioEstudio)}
                </select>
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Fecha recibo matricula</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Recibo Matricula" name='fechaReciboMatricula' value={fechaReciboMatricula}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Referencia recibo matricula</label>
                <input
                    type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Referencia recibo matricula" name='referenciaReciboMatricula' value={referenciaReciboMatricula}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Valor Matricula</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Valor Matricula" name='valorMatricula' value={valorMatricula}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>

            <div className={!(funcionarioForm.vinculacion?.id == 1)? selectInputs(6) : 'd-none'}>
                <label className="form-label fs-16px-login-label mb-0">Promedio</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Promedio" name='promedio' value={promedio}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
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
                    {onOptionsSelect(motivosJubilaciones, 'Motivo jubilacion', idMotivoJubilacion)}
                </select>
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
                    {onOptionsSelect(motivosIncapacidades, 'Motivo incapacidad', idMotivoIncapacidad)}
                </select>
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
                    {onOptionsSelect(parentescos, 'Parentesco', idParentesco)}
                </select>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Observacion</label>
                <textarea
                    type="number" className="form-control date rounded-4 fs-16px-login-input py-0"
                    placeholder="Observacion" name='observacion' value={observacion}
                    onChange={onInputChange}
                    disabled={onlyShow}
                />
            </div>


        </>
    )
}