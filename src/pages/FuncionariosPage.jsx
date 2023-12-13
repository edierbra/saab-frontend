import { useEffect, useState } from "react";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/layout/Paginator";
import { Header } from "../components/layout/Header";
import { useFuncionarios } from "../hooks/useFuncionarios";
import { FuncionarioList } from "../components/manage_funcionarios/FuncionarioList";
import { FuncionarioModalForm } from "../components/manage_funcionarios/FuncionarioModalForm";
import { Spinner } from "../components/layout/Spinner";

export const FuncionariosPage = () => {
    const { page } = useParams()

    const {
        funcionarios,
        visibleForm,
        isLoading,
        paginator,

        handlerOpenForm,
        getFuncionarioByIdAndNombre,
        handlerChangeIsWithErrors,
    } = useFuncionarios();

    const {
        login
    } = useAuth()

    const [search, setSearch] = useState('')

    // useEffect(() => {
    //     handlerChangeIsWithErrors(false);
    // }, [])

    useEffect(() => {
        handlerChangeIsWithErrors(false);
        getFuncionarioByIdAndNombre(search, page);
    }, [, page])

    useEffect(() => {
        getFuncionarioByIdAndNombre(search, 0);
    }, [search])

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            {!visibleForm ||
                <FuncionarioModalForm />
            }

            <div className="">

                <Header
                    visibleForm={visibleForm}
                    handlerOpenForm={handlerOpenForm}
                    placeholder={"Buscar por Identificacion o Nombre"}
                    valueDefault={""}
                    setSearch={setSearch}
                    functionSearch={getFuncionarioByIdAndNombre}
                />

                {funcionarios?.length < 1 || !funcionarios ?
                    <div className="alert alert-warning">{'No hay Datos en el sistema'}</div> :
                    (
                        <>
                            <FuncionarioList />
                            <Paginator
                                url="/funcionarios/page"
                                paginator={paginator}
                            />
                        </>
                    )
                }
            </div>

        </>
    )
}