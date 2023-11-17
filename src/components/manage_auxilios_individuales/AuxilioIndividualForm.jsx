import { useEffect, useState } from "react"
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { Divider } from "../layout/divider";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { FuncionarioForm } from "./FuncionarioForm";
import { TipoAuxilioForm } from "./TipoAuxilioForm";
import { DatosTipoAuxilioForm } from "./DatosTipoAuxilioForm";
import { ValorAuxilioForm } from "./ValorAuxilioForm";

export const AuxilioIndividualForm = ({ userSelected, handlerCloseForm, funcionarioSearch, handlerRemoveUserSearch }) => {

    const { initialUserForm, handlerAddUser } = useAuxiliosIndividuales();
    const { initialFuncionarioForm } = useFuncionarios();
    const { tiposAuxiliosIndividuales, tiposAuxiliosIndividualesBySindicatoId, sindicatos,
        getTiposAuxiliosIndividualesBySindicatoId, getProgramasByIdEstudioFormal, initialTipoAuxilioIndividual } = useOthersEntities();

    const [auxilioForm, setAuxilioForm] = useState(initialUserForm);
    const [funcionarioForm, setFuncionarioForm] = useState(initialFuncionarioForm);

    const { id, fechaSolicitud, fechaViabilidad, resolucion, fechaResolucion, rdp, fechaRdp, valor, valorTransporteRegreso,
        diasDesplazamiento, lugarDesplazamiento, fechaRenuncia, fechaAceptacionRenuncia, fechaInicioIncapacidad,
        fechaFinIncapacidad, valorMatricula, promedio, fechaReciboMatricula, referenciaReciboMatricula,
        observacion, idFuncionario, idMotivoJubilacion, idMotivoIncapacidad, idSemestre, idEstadoAuxilio,
        idParentesco, idEstudioFormal, idPrograma, idSindicato, idTipoAuxilioIndividual } = auxilioForm;

    useEffect(() => {
        setAuxilioForm({
            ...userSelected
        })
    }, [, funcionarioSearch])

    useEffect(() => {
        getTiposAuxiliosIndividualesBySindicatoId(idSindicato);
    }, [idSindicato])

    useEffect(() => {
        getProgramasByIdEstudioFormal(idEstudioFormal);
    }, [idEstudioFormal])

    useEffect(() => {
        setFuncionarioForm({
            ...funcionarioSearch
        })

        setAuxilioForm({
            ...userSelected,
            idFuncionario: funcionarioSearch?.id,
        })
    }, [funcionarioSearch])

    const onOptionsSelect = (objetoIdNombre, defaultOption) => {

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
                        <option key={id} value={id}>{nombre}</option>
                    ))
                ) : (
                    (objetoIdNombre?.nombre && objetoIdNombre?.id) && (
                        <option
                            key={objetoIdNombre.id}
                            value={objetoIdNombre.id}
                            selected //={id == 0 || "false"}
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
        console.log(auxilioForm)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(auxilioForm)
        // handlerAddUser(auxilioForm) // Guardar el userFrom en userList
    }

    const onCloseForm = () => {
        setAuxilioForm(initialUserForm);
        setFuncionarioForm(initialFuncionarioForm);
        handlerRemoveUserSearch();
        handlerCloseForm();
    }

    return (
        <>
            <form onSubmit={onSubmit} noValidate>
                <div className="row mb-3 overflow-auto " style={{ height: '60vh' }}>
                    <div className="col">

                        <FuncionarioForm
                            funcionarioForm={funcionarioForm}
                            onOptionsSelect={onOptionsSelect}
                            onInputChange={onInputChange}
                            handlerRemoveUserSearch={handlerRemoveUserSearch}
                        />
                    </div>
                    <div className="col">
                        <TipoAuxilioForm
                            tiposAuxiliosIndividuales={tiposAuxiliosIndividuales}
                            tiposAuxiliosIndividualesBySindicatoId={tiposAuxiliosIndividualesBySindicatoId}
                            onOptionsSelect={onOptionsSelect}
                            onInputChange={onInputChange}
                            sindicatos={sindicatos}
                            idSindicato={idSindicato}
                            idTipoAuxilioIndividual={idTipoAuxilioIndividual}
                            auxilioForm={auxilioForm}
                            setAuxilioForm={setAuxilioForm}
                        />

                        {idTipoAuxilioIndividual == 0 || (
                            <>
                                <DatosTipoAuxilioForm
                                    auxilioForm={auxilioForm}
                                    setAuxilioForm={setAuxilioForm}
                                    onOptionsSelect={onOptionsSelect}
                                    onInputChange={onInputChange}
                                />

                                <ValorAuxilioForm
                                    onInputChange={onInputChange}
                                    valor={valor}
                                />
                            </>
                        )
                        }

                    </div>
                </div>

                <hr />

                <button
                    className="btn btn-login "
                    type="submit">
                    {id > 0 ? 'Editar' : 'Agregar'}
                </button>

                {!handlerCloseForm ||
                    <button
                        className="btn btn-login mx-2"
                        type="button"
                        onClick={onCloseForm}>
                        Cerrar Formulario
                    </button>
                }

            </form>
        </>
    )
}