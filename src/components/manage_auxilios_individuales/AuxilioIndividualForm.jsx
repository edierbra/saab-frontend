import { useEffect, useState } from "react"
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { Divider } from "../layout/divider";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { useTiposAuxiliosIndividuales } from "../../hooks/useTiposAuxiliosIndividuales";
import { FuncionarioForm } from "./FuncionarioForm";
import { TipoAuxilioForm } from "./TipoAuxilioForm";

export const AuxilioIndividualForm = ({ userSelected, handlerCloseForm, funcionarioSearch }) => {

    const { initialUserForm, handlerAddUser } = useAuxiliosIndividuales();
    const { initialFuncionarioForm } = useFuncionarios();
    const { tiposAuxiliosIndividuales } = useTiposAuxiliosIndividuales();

    const [userForm, setUserForm] = useState(initialUserForm);
    const [funcionarioForm, setFuncionarioForm] = useState(initialFuncionarioForm);

    const { id, fechaSolicitud, fechaViabilidad,
        resolucion, fechaResolucion, rdp, fechaRdp, valor,
        valorTransporteRegreso, diasDesplazamiento,
        lugarDesplazamiento, fechaRenuncia, fechaAceptacionRenuncia,
        fechaInicioIncapacidad, fechaFinIncapacidad, valorMatricula,
        promedio, fechaReciboMatricula, referenciaReciboMatricula,
        observacion, funcionario, motivoJubilacion, motivoIncapacidad,
        semestre, estadoAuxilio, parentesco, estudioFormal, programa,
        sindicato, tipoAuxilioIndividual } = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: '',
        })
    }, [userSelected])

    useEffect(() => {
        setFuncionarioForm({
            ...funcionarioSearch
        })
    }, [funcionarioSearch])

    const onInputChange = ({ target }) => {

        const { name, value } = target;
        setUserForm(
            {
                ...userForm,
                [name]: value
            }
        )
        console.log(userForm)
    }

    const onInputChangeFuncionario = ({ target }) => {

        const { name, value } = target;
        setUserForm(
            {
                ...userForm,
                funcionario: {
                    ...funcionario,
                    [name]: value,
                },
            }
        )
        console.log(userForm)
    }

    const onOptionsSelect = (objetoIdNombre, defaultOption) => {

        if (!objetoIdNombre) return null // Manejar el caso en que funcionarioForm es null o undefined

        const options = (
            <>
                <option value='0'>{defaultOption}</option>
                {objetoIdNombre?.length > 1 ? (
                    objetoIdNombre.map(({ id, nombre }) => (
                        <option key={id} value={id}>{nombre}</option>
                    ))
                ) : (
                    (objetoIdNombre?.nombre && objetoIdNombre?.id) && (
                        <option
                            selected={id == 0 || "true"}
                            key={objetoIdNombre.id}
                            value={objetoIdNombre.id}>
                            {objetoIdNombre.nombre}
                        </option>
                    )
                )}
            </>
        );

        return options;
    };


    const onSubmit = (event) => {
        event.preventDefault();
        handlerAddUser(userForm) // Guardar el userFrom en userList
    }

    const onCloseForm = () => {
        setUserForm(initialUserForm);
        setFuncionarioForm(initialFuncionarioForm)
        handlerCloseForm();
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                {/* <input
                    className="form-control m-0 w-100"
                    type="text"
                    value={username}
                    name="username"
                    placeholder="username"
                    onChange={onInputChangeText}
                />
                <p className="text-danger">{errors?.username}</p> */}
                <div className="row mb-3 overflow-auto " style={{ height: '60vh' }}>
                    <div className="col">

                        <FuncionarioForm
                            funcionarioForm={funcionarioForm}
                            onOptionsSelect={onOptionsSelect} />
                    </div>
                    <div className="col">

                        <TipoAuxilioForm
                            tiposAuxiliosIndividuales={tiposAuxiliosIndividuales}
                            onOptionsSelect={onOptionsSelect} />
                        <Divider content={'Datos del Auxilio'} />

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