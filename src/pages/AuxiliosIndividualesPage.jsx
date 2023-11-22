import { useEffect } from "react";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/layout/Paginator";
import { useAuxiliosIndividuales } from "../hooks/useAuxiliosIndividuales";
import { AuxiliosIndividualesList } from "../components/manage_auxilios_individuales/AuxiliosIndividualesList";
import { AuxilioIndividualModalForm } from "../components/manage_auxilios_individuales/AuxilioIndividualModalForm";
import { Header } from "../components/layout/Header";
import { useFuncionarios } from "../hooks/useFuncionarios";

export const AuxiliosIndividualesPage = () => {

    const { page } = useParams()

    const {
        auxiliosIndividuales,
        visibleForm,
        isLoading,
        paginator,

        handlerOpenForm,
        getAuxiliosIndividuales,
        getAuxiliosIndividualesByNombreOrIdOrTipoPageable
    } = useAuxiliosIndividuales();

    const { getFuncionarioById } = useFuncionarios()

    const {
        login
    } = useAuth()

    useEffect(() => {
        getAuxiliosIndividuales(page);
    }, [, page])

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true"></span>
                    <span role="status">Cargando...</span>
                </button>
            </div>
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