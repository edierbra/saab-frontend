import { useEffect, useState } from "react"
import { useOthersEntities } from "../../hooks/useOthersEntities"
import { useFuncionarios } from "../../hooks/useFuncionarios"
import { onOptionsSelect } from "../recursos/Funciones"

export const FuncionarioForm = ({ funcionarioForm, disabled, onInputChange, onCheckboxChange,
    onSelectChange }) => {

    const { errors, funcionarioSelected, isWithErrors } = useFuncionarios()

    const { generos, vinculaciones, dependencias, grados, cargos, localidades,
        estadosFuncionarios } = useOthersEntities()

    const { id, nombre, fechaIngreso, fechaRetiro, estadoFuncionario, genero, cargo, grado,
        dependencia, localidad, vinculacion, salario, correo } = funcionarioForm;

    const handleCheckboxChange = ({ target }) => {
        onCheckboxChange && onCheckboxChange(target)
    };

    const handleInputChange = ({ target }) => {
        onInputChange && onInputChange(target)
    };

    const handleSelectChange = ({ target }) => {
        onSelectChange && onSelectChange(target)
    };

    useEffect(() => {
        console.log("FuncionarioForm", funcionarioForm)
    }, [funcionarioForm])


    return (
        <>
            {(funcionarioSelected?.id == '' || isWithErrors) && (
                <div className="mb-1">
                    <label className="form-label fs-16px-login-label mb-0">Identificacion</label>
                    <input
                        type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                        placeholder="Identificacion del Funcionario"
                        name='id'
                        value={id ? id : ''}
                        onChange={handleInputChange}
                        disabled={disabled}
                    />
                    <p className="text-danger mb-0">{errors?.id}</p>
                </div>
            )}


            <div className="mb-1 ">
                <label className="form-label fs-16px-login-label mb-0">Nombre</label>
                <input
                    type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Nombre del Funcionario"
                    name='nombre'
                    value={nombre ? nombre : ''}
                    onChange={handleInputChange}
                    disabled={disabled}
                />
                <p className="text-danger mb-0">{errors?.nombre}</p>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Genero</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    value={genero?.id}
                    name="genero"
                    onChange={handleSelectChange}
                    disabled={disabled}
                >
                    {onOptionsSelect(generos, 'Genero del Funcionario', false)}
                </select>
                <p className="text-danger mb-0">{errors?.idGenero}</p>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Dependencia</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="dependencia"
                    value={dependencia?.id}
                    onChange={handleSelectChange}
                    disabled={disabled}
                >
                    {onOptionsSelect(dependencias, 'Dependencia del Funcionario', false)}
                </select>
                <p className="text-danger mb-0">{errors?.idDependencia}</p>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Localidad</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="localidad"
                    value={localidad?.id}
                    onChange={handleSelectChange}
                    disabled={disabled}
                >
                    {onOptionsSelect(localidades, 'Localidad del Funcionario', true)}
                </select>
                <p className="text-danger mb-0">{errors?.idLocalidad}</p>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Vinculacion</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="vinculacion"
                    value={vinculacion?.id}
                    onChange={handleSelectChange}
                    disabled={disabled}
                >
                    {onOptionsSelect(vinculaciones, 'Tipo de Vinculacion', false)}
                </select>
                <p className="text-danger mb-0">{errors?.idVinculacion}</p>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Fecha de Ingreso</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha de Ingreso" name='fechaIngreso'
                    value={fechaIngreso}
                    onChange={handleInputChange}
                    disabled={disabled}
                />
                <p className="text-danger mb-0">{errors?.fechaIngreso}</p>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Fecha de Retiro</label>
                <input
                    type="date" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Fecha de Retiro" name='fechaRetiro'
                    value={fechaRetiro ? fechaRetiro : ''}
                    onChange={handleInputChange}
                    disabled={disabled}
                />
                <p className="text-danger mb-0">{errors?.fechaRetiro}</p>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Estado</label>
                <select
                    className="form-select rounded-pill fs-16px-login-input py-0"
                    name="estadoFuncionario"
                    value={estadoFuncionario?.id}
                    onChange={handleSelectChange}
                    disabled={disabled}
                >
                    {onOptionsSelect(estadosFuncionarios, 'Estado del funcionario', false)}
                </select>
                <p className="text-danger mb-0">{errors?.idEstadoFuncionario}</p>
            </div>

            <div className="row mx-0">
                <div className="col-9 px-0">
                    <div className="mb-1">
                        <label className="form-label fs-16px-login-label mb-0">Cargo</label>
                        <select
                            className="form-select rounded-pill fs-16px-login-input py-0"
                            name="cargo"
                            value={cargo?.id}
                            onChange={handleSelectChange}
                            disabled={disabled}
                        >
                            {onOptionsSelect(cargos, 'Cargo del funcionario', true)}
                        </select>
                        <p className="text-danger mb-0">{errors?.idCargo}</p>
                    </div>
                </div>
                <div className="col px-0 ms-2">
                    <div className="mb-1">
                        <label className="form-label fs-16px-login-label mb-0">Grado</label>
                        <select
                            className="form-select rounded-pill fs-16px-login-input py-0"
                            name="grado"
                            value={grado?.id}
                            onChange={handleSelectChange}
                            disabled={disabled}
                        >
                            {onOptionsSelect(grados, 'Grado', false)}
                        </select>
                        <p className="text-danger mb-0">{errors?.idGrado}</p>
                    </div>
                </div>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Salario</label>
                <input
                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Salario del Funcionario" name='salario'
                    value={salario != null ? salario : ''}
                    onChange={handleInputChange}
                    disabled={disabled}
                />
                <p className="text-danger mb-0">{errors?.salario}</p>
            </div>

            <div className="mb-1">
                <label className="form-label fs-16px-login-label mb-0">Correo</label>
                <input
                    type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                    placeholder="Correo del Funcionario"
                    name='correo'
                    value={correo ? correo : ''}
                    onChange={handleInputChange}
                    disabled={disabled}
                />
                <p className="text-danger mb-0">{errors?.correo}</p>
            </div>

        </>
    )
}