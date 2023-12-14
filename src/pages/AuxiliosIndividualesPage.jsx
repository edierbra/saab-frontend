import { useEffect, useState } from "react";
import { useAuth } from "../auth/hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { Paginator } from "../components/layout/Paginator";
import { useAuxiliosIndividuales } from "../hooks/useAuxiliosIndividuales";
import { AuxiliosIndividualesList } from "../components/manage_auxilios_individuales/AuxiliosIndividualesList";
import { AuxilioIndividualModalForm } from "../components/manage_auxilios_individuales/AuxilioIndividualModalForm";
import { Header } from "../components/layout/Header";
import { useFuncionarios } from "../hooks/useFuncionarios";
import { useOthersEntities } from "../hooks/useOthersEntities";
import { Spinner } from "../components/layout/Spinner";

export const AuxiliosIndividualesPage = () => {
    const { page } = useParams()
    const { getAllFuncionarios } = useFuncionarios()
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const { getTiposAuxiliosIndividuales } = useOthersEntities()
    const {
        auxiliosIndividuales,
        visibleForm,
        isLoading,
        paginator,

        handlerOpenForm,
        getAuxiliosIndividualesByNombreOrIdOrTipoPageable
    } = useAuxiliosIndividuales();
    const {
        login
    } = useAuth()

    useEffect(() => {
        getAllFuncionarios();
        getTiposAuxiliosIndividuales();
        getAuxiliosIndividualesByNombreOrIdOrTipoPageable(search, page);
    }, [, page])

    useEffect(() => {
        getAuxiliosIndividualesByNombreOrIdOrTipoPageable(search, 0);
        navigate("/auxilios-individuales/page/0")
    }, [search])

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            {!visibleForm ||
                <AuxilioIndividualModalForm />
            }
            <div className="">

                <Header
                    visibleForm={visibleForm}
                    handlerOpenForm={handlerOpenForm}
                    placeholder={"Buscar por Identificacion, Nombre o Tipo de auxilio"}
                    valueDefault={""}
                    functionSearch={getAuxiliosIndividualesByNombreOrIdOrTipoPageable}
                    setSearch={setSearch}
                />

                {auxiliosIndividuales.length < 1 ?
                    <div className="alert alert-warning">{'No hay Datos registrados en el sistema'}</div> :
                    (
                        <>
                            <AuxiliosIndividualesList />
                            <Paginator
                                url="/auxilios-individuales/page"
                                paginator={paginator}
                            />
                        </>
                    )
                }
            </div>

        </>
    )
}