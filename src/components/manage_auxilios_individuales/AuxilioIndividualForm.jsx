import { useEffect, useState } from "react"
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { FuncionarioForm } from "../manage_funcionarios/FuncionarioForm";
import { TipoAuxilioForm } from "./TipoAuxilioForm";
import { DatosTipoAuxilioForm } from "./DatosTipoAuxilioForm";
import { ValorAuxilioForm } from "./ValorAuxilioForm";
import { Divider } from "../layout/Divider";
import { verificarFormatoFecha } from "../recursos/Funciones";

export const AuxilioIndividualForm = ({ auxiliosIndividualSelected, handlerCloseForm }) => {

    const { initialAuxiliosIndividualForm, handlerAddAuxilioIndividual, onlyShow, addError,
        errors, valorTotal, handlerCalcularAuxilioIndividual } = useAuxiliosIndividuales();
    const { funcionarioSearch } = useFuncionarios();
    const { getTiposAuxiliosIndividualesBySindicatoId, getProgramasByIdEstudioFormal } = useOthersEntities();

    const [auxilioForm, setAuxilioForm] = useState({ initialAuxiliosIndividualForm });

    const { id, fechaSolicitud, fechaViabilidad, resolucion, fechaResolucion, rdp, fechaRdp, valor, valorTransporteRegreso,
        diasDesplazamiento, lugarDesplazamiento, fechaRenuncia, fechaAceptacionRenuncia, fechaInicioIncapacidad,
        fechaFinIncapacidad, valorMatricula, promedio, fechaReciboMatricula, referenciaReciboMatricula,
        observacion, idFuncionario, idMotivoJubilacion, idMotivoIncapacidad, idSemestre, idEstadoAuxilio,
        idParentesco, idEstudioFormal, idPrograma, idSindicato, idTipoAuxilioIndividual, fechaOtorgamientoAnteojos,
        diasIncapacidad, fechaOpcionalCalculo, idBeneficiarioEstudio } = auxilioForm;

    useEffect(() => {
        setAuxilioForm({
            ...auxiliosIndividualSelected
        });
    }, [, auxiliosIndividualSelected])

    useEffect(() => {
        setAuxilioForm(prevState => ({
            ...prevState,
            idFuncionario: funcionarioSearch?.id
        }));
    }, [funcionarioSearch])

    useEffect(() => {
        console.log(auxilioForm)
    }, [auxilioForm])

    useEffect(() => {
        const result = valorTotal.total?.result;
        console.log(result);
        if (typeof result === 'number' && !isNaN(result))
            setAuxilioForm(prevState => ({
                ...prevState,
                valor: result.toFixed(2),
            }));
    }, [valorTotal])

    useEffect(() => {
        getProgramasByIdEstudioFormal(idEstudioFormal);
    }, [, idEstudioFormal])

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

    const onCalcular = (event) => {
        event.preventDefault();
        if (!verificarFormatoFecha(fechaSolicitud) && fechaSolicitud) {
            addError({ fechaSolicitud: 'Fecha de Solicitud debe tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaOpcionalCalculo) && fechaOpcionalCalculo) {
            addError({ fechaOpcionalCalculo: 'Fecha Opcional debe tener el formato: MM/DD/AAAA' })
            return
        }

        handlerCalcularAuxilioIndividual(auxilioForm);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!verificarFormatoFecha(fechaSolicitud) && fechaSolicitud) {
            addError({ fechaSolicitud: 'La Fecha debe tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaOpcionalCalculo) && fechaOpcionalCalculo) {
            addError({ fechaOpcionalCalculo: 'La Fecha debe tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaAceptacionRenuncia) && fechaAceptacionRenuncia) {
            addError({ fechaAceptacionRenuncia: 'La Fecha debe el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaFinIncapacidad) && fechaFinIncapacidad) {
            addError({ fechaFinIncapacidad: 'La Fecha debe tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaInicioIncapacidad) && fechaInicioIncapacidad) {
            addError({ fechaInicioIncapacidad: 'La Fecha debe tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaOtorgamientoAnteojos) && fechaOtorgamientoAnteojos) {
            addError({ fechaOtorgamientoAnteojos: 'La Fecha debe tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(fechaReciboMatricula) && fechaReciboMatricula) {
            addError({ fechaReciboMatricula: 'La Fecha debe tener el formato: MM/DD/AAAA' })
            return
        }

        console.log(auxilioForm)
        handlerAddAuxilioIndividual(auxilioForm) // Guardar el userFrom en userList
    }

    const onCloseForm = () => {
        setAuxilioForm(initialAuxiliosIndividualForm);
        handlerCloseForm();
    }

    return (
        <>
            <form onSubmit={onSubmit} noValidate disabled>
                <div className="row ">
                    <div className="col mb-0 overflow-auto " style={{ maxHeight: '55vh' }}>
                        <Divider content={'Datos del Funcionario'} />
                        <p className="text-danger mb-0">{errors?.idFuncionario}</p>
                        <FuncionarioForm
                            funcionarioForm={funcionarioSearch}
                            disabled={true}
                        />
                    </div>
                    <div className="col mb-0 overflow-auto " style={{ maxHeight: '55vh' }}>
                        <TipoAuxilioForm
                            auxilioForm={auxilioForm}
                            onInputChange={onInputChange}
                            onlyShow={onlyShow}
                        />

                        {idTipoAuxilioIndividual == 0 || (
                            <>
                                <DatosTipoAuxilioForm
                                    auxilioForm={auxilioForm}
                                    setAuxilioForm={setAuxilioForm}
                                    onInputChange={onInputChange}
                                    initialAuxiliosIndividualForm={initialAuxiliosIndividualForm}
                                    funcionarioForm={funcionarioSearch}
                                    onlyShow={onlyShow}
                                />

                                <ValorAuxilioForm
                                    onInputChange={onInputChange}
                                    valor={valor}
                                    fechaOpcionalCalculo={fechaOpcionalCalculo}
                                    onlyShow={onlyShow}
                                    onCalcular={onCalcular}
                                />
                            </>
                        )}

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