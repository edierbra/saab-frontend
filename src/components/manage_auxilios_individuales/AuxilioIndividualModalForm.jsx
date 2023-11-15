import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { Search } from "../layout/Search";
import { AuxilioIndividualForm } from "./AuxilioIndividualForm";

export const AuxilioIndividualModalForm = () => {

    const { userSelected, handlerCloseForm, funcionarioSearch } = useAuxiliosIndividuales();

    return (
        <>
            <div className="abrir-modal animation fadeIn">
                <div className="modal" style={{ display: 'block' }} tabIndex={'-1'}>
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-center py-2">
                                <div className="modal-title w-25">
                                    <h5 className="modal-title text-black">
                                        {userSelected.id > 0 ? 'Editar Auxilio' : 'Agregar Auxilio'}
                                    </h5>
                                </div>
                                <div className="w-50">
                                <Search
                                    placeholder={"Identificacion del funcionario"}
                                />
                                </div>
                               
                            </div>
                            <div className="modal-body p-3">
                                <AuxilioIndividualForm
                                    userSelected={userSelected}
                                    funcionarioSearch={funcionarioSearch}
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