import { useAuth } from "../../auth/hooks/useAuth";
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { AuxiliosIndividualesRow } from "./AuxiliosIndividualesRow";

export const AuxiliosIndividualesList = () => {

    const { auxiliosIndividuales } = useAuxiliosIndividuales();
    const { login } = useAuth();

    return (
        <>
        <div className="m-0 mb-2 overflow-auto rounded shadow-xx " style={{ width: '100%', maxHeight:'70vh' }}>
            <table className="table mb-0 table-hover table-striped ">
                <thead>
                    <tr className="fs-16px-login-label">
                        {/* <th>Id</th> */}
                        <th>Identificacion</th>
                        <th>Nombre</th>
                        <th>Fecha solicitud</th>
                        <th>Fecha viabilidad</th>
                        <th>Tipo Auxilio</th>
                        <th>Valor</th>
                        <th>Optiones</th>
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
            </div>
        </>
    )
}