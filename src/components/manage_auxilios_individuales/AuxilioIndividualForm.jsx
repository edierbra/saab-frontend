import { useEffect, useState } from "react"
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { FuncionarioForm } from "../manage_funcionarios/FuncionarioForm";
import { TipoAuxilioForm } from "./TipoAuxilioForm";
import { DatosTipoAuxilioForm } from "./DatosTipoAuxilioForm";
import { ValorAuxilioForm } from "./ValorAuxilioForm";
import Swal from "sweetalert2";
import { Divider } from "../layout/Divider";
import { SwalToastNotFound } from "../recursos/SweetAlerts";
import { verificarFormatoFecha } from "../recursos/Funciones";

export const AuxilioIndividualForm = ({ auxiliosIndividualSelected, handlerCloseForm, funcionarioSearch, handlerRemoveFuncionarioSearch }) => {

    const { initialAuxiliosIndividualForm, handlerAddAuxilioIndividual, onlyShow, addError, errors, clearErrors } = useAuxiliosIndividuales();
    const { initialFuncionarioForm } = useFuncionarios();
    const { tiposAuxiliosIndividuales, tiposAuxiliosIndividualesBySindicatoId, sindicatos,
        getTiposAuxiliosIndividualesBySindicatoId, getProgramasByIdEstudioFormal } = useOthersEntities();

    const [auxilioForm, setAuxilioForm] = useState({ initialAuxiliosIndividualForm });
    const [funcionarioForm, setFuncionarioForm] = useState({ initialFuncionarioForm });

    const { id, fechaSolicitud, fechaViabilidad, resolucion, fechaResolucion, rdp, fechaRdp, valor, valorTransporteRegreso,
        diasDesplazamiento, lugarDesplazamiento, fechaRenuncia, fechaAceptacionRenuncia, fechaInicioIncapacidad,
        fechaFinIncapacidad, valorMatricula, promedio, fechaReciboMatricula, referenciaReciboMatricula,
        observacion, idFuncionario, idMotivoJubilacion, idMotivoIncapacidad, idSemestre, idEstadoAuxilio,
        idParentesco, idEstudioFormal, idPrograma, idSindicato, idTipoAuxilioIndividual, fechaOtorgamientoAnteojos,
        diasIncapacidad, fechaOpcionalCalculo } = auxilioForm;

    if (funcionarioForm?.activo == "false") {
        handlerRemoveFuncionarioSearch()
        SwalToastNotFound("error", "Funcionario inactivo, no puede acceder a ningun auxilio")
    }

    useEffect(() => {
        setAuxilioForm({
            ...auxiliosIndividualSelected
        });
    }, [auxiliosIndividualSelected])

    useEffect(() => {
        console.log(auxilioForm)
    }, [auxilioForm])

    useEffect(() => {
        getProgramasByIdEstudioFormal(idEstudioFormal);
    }, [, idEstudioFormal])

    useEffect(() => {
        setFuncionarioForm({ // guarda el usuario buscado
            ...funcionarioSearch
        })
    }, [, funcionarioSearch])

    useEffect(() => {
        setAuxilioForm(prevState => ({
            ...prevState,
            idFuncionario: funcionarioForm?.id
        }));
    }, [funcionarioForm])

    useEffect(() => {
        getTiposAuxiliosIndividualesBySindicatoId(idSindicato);
    }, [, idSindicato])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setAuxilioForm(
            {
                ...auxilioForm,
                [name]: value
            }
        )
    }

    const onSubmit = (event) => {
        event.preventDefault(); 

        if (!verificarFormatoFecha(fechaSolicitud) && fechaSolicitud) {
            addError({ fechaSolicitud: 'La Fecha debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaOpcionalCalculo) && fechaOpcionalCalculo) {
            addError({ fechaOpcionalCalculo: 'La Fecha debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaAceptacionRenuncia) && fechaAceptacionRenuncia) {
            addError({ fechaAceptacionRenuncia: 'La Fecha debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaFinIncapacidad) && fechaFinIncapacidad) {
            addError({ fechaFinIncapacidad: 'La Fecha debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaInicioIncapacidad) && fechaInicioIncapacidad) {
            addError({ fechaInicioIncapacidad: 'La Fecha debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaOtorgamientoAnteojos) && fechaOtorgamientoAnteojos) {
            addError({ fechaOtorgamientoAnteojos: 'La Fecha debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaReciboMatricula) && fechaReciboMatricula) {
            addError({ fechaReciboMatricula: 'La Fecha debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        console.log(auxilioForm)
        handlerAddAuxilioIndividual(auxilioForm) // Guardar el userFrom en userList
    }

    const onCloseForm = () => {
        setAuxilioForm(initialAuxiliosIndividualForm);
        setFuncionarioForm(initialFuncionarioForm);
        handlerCloseForm();
    }

    return (
        <>
            <form onSubmit={onSubmit} noValidate disabled>
                <div className="row ">
                    <div className="col mb-0 overflow-auto " style={{ height: '55vh' }}>
                        <Divider content={'Datos del Funcionario'} />
                        <p className="text-danger mb-0">{errors?.idFuncionario}</p>
                        <FuncionarioForm
                            funcionarioForm={funcionarioForm}
                            disabled={true}
                        />
                    </div>
                    <div className="col mb-0 overflow-auto " style={{ height: '55vh' }}>
                        <TipoAuxilioForm
                            auxilioForm={auxilioForm}
                            setAuxilioForm={setAuxilioForm}
                            tiposAuxiliosIndividuales={tiposAuxiliosIndividuales}
                            tiposAuxiliosIndividualesBySindicatoId={tiposAuxiliosIndividualesBySindicatoId}
                            onInputChange={onInputChange}
                            sindicatos={sindicatos}
                            idSindicato={idSindicato}
                            idTipoAuxilioIndividual={idTipoAuxilioIndividual}
                            onlyShow={onlyShow}
                        />

                        {idTipoAuxilioIndividual == 0 || (
                            <>
                                <DatosTipoAuxilioForm
                                    auxilioForm={auxilioForm}
                                    setAuxilioForm={setAuxilioForm}
                                    onInputChange={onInputChange}
                                    initialAuxiliosIndividualForm={initialAuxiliosIndividualForm}
                                    funcionarioForm={funcionarioForm}
                                    onlyShow={onlyShow}
                                />

                                <ValorAuxilioForm
                                    onInputChange={onInputChange}
                                    valor={valor}
                                    fechaOpcionalCalculo={fechaOpcionalCalculo}
                                    onlyShow={onlyShow}
                                />
                            </>
                        )
                        }

                    </div>
                </div>

                <hr />
                <div className="">
                    <button
                        className={onlyShow == true ? "d-none" : "btn btn-mybotton btn-color-blue my-2 p-2"}
                        type="submit">
                        {id > 0 ? 'Editar' : 'Agregar'}
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