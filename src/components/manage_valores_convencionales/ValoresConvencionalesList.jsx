import { useAuth } from "../../auth/hooks/useAuth";
import { useValoresConvencionales } from "../../hooks/useValoresConvencionales";
import { ValoresConvencionalesRow } from "./ValoresConvencionalesRow";

export const ValoresConvencionalesList = () => {

    const { valoresConvencionales } = useValoresConvencionales();
    const { login } = useAuth();

    return (
        <>
            <div className="m-0 mb-2 overflow-auto rounded shadow-xx " style={{ width: '100%', maxHeight: '70vh' }}>
                <table className="table table-hover table-striped table-bordered mb-0">
                    <thead>
                        <tr className="fs-16px-login-label">
                            <th className="py-1">Id</th>
                            <th className="py-1">Sindicato</th>
                            <th className="py-1">Tipo Negociacion</th>
                            <th className="py-1">Negociacion</th>
                            <th className="py-1">Fecha solicitud</th>
                            <th className="py-1">Fecha viabilidad</th>
                            <th className="py-1">Valor</th>
                            {(login.isAdmin) && <th className="py-1">optiones</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {
                            valoresConvencionales.map(valorCon =>
                            (
                                <ValoresConvencionalesRow
                                    key={valorCon?.id}
                                    valorCon={valorCon}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}