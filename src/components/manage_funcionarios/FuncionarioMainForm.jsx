import { useEffect, useState } from "react"
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { FuncionarioForm } from "./FuncionarioForm";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { verificarFormatoFecha } from "../recursos/Funciones";

export const FuncionarioMainForm = ({ funcionarioSelected, handlerCloseForm }) => {

    const { generos, vinculaciones, dependencias, grados, cargos, estadosFuncionarios, localidades } = useOthersEntities()
    const { initialFuncionarioForm, handlerAddFuncionario, addError } = useFuncionarios();

    const [funcionarioForm, setFuncionarioForm] = useState(initialFuncionarioForm);
    const [checked, setChecked] = useState(funcionarioSelected?.activo);
    const { id } = funcionarioSelected;

    useEffect(() => {
        setFuncionarioForm({
            ...funcionarioSelected
        });
    }, [funcionarioSelected])

    const onInputChange = (target) => {
        const { name, value } = target;
        setFuncionarioForm(
            {
                ...funcionarioForm,
                [name]: value
            }
        )
    }

    const onSelectChange = (target) => {
        const { value, name } = target

        switch (name) {
            case 'genero':
                setFuncionarioForm({
                    ...funcionarioForm,
                    genero: generos.find(o => o?.id == value)
                })
                break;

            case 'vinculacion':
                setFuncionarioForm({
                    ...funcionarioForm,
                    vinculacion: vinculaciones.find(o => o?.id == value)
                })
                break;

            case 'dependencia':
                setFuncionarioForm({
                    ...funcionarioForm,
                    dependencia: dependencias.find(o => o.id == value)
                })
                break;

            case 'localidad':
                setFuncionarioForm({
                    ...funcionarioForm,
                    localidad: localidades.find(o => o.id == value)
                })
                break;

            case 'grado':
                setFuncionarioForm({
                    ...funcionarioForm,
                    grado: grados.find(o => o.id == value)
                })
                break;

            case 'cargo':
                setFuncionarioForm({
                    ...funcionarioForm,
                    cargo: cargos.find(o => o.id == value)
                })
                break;

            case 'estadoFuncionario':
                const fecha = funcionarioForm?.fechaRetiro;
                setFuncionarioForm({
                    ...funcionarioForm,
                    estadoFuncionario: estadosFuncionarios.find(o => o.id == value),
                    fechaRetiro: (estadosFuncionarios.find(o => o.id == value).nombre != "R")? '' : fecha,
                })
                break;

            default:
                break;
        }

    }

    const onCheckboxChange = (target) => {
        const { name } = target;
        const value = checked == 'true' ? 'false' : 'true'
        setChecked(value);

        setFuncionarioForm({
            ...funcionarioForm,
            [name]: checked
        })
    }


    const onSubmit = (event) => {
        event.preventDefault();
        if (!verificarFormatoFecha(funcionarioForm?.fechaIngreso) && funcionarioForm?.fechaIngreso) {
            addError({ fechaIngreso: 'Fecha de Ingreso debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        if (!verificarFormatoFecha(funcionarioForm?.fechaRetiro) && funcionarioForm?.fechaRetiro) {
            addError({ fechaRetiro: 'Fecha de Retiro debe ser posterior a 1950 y tener el formato: MM/DD/AAAA' })
            return
        }

        handlerAddFuncionario(funcionarioForm) // Guardar el userFrom en userList
    }

    const onCloseForm = () => {
        setFuncionarioForm(initialFuncionarioForm);
        handlerCloseForm();
    }

    return (
        <>
            <form onSubmit={onSubmit} noValidate disabled>
                <div className=" ">
                    <div className=" overflow-auto " style={{ height: '55vh' }}>

                        <FuncionarioForm
                            funcionarioForm={funcionarioForm}
                            onInputChange={onInputChange}
                            onCheckboxChange={onCheckboxChange}
                            onSelectChange={onSelectChange}
                            disabled={false}
                        />
                    </div>
                </div>

                <hr />

                <div className="">
                    <button
                        className={"btn btn-mybotton btn-color-blue my-2 p-2"}
                        type="submit">
                        {id == '' ? 'Agregar' : 'Editar'}
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