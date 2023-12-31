import { useEffect } from "react";
import { useAuth } from "../auth/hooks/useAuth";
import { Spinner } from "../components/layout/Spinner";
import { SelectReporte } from "../components/manage_reportes/SelectReporte";
import { useOthersEntities } from "../hooks/useOthersEntities";
import { useReportes } from "../hooks/useReportes";

export const ReportesPage = () => {
    const { getSindicatos, getTiposAuxiliosIndividuales, getVinculaciones, getAllEstadosAuxilios } = useOthersEntities()

    useEffect(() => {
        getSindicatos()
        getTiposAuxiliosIndividuales()
        getVinculaciones()
        getAllEstadosAuxilios()
    }, [])

    const {
        login
    } = useAuth()

    return (
        <>
            <SelectReporte />
        </>
    )
}