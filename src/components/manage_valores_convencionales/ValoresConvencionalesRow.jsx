import { useAuth } from "../../auth/hooks/useAuth";
import { Btn } from "../layout/Btn";
import { useValoresConvencionales } from "../../hooks/useValoresConvencionales";
import { useOthersEntities } from "../../hooks/useOthersEntities";

export const ValoresConvencionalesRow = ({ valorCon }) => {

    const { handlerValorConvencionalSelectedForm, handlerRemoveValorConvencional,
        handlerValorSelectedFormToUpdateEstado } = useValoresConvencionales();
    const { login } = useAuth()
    const { sindicatos, negociacionesSindicales, tiposNegociacionesSindicales } = useOthersEntities()

    const sindicato = sindicatos.find(s => s.id == valorCon.idSindicato)
    const tipoNegociacionSindical = tiposNegociacionesSindicales.find(t => t.id == valorCon.idTipoNegociacionSindical)
    const negociacionSindical = negociacionesSindicales.find(n => n.id == valorCon.idNegociacionSindical)


    const setEstado = () => {
        return valorCon?.idEstadoAuxilio == 1 ? "w-33 bg-red"
            : valorCon?.idEstadoAuxilio == 2 ? "w-67 bg-blue"
                : valorCon?.idEstadoAuxilio == 3 ? "w-100 bg-green"
                    : '';
    }

    return (
        <>
            <tr >
                <td className="py-0">{valorCon?.id}</td>
                <td className="py-0">{sindicato?.nombre}</td>
                <td className="py-0">{tipoNegociacionSindical?.nombre}</td>
                <td className="py-0">{negociacionSindical?.nombre}</td>
                <td className="py-0">{valorCon?.fechaSolicitud}</td>
                <td className="py-0">{valorCon?.fechaViabilidad}</td>
                <td className="py-0">{valorCon.valor}</td>

                <td className="py-1">
                    <div className="d-flex justify-content-start">
                        {!login.isAdmin ||
                            <>
                                <Btn
                                    onClick={handlerValorConvencionalSelectedForm}
                                    dataOnClick={{ onlyShow: false, id: valorCon.id }}
                                    icon={"bi bi-pencil-square"}
                                    style={"btn btn-mybotton btn-color-blue"}
                                    text={''}
                                    type={"button"}
                                />

                                <Btn
                                    onClick={handlerValorSelectedFormToUpdateEstado}
                                    dataOnClick={valorCon?.id}
                                    icon={"bi bi-gear-fill"}
                                    style={"btn btn-mybotton btn-color-blue"}
                                    text={''}
                                    type={"button"}
                                />

                                <Btn
                                    onClick={handlerRemoveValorConvencional}
                                    dataOnClick={valorCon?.id}
                                    icon={"bi bi-trash-fill"}
                                    style={"btn btn-mybotton btn-color-red"}
                                    text={''}
                                    type={"button"}
                                />
                            </>
                        }

                    </div>
                </td>
            </tr>
            <tr key={`progress-${valorCon.id}`}>
                <td colSpan="8" className="pading-0"> {/* ColSpan debe coincidir con el número de columnas de datos */}
                    <div className="progress" role="progressbar">
                        <div className={`progress-bar ${setEstado()}`}></div>
                    </div>
                </td>
            </tr>
        </>
    )
}