import { useAuth } from "../../auth/hooks/useAuth";
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { AuxiliosIndividualesRow } from "./AuxiliosIndividualesRow";

export const AuxiliosIndividualesList = () => {

    const { auxiliosIndividuales } = useAuxiliosIndividuales();
    const { login } = useAuth();

    return (
        <>
            <table className="table table-hover table-striped rounded shadow-xx">
                <thead>
                    <tr className="fs-16px-login-label">
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Identificacion</th>
                        <th>Fecha viabilidad</th>
                        <th>Fecha solicitud</th>
                        <th>Tipo Auxilio</th>
                        <th>Valor</th>
                        {(login.isAdmin) && <th>optiones</th>}
                    </tr>
                </thead>

                <tbody>
                    {
                        auxiliosIndividuales.map(auxilio =>
                        (
                            <AuxiliosIndividualesRow
                                key={auxilio?.id}
                                auxilio={auxilio}
                            />
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}