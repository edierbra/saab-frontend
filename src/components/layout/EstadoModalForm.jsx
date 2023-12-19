import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { EstadoForm } from "./EstadoForm";

export const EstadoModalForm = ({ initialAuxilioForm, errors, handlerUpdateEstadoAuxilio, addError,
    auxilioSelected, handlerCloseForm }) => {

    return (
        <>
            <div className="abrir-modal animation fadeIn">
                <div className="modal" style={{ display: 'block' }} tabIndex={'-1'}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border rounded shadow-lg m-2">
                                <div className="modal-title">
                                    <h5 className="modal-title">
                                        {'Editar Estado'}
                                    </h5>
                                </div>
                            </div>
                            <div className="modal-body mt-0 pt-0">
                                <EstadoForm
                                    auxilioSelected={auxilioSelected}
                                    handlerCloseForm={handlerCloseForm}
                                    initialAuxilioForm={initialAuxilioForm}
                                    errors={errors}
                                    handlerUpdateEstadoAuxilio={handlerUpdateEstadoAuxilio}
                                    addError={addError}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}