import { useAuth } from "../../auth/hooks/useAuth";
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { AuxiliosIndividualesRow } from "./AuxiliosIndividualesRow";

export const AuxiliosIndividualesList = () => {

    const { users } = useAuxiliosIndividuales();
    const { login } = useAuth();

    return (
        <>
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Cedula</th>
                        <th>Viabilidad</th>
                        <th>Fecha viabilidad</th>
                        <th>Fecha solicitud</th>
                        <th>Valor</th>
                        <th>options</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        users.map(({ id, funcionario, viabilidad, fechaViabilidad, fechaSolicitud, valor }) => (
                            <AuxiliosIndividualesRow
                                key={id}
                                id={id}
                                funcionario={funcionario}
                                viabilidad={viabilidad}
                                fechaViabilidad={fechaViabilidad}
                                fechaSolicitud={fechaSolicitud}
                                valor={valor}
                            />
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}