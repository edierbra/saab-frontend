import { useEffect, useState } from "react";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { Divider } from "../layout/divider"

export const DatosTipoAuxilioForm = ({ onOptionsSelect, auxilioForm, setAuxilioForm, onInputChange }) => {

    const { semestres, motivosIncapacidades, motivosJubilaciones, parentescos, estudiosFormales,
        programasbyestudioformal, initialTipoAuxilioIndividual, tiposAuxiliosIndividualesBySindicatoId,
        beneficiariosEstudio } = useOthersEntities();

    const { id, fechaSolicitud, fechaViabilidad, resolucion, fechaResolucion, rdp, fechaRdp, valor, valorTransporteRegreso,
        diasDesplazamiento, lugarDesplazamiento, fechaRenuncia, fechaAceptacionRenuncia, fechaInicioIncapacidad,
        fechaFinIncapacidad, valorMatricula, promedio, fechaReciboMatricula, referenciaReciboMatricula,
        observacion, idFuncionario, idMotivoJubilacion, idMotivoIncapacidad, idSemestre, idEstadoAuxilio,
        idParentesco, idEstudioFormal, idPrograma, idSindicato, idTipoAuxilioIndividual } = auxilioForm;

    const [date, setDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [tipoSelect, setTipoSelect] = useState(initialTipoAuxilioIndividual);
    const { idTS, nombreTS } = tipoSelect;

    useEffect(() => {
        setTipoSelect(tiposAuxiliosIndividualesBySindicatoId.find(tipo =>
            tipo.id == idTipoAuxilioIndividual
        ));

    }, [idTipoAuxilioIndividual])

    useEffect(() => {
        setAuxilioForm(
            {
                ...auxilioForm,
                idPrograma: 0
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
        return tipoSelect?.id == id ? "mb-1" : "d-none";
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
                />
            </div>

            <div className={selectInputs(1)}>
                <label className="form-label fs-16px-login-label mb-0">Valor Transporte de Regreso</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Valor Transporte de Regreso" name='valorTransporteRegreso' value={valorTransporteRegreso}
                    onChange={onInputChange}
                />
            </div>

            <div className={selectInputs(1)}>
                <label className="form-label fs-16px-login-label mb-0">Lugar del Desplazamiento</label>
                <input
                    type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Lugar del Desplazamiento" name='lugarDesplazamiento' value={lugarDesplazamiento}
                    onChange={onInputChange}
                />
            </div>

            <div className={selectInputs(1)}>
                <label className="form-label fs-16px-login-label mb-0">Dias de Desplazamiento</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Dias de Desplazamiento" name='diasDesplazamiento' value={diasDesplazamiento}
                    onChange={onInputChange}
                />
            </div>

            <div className={selectInputs(2)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha de la Renuncia</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha de la Renuncia" name='fechaRenuncia' value={fechaRenuncia}
                    onChange={onInputChange}
                />
            </div>

            <div className={selectInputs(2)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha Aceptacion de la Renuncia</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Aceptacion de la Renuncia" name='fechaAceptacionRenuncia' value={fechaAceptacionRenuncia}
                    onChange={onInputChange}
                />
            </div>

            <div className={selectInputs(4)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha Inicio Incapacidada</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Inicio Incapacidada" name='fechaInicioIncapacidad' value={fechaInicioIncapacidad}
                    onChange={onInputChange}
                />
            </div>

            <div className={selectInputs(4)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha Fin Incapacidada</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Fin Incapacidada" name='fechaFinIncapacidad' value={fechaFinIncapacidad}
                    onChange={onInputChange}
                />
            </div>

            <div className={selectInputs(6)}>
                <label className="form-label fs-16px-login-label mb-0">Estudio formal</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idEstudioFormal"
                    onChange={onInputChange}
                >
                    {onOptionsSelect(estudiosFormales, 'Estudio formal')}
                </select>
            </div>

            <div className={selectInputs(6)}>
                <label className="form-label fs-16px-login-label mb-0">Programa</label>
                <select
                    disabled={idEstudioFormal == "0"}
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idPrograma"
                    onChange={onInputChange}
                >
                    {onOptionsSelect(programasbyestudioformal, "Tipo de Auxilio")}
                </select>
            </div>

            <div className={selectInputs(6)}>
                <label className="form-label fs-16px-login-label mb-0">Semestre</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idSemestre"
                    onChange={onInputChange}
                >
                    {onOptionsSelect(semestres, 'Semestre')}
                </select>
            </div>

            <div className={selectInputs(6)}>
                <label className="form-label fs-16px-login-label mb-0">Beneficiario estudio</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idBeneficiarioEstudio"
                    onChange={onInputChange}
                >
                    {onOptionsSelect(beneficiariosEstudio, 'Beneficiario estudio')}
                </select>
            </div>

            <div className={selectInputs(6)}>
                <label className="form-label fs-16px-login-label mb-0">Fecha recibo matricula</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha Recibo Matricula" name='fechaReciboMatricula' value={fechaReciboMatricula}
                    onChange={onInputChange}
                />
            </div>

            <div className={selectInputs(6)}>
                <label className="form-label fs-16px-login-label mb-0">Referencia recibo matricula</label>
                <input
                    type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Referencia recibo matricula" name='referenciaReciboMatricula' value={referenciaReciboMatricula}
                    onChange={onInputChange}
                />
            </div>

            <div className={selectInputs(6)}>
                <label className="form-label fs-16px-login-label mb-0">Valor Matricula</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Valor Matricula" name='valorMatricula' value={valorMatricula}
                    onChange={onInputChange}
                />
            </div>

            <div className={selectInputs(6)}>
                <label className="form-label fs-16px-login-label mb-0">Promedio</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Promedio" name='promedio' value={promedio}
                    onChange={onInputChange}
                />
            </div>

            <div className={selectInputs(2)}>
                <label className="form-label fs-16px-login-label mb-0">Motivo jubilacion</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idMotivoJubilacion"
                    onChange={onInputChange}
                >
                    {onOptionsSelect(motivosJubilaciones, 'Motivo jubilacion')}
                </select>
            </div>

            <div className={selectInputs(4)}>
                <label className="form-label fs-16px-login-label mb-0">Motivo incapacidad</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idMotivoIncapacidad"
                    onChange={onInputChange}
                >
                    {onOptionsSelect(motivosIncapacidades, 'Motivo incapacidad')}
                </select>
            </div>

            <div className={selectInputs(3)}>
                <label className="form-label fs-16px-login-label mb-0">Parentesco</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idParentesco"
                    onChange={onInputChange}
                >
                    {onOptionsSelect(parentescos, 'Parentesco')}
                </select>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Observacion</label>
                <textarea
                    type="number" className="form-control date rounded-5 fs-16px-login-input py-0"
                    placeholder="Observacion" name='observacion' value={observacion}
                    onChange={onInputChange}
                />
            </div>


        </>
    )
}