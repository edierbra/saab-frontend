import { useEffect, useState } from "react"
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { FuncionarioForm } from "./FuncionarioForm";
import { TipoAuxilioForm } from "./TipoAuxilioForm";
import { DatosTipoAuxilioForm } from "./DatosTipoAuxilioForm";
import { ValorAuxilioForm } from "./ValorAuxilioForm";

export const AuxilioIndividualForm = ({ auxiliosIndividualSelected, handlerCloseForm, funcionarioSearch, handlerRemoveUserSearch }) => {

    const { initialAuxiliosIndividualForm, handlerAddAuxilioIndividual, onlyShow } = useAuxiliosIndividuales();
    const { initialFuncionarioForm } = useFuncionarios();
    const { tiposAuxiliosIndividuales, tiposAuxiliosIndividualesBySindicatoId, sindicatos,
        getTiposAuxiliosIndividualesBySindicatoId, getProgramasByIdEstudioFormal } = useOthersEntities();

    const [auxilioForm, setAuxilioForm] = useState(initialAuxiliosIndividualForm);
    const [funcionarioForm, setFuncionarioForm] = useState(initialFuncionarioForm);

    const { id, fechaSolicitud, fechaViabilidad, resolucion, fechaResolucion, rdp, fechaRdp, valor, valorTransporteRegreso,
        diasDesplazamiento, lugarDesplazamiento, fechaRenuncia, fechaAceptacionRenuncia, fechaInicioIncapacidad,
        fechaFinIncapacidad, valorMatricula, promedio, fechaReciboMatricula, referenciaReciboMatricula,
        observacion, idFuncionario, idMotivoJubilacion, idMotivoIncapacidad, idSemestre, idEstadoAuxilio,
        idParentesco, idEstudioFormal, idPrograma, idSindicato, idTipoAuxilioIndividual, fechaOtorgamientoAnteojos,
        diasIncapacidad, fechaOpcionalCalculo } = auxilioForm;

    useEffect(() => {
        setAuxilioForm({ ...auxiliosIndividualSelected });
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
    }, [funcionarioSearch])

    useEffect(() => {
        getTiposAuxiliosIndividualesBySindicatoId(idSindicato);
    }, [, idSindicato])


    const onOptionsSelect = (objetoIdNombre, defaultOption, identificador) => {

        if (!objetoIdNombre) return null // Manejar el caso en que funcionarioForm es null o undefined

        const options = (
            <>
                <option
                    key='0'
                    value='0'>
                    {defaultOption}
                </option>
                {Array.isArray(objetoIdNombre) ? (
                    objetoIdNombre.map(({ id, nombre }) => (
                        <option
                            key={id}
                            value={id}
                        // selected={identificador == id}
                        >
                            {nombre}
                        </option>
                    ))
                ) : (
                    (objetoIdNombre?.nombre && objetoIdNombre?.id) && (
                        <option
                            key={objetoIdNombre?.id}
                            value={objetoIdNombre?.id}
                        // selected={identificador == objetoIdNombre?.id}
                        >
                            {objetoIdNombre.nombre}
                        </option>
                    )
                )}
            </>
        );

        return options;
    };

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
        console.log(auxilioForm)
        handlerAddAuxilioIndividual(auxilioForm) // Guardar el userFrom en userList
    }

    const onCloseForm = () => {
        setAuxilioForm(initialAuxiliosIndividualForm);
        setFuncionarioForm(initialFuncionarioForm);
        handlerRemoveUserSearch();
        handlerCloseForm();
    }

    return (
        <>
            <form onSubmit={onSubmit} noValidate disabled>
                <div className="row ">
                    <div className="col mb-0 overflow-auto " style={{ height: '55vh' }}>

                        <FuncionarioForm
                            auxilioForm={auxilioForm}
                            setAuxilioForm={setAuxilioForm}
                            funcionarioForm={funcionarioForm}
                            onOptionsSelect={onOptionsSelect}
                            onInputChange={onInputChange}
                            handlerRemoveUserSearch={handlerRemoveUserSearch}
                        />
                    </div>
                    <div className="col mb-0 overflow-auto " style={{ height: '55vh' }}>
                        <TipoAuxilioForm
                            auxilioForm={auxilioForm}
                            setAuxilioForm={setAuxilioForm}
                            tiposAuxiliosIndividuales={tiposAuxiliosIndividuales}
                            tiposAuxiliosIndividualesBySindicatoId={tiposAuxiliosIndividualesBySindicatoId}
                            onOptionsSelect={onOptionsSelect}
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
                                    onOptionsSelect={onOptionsSelect}
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