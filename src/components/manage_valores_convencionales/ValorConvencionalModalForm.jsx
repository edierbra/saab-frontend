import { useEffect } from "react";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { useValoresConvencionales } from "../../hooks/useValoresConvencionales";
import { ValorConvencionalForm } from "./ValorConvencionalForm";
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";

export const ValorConvencionalModalForm = () => {

    const { valorConvencionalSelected, handlerCloseForm } = useValoresConvencionales();
    const { getSindicatos, getTiposNegociacionesSindicales, getNegociacionesSindicales,
        getDistinctNameConfigurationsByTipo } = useOthersEntities();

    useEffect(() => {
        getSindicatos();
        getNegociacionesSindicales();
        getTiposNegociacionesSindicales();
        getDistinctNameConfigurationsByTipo('SALARIO')
    }, [])

    return (
        <>
            <div className="abrir-modal animation fadeIn">
                <div className="modal d-block" tabIndex={'-1'}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className={"shadow-lg m-2 mb-0 rounded bg-body-tertiary modal-header d-flex justify-content-start py-3"}>
                                <div className="modal-title">
                                    <h5 className="modal-title text-black">
                                        {valorConvencionalSelected.id < 1 ? 'Agregar Valor Convencional' : 'Editar Valor Convencional'}
                                    </h5>
                                </div>
                            </div>
                            <div className="rounded bg-body-tertiary modal-body p-3 m-2 pt-0">
                                <ValorConvencionalForm
                                    valorConvencionalSelected={valorConvencionalSelected}
                                    handlerCloseForm={handlerCloseForm}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}