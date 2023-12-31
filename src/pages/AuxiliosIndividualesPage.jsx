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
import { EstadoModalForm } from "../components/layout/EstadoModalForm";

export const AuxiliosIndividualesPage = () => {
    const { page } = useParams()
    const { getAllFuncionarios } = useFuncionarios()
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const { getTiposAuxiliosIndividuales, getSindicatos } = useOthersEntities()
    const {
        auxiliosIndividuales,
        visibleForm,
        visibleEstadoForm,
        isLoading,
        paginator,

        handlerOpenForm,
        getAuxiliosIndividualesByNombreOrIdOrTipoPageable,
        // Estado
        initialAuxiliosIndividualForm,
        errors,
        handlerUpdateEstadoAuxilio,
        addError,
        auxiliosIndividualSelected,
        handlerCloseForm,
    } = useAuxiliosIndividuales();


    const {
        login
    } = useAuth()

    useEffect(() => {
        getSindicatos()
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

            {!visibleEstadoForm ||
                <EstadoModalForm
                    initialAuxilioForm={initialAuxiliosIndividualForm}
                    errors={errors}
                    handlerUpdateEstadoAuxilio={handlerUpdateEstadoAuxilio}
                    addError={addError}
                    auxilioSelected={auxiliosIndividualSelected}
                    handlerCloseForm={handlerCloseForm}
                />
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