import { useEffect, useState } from "react";
import { useAuth } from "../auth/hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { Paginator } from "../components/layout/Paginator";
import { AuxiliosIndividualesList } from "../components/manage_auxilios_individuales/AuxiliosIndividualesList";
import { Header } from "../components/layout/Header";
import { useValoresConvencionales } from "../hooks/useValoresConvencionales";
import { ValoresConvencionalesList } from "../components/manage_valores_convencionales/ValoresConvencionalesList";
import { useOthersEntities } from "../hooks/useOthersEntities";
import { ValorConvencionalModalForm } from "../components/manage_valores_convencionales/ValorConvencionalModalForm";
import { Spinner } from "../components/layout/Spinner";
import { EstadoModalForm } from "../components/layout/EstadoModalForm";

export const ValoresConvencionalesPage = () => {

    const { page } = useParams()
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const { getSindicatos, getNegociacionesSindicales, getTiposNegociacionesSindicales } = useOthersEntities()
    const {
        valoresConvencionales,
        visibleForm,
        visibleEstadoForm,
        isLoading,
        paginator,

        handlerOpenForm,
        getValoresConvencionalesByTipoNegociacionNombreOrNegociacionNombrePageable,

        // Estado Auxilio Form
        initialValorConvencionalForm,
        errors,
        handlerUpdateEstadoAuxilio,
        addError,
        valorConvencionalSelected,
        handlerCloseForm
    } = useValoresConvencionales();

    const {
        login
    } = useAuth()

    useEffect(() => {
        getTiposNegociacionesSindicales()
        getNegociacionesSindicales()
        getSindicatos()
        getValoresConvencionalesByTipoNegociacionNombreOrNegociacionNombrePageable(search, page);
    }, [, page])

    useEffect(() => {
        getValoresConvencionalesByTipoNegociacionNombreOrNegociacionNombrePageable(search, 0);
        navigate("/valores-convencionales/page/0")
    }, [search])

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            {!visibleForm ||
                <ValorConvencionalModalForm />
            }

            {!visibleEstadoForm ||
                <EstadoModalForm
                    initialAuxilioForm={initialValorConvencionalForm}
                    errors={errors}
                    handlerUpdateEstadoAuxilio={handlerUpdateEstadoAuxilio}
                    addError={addError}
                    auxilioSelected={valorConvencionalSelected}
                    handlerCloseForm={handlerCloseForm}
                />
            }

            <div className="">

                <Header
                    visibleForm={visibleForm}
                    handlerOpenForm={handlerOpenForm}
                    placeholder={"Buscar por Tipo de Negociacion o Negociacion"}
                    valueDefault={""}
                    functionSearch={getValoresConvencionalesByTipoNegociacionNombreOrNegociacionNombrePageable}
                    setSearch={setSearch}
                />

                {valoresConvencionales.length < 1 ?
                    <div className="alert alert-warning">{'No hay Datos registrados en el sistema'}</div> :
                    (
                        <>
                            <ValoresConvencionalesList />
                            <Paginator
                                url="/valores-convencionales/page"
                                paginator={paginator}
                            />
                        </>
                    )
                }
            </div>

        </>
    )
}