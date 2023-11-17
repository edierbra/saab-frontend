import { useEffect } from "react"
import { Divider } from "../layout/divider"
import Swal from "sweetalert2"

export const FuncionarioForm = ({ handlerRemoveUserSearch, funcionarioForm, onOptionsSelect, onInputChange }) => {

    if(funcionarioForm?.activo == "false"){
        handlerRemoveUserSearch()
        Swal.fire(
            'Usuario inactivo!',
            'El usuario se encuentra inactivo, no puede acceder a ningun auxilio!',
            'error'
        )
    }

    return (
        <>
            <Divider content={'Datos del Funcionario'} />

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Identificacion</label>
                <input
                    type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Identificacion del Funcionario" name='idFuncionario' value={funcionarioForm?.id}
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

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Dependencia</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idDependencia"
                    disabled
                >
                    {onOptionsSelect(funcionarioForm.dependencia, 'Dependencia del Funcionario')}
                </select>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Genero</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idGenero"
                    disabled
                >
                    {onOptionsSelect(funcionarioForm.genero, 'Genero del Funcionario')}
                </select>
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
                <label className="form-label fs-16px-login-label mb-0">Tipo Vinculacion</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="idTipoVinculacion"
                    disabled
                >
                    {onOptionsSelect(funcionarioForm.vinculacion, 'Tipo de Vinculacion del Funcionario')}
                </select>
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

            <div className="mb-1 form-check">

                <input type="checkbox"
                    disabled
                    name="activo"
                    checked={funcionarioForm?.activo == "true" ? true : false}
                    className="form-check-input"
                />
                <label className="form-label fs-16px-login-label mb-0">Activo</label>
            </div>

        </>
    )
}