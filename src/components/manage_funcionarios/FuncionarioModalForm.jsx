import { useEffect } from "react";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { Search } from "../layout/Search";
import { FuncionarioMainForm } from "./FuncionarioMainForm";

export const FuncionarioModalForm = () => {

    const { funcionarioSelected, handlerCloseForm } = useFuncionarios();
    const { getGeneros, getDependencias, getVinculaciones, getCargos, getGrados, getLocalidades, 
        getEstadosFuncionarios } = useOthersEntities();

    useEffect(() => {
        getDependencias();
        getGeneros();
        getVinculaciones();
        getCargos();
        getGrados();
        getLocalidades();
        getEstadosFuncionarios();
    }, [])

    return (
        <>
            <div className="abrir-modal animation fadeIn">
                <div className="modal d-block" tabIndex={'-1'}>
                    <div className="modal-dialog modal-md" role="document">
                        <div className="modal-content">
                            <div className={"shadow-lg m-2 mb-0 rounded bg-body-tertiary modal-header d-flex justify-content-start py-3"}>
                                <div className="modal-title w-100">
                                    <h5 className="modal-title text-black">
                                        {funcionarioSelected?.id < 1 ? 'Agregar Funcionario' : 'Editar Funcionario'}
                                    </h5>
                                </div>
                            </div>
                            <div className="rounded bg-body-tertiary modal-body p-3 m-2 pt-0">
                                <FuncionarioMainForm
                                    funcionarioSelected={funcionarioSelected}
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