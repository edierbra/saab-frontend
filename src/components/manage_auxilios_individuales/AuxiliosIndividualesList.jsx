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
                    <tr className="fs-16px-login-label">
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Cedula</th>
                        <th>Fecha viabilidad</th>
                        <th>Fecha solicitud</th>
                        <th>Valor</th>
                        <th>options</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        users.map(({ id, fechaSolicitud, fechaViabilidad,
                            resolucion, fechaResolucion, rdp, fechaRdp, valor,
                            valorTransporteRegreso, diasDesplazamiento,
                            lugarDesplazamiento, fechaRenuncia, fechaAceptacionRenuncia,
                            fechaInicioIncapacidad, fechaFinIncapacidad, valorMatricula,
                            promedio, fechaReciboMatricula, referenciaReciboMatricula,
                            observacion, funcionario, motivoJubilacion, motivoIncapacidad,
                            semestre, estadoAuxilio, parentesco, estudioFormal, programa,
                            sindicato, tipoAuxilioIndividual }
                        ) => (
                            <AuxiliosIndividualesRow
                                key={id}
                                id={id}
                                funcionario={funcionario}
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