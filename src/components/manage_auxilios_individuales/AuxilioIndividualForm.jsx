import { useEffect, useState } from "react"
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { Divider } from "../layout/divider";
import { Search } from "../layout/Search";

export const AuxilioIndividualForm = ({ userSelected, handlerCloseForm, funcionarioSearch }) => {

    const { initialUserForm, handlerAddUser, errors, initialFuncionarioSearch } = useAuxiliosIndividuales();

    const [userForm, setUserForm] = useState(initialUserForm);

    const [funcionarioForm, setFuncionarioForm] = useState(initialFuncionarioSearch);

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


    const onSubmit = (event) => {
        event.preventDefault();
        handlerAddUser(userForm) // Guardar el userFrom en userList
    }

    const onCloseForm = () => {
        setUserForm(initialUserForm);
        setFuncionarioForm(initialFuncionarioSearch)
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

                        <Divider content={'Datos del Funcionario'} />

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Identificacion</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Identificacion del Funcionario" name='id' value={funcionarioForm?.id}
                                disabled
                            />
                        </div>

                        <div className="mb-1 ">
                            <label className="form-label fs-16px-login-label mb-0">Nombre</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Nombre del Funcionario" name='nombre' value={funcionarioForm?.nombre}
                                disabled
                            />
                        </div>

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Correo</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Correo del Funcionario" name='correo' value={funcionarioForm?.correo}
                                disabled
                            />
                        </div>

                        <select
                            className="form-select form-select-sm"
                            placeholder="De"
                        >
                            <option value='0' selected>Dependencia del Funcionario</option>
                            {funcionarioForm.dependencia?.length > 1 ?
                                funcionarioForm?.dependencia.map(({ id, nombre }) => (
                                    <option value={id}>{nombre}</option>
                                ))
                                :
                                funcionarioForm.dependencia?.nombre != '' && (
                                    <option
                                        value={funcionarioForm.dependencia?.nombre}>
                                        {funcionarioForm?.dependencia.nombre}
                                    </option>
                                )
                            }
                        </select>

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Dependencia</label>
                            <input
                                type="select" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Dependencia del Funcionario" name='dependencia' value={funcionarioForm.dependencia.nombre}
                                disabled
                            />
                        </div>

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Genero</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Genero del Funcionario" name='genero' value={funcionarioForm.genero.nombre}
                                disabled
                            />
                        </div>

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Salario</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Salario del Funcionario" name='salario' value={funcionarioForm?.salario}
                                disabled
                            />
                        </div>

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Tipo de Vinculacion</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Tipo de Vinculacion del Funcionario" name='vinculacionnombre' value={funcionarioForm.vinculacion?.nombre}
                                disabled
                            />
                        </div>

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Fecha de Vinculacion</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Fecha de Vinculacion del Funcionario" name='fechaVinculacion' value={funcionarioForm?.fechaVinculacion}
                                disabled
                            />
                        </div>

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Cargo</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Cargo del Funcionario" name='cargo' value={funcionarioForm?.cargo}
                                disabled
                            />
                        </div>

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Activo</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Estado del Funcionario" name='activo' value={funcionarioForm?.activo}
                                disabled
                            />
                        </div>



                    </div>
                    <div className="col">

                        <Divider content={'Tipo de Auxilio'} />



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