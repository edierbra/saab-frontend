import { NavLink } from "react-router-dom"
import { useAuth } from "../../auth/hooks/useAuth";
import { useUsers } from "../../hooks/useUsers";
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";

export const AuxiliosIndividualesRow = ({ id, fechaSolicitud, fechaViabilidad,
    resolucion, fechaResolucion, rdp, fechaRdp, valor,
    valorTransporteRegreso, diasDesplazamiento,
    lugarDesplazamiento, fechaRenuncia, fechaAceptacionRenuncia,
    fechaInicioIncapacidad, fechaFinIncapacidad, valorMatricula,
    promedio, fechaReciboMatricula, referenciaReciboMatricula,
    observacion, funcionario, motivoJubilacion, motivoIncapacidad,
    semestre, estadoAuxilio, parentesco, estudioFormal, programa,
    sindicato, tipoAuxilioIndividual }) => {

    const { handlerRemoveUser, handlerUserSelectedForm } = useAuxiliosIndividuales();
    const { login } = useAuth()

    return (
        <>
            <tr >
                <td className="px-2 py-0">{id}</td>
                <td className="px-2 py-0">{funcionario?.nombre}</td>
                <td className="px-2 py-0">{funcionario?.id}</td>
                <td className="px-2 py-0">{fechaViabilidad}</td>
                <td className="px-2 py-0">{fechaSolicitud}</td>
                <td className="px-2 py-0">{valor}</td>

                <td className="px-2 py-1">
                    <div className="d-flex justify-content-start">
                        <button
                            type="button"
                            disabled
                            className="btn btn-outline-primary btn-sm ms-1 p-0"
                            onClick={() => handlerUserSelectedForm(
                                {
                                    id: id,
                                    funcionario, // Es lo msimo si coloco los :
                                    email: email,
                                    admin,
                                    // password,
                                }
                            )}>
                            <i typeof="button" className="bi bi-eye-fill mx-1 fs-5"></i>
                        </button>

                        {!login.isAdmin ||
                            <>

                                <button
                                    type="button"
                                    disabled
                                    className="btn btn-outline-primary btn-sm ms-1 p-0"
                                    onClick={() => handlerUserSelectedForm(
                                        {
                                            id: id,
                                            username, // Es lo msimo si coloco los :
                                            fechaViabilidad: fechaViabilidad,
                                            fechaSolicitud,
                                            valor,
                                        }
                                    )}>
                                    <i typeof="button" className="bi bi-pencil-square mx-1 fs-5"></i>
                                </button>

                                <button
                                    type="button"
                                    disabled
                                    className="btn btn-outline-danger btn-sm ms-1 p-0"
                                    onClick={() => handlerRemoveUser(id)}>
                                    <i typeof="button" className="bi bi-trash-fill mx-1 fs-5"></i>
                                </button>
                            </>
                        }

                    </div>
                </td>

            </tr>
        </>
    )
}