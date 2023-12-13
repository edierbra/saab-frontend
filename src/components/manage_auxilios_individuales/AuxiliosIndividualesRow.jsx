import { useAuth } from "../../auth/hooks/useAuth";
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { Btn } from "../layout/Btn";

export const AuxiliosIndividualesRow = ({ auxilio }) => {

    const { handlerRemoveAuxilioIndividual, handlerAuxilioIndividualSelectedForm } = useAuxiliosIndividuales();
    const { login } = useAuth()
    const { allFuncionarios } = useFuncionarios()
    const { tiposAuxiliosIndividuales } = useOthersEntities()

    const funcionario = allFuncionarios.find(f => f.id == auxilio.idFuncionario)
    const tipoAuxilio = tiposAuxiliosIndividuales.find(tAux => tAux.id == auxilio.idTipoAuxilioIndividual)

    const setEstado = () => {
        return auxilio.idEstadoAuxilio == 1 ? "w-33 bg-red"
            : auxilio.idEstadoAuxilio == 2 ? "w-67 bg-blue"
                : auxilio.idEstadoAuxilio == 3 ? "w-100 bg-green"
                    : '';
    }

    return (
        <>
            <tr >
                {/* <td className="">{auxilio.id}</td> */}
                <td className="">{funcionario?.id}</td>
                <td className="">{funcionario?.nombre}</td>
                <td className="">{auxilio?.fechaSolicitud}</td>
                <td className="">{auxilio?.fechaViabilidad}</td>
                <td className="">{tipoAuxilio?.nombre}</td>
                <td className="">{auxilio?.valor}</td>

                <td className="py-1">
                    <div className="d-flex justify-content-start">
                        <Btn
                            onClick={handlerAuxilioIndividualSelectedForm}
                            dataOnClick={{ onlyShow: true, id: auxilio.id }}
                            icon={"bi bi-eye"}
                            style={"btn btn-mybotton btn-color-green"}
                            text={''}
                        />

                        {!login.isAdmin ||
                            <>
                                <Btn
                                    onClick={handlerAuxilioIndividualSelectedForm}
                                    dataOnClick={{ onlyShow: false, id: auxilio.id }}
                                    icon={"bi bi-pencil-square"}
                                    style={"btn btn-mybotton btn-color-blue"}
                                    text={''}
                                />

                                <Btn
                                    onClick={handlerRemoveAuxilioIndividual}
                                    dataOnClick={auxilio?.id}
                                    icon={"bi bi-trash-fill"}
                                    style={"btn btn-mybotton btn-color-red"}
                                    text={''}
                                />
                            </>
                        }

                    </div>
                </td>
            </tr>
            <tr key={`progress-${auxilio.id}`}>
                <td colSpan="8" className="pading-0"> {/* ColSpan debe coincidir con el número de columnas de datos */}
                    <div className="progress" role="progressbar">
                        <div className={`progress-bar ${setEstado()}`}></div>
                    </div>
                </td>
            </tr>
        </>
    )
}