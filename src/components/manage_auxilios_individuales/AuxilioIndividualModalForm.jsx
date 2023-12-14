import { useEffect } from "react";
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { useOthersEntities } from "../../hooks/useOthersEntities";
import { Search } from "../layout/Search";
import { AuxilioIndividualForm } from "./AuxilioIndividualForm";

export const AuxilioIndividualModalForm = () => {

    const { auxiliosIndividualSelected, handlerCloseForm, onlyShow } = useAuxiliosIndividuales();
    const { funcionarioSearch, handlerRemoveFuncionarioSearch, getFuncionarioById,
        getFuncionarioByIdAndNombre } = useFuncionarios();
    const { getTiposAuxiliosIndividuales, getSindicatos, getSemestres,
        getMotivosIncapacidades, getMotivosJubilaciones, getParentescos,
        getEstudioFormales, getBeneficiariosEstudio, getGeneros, getDependencias,
        getVinculaciones, getCargos, getGrados, getEstadosFuncionarios, getLocalidades } = useOthersEntities();
    const idFun = auxiliosIndividualSelected?.idFuncionario;

    useEffect(() => {
        getTiposAuxiliosIndividuales();
        getSindicatos();
        getSemestres();
        getMotivosIncapacidades();
        getMotivosJubilaciones();
        getParentescos();
        getEstudioFormales();
        getBeneficiariosEstudio();
        getDependencias();
        getGeneros();
        getVinculaciones();
        getCargos();
        getGrados();
        getLocalidades();
        getEstadosFuncionarios();
        (idFun == 0 || idFun == "") || getFuncionarioByIdAndNombre(idFun, 0, 1); // id,page, showMessage
    }, [])

    return (
        <>
            <div className="abrir-modal animation fadeIn">
                <div className="modal d-block" tabIndex={'-1'}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className={"shadow-lg m-2 mb-0 rounded bg-body-tertiary modal-header d-flex justify-content-center py-2"}>
                                <div className="modal-title w-25">
                                    <h5 className="modal-title text-black">
                                        {auxiliosIndividualSelected.id < 1 ? 'Agregar Auxilio' : !onlyShow ? 'Editar Auxilio' : 'Ver Detalles'}
                                    </h5>
                                </div>
                                <div className={onlyShow? "d-none" : "w-50"}>
                                    <Search
                                        placeholder={"Identificacion o Nombre del funcionario"}
                                        functionSearch={getFuncionarioByIdAndNombre}
                                    />
                                </div>
                            </div>
                            <div className="rounded bg-body-tertiary modal-body p-3 m-2 pt-0">
                                <AuxilioIndividualForm
                                    auxiliosIndividualSelected={auxiliosIndividualSelected}
                                    handlerCloseForm={handlerCloseForm}
                                    handlerRemoveFuncionarioSearch={handlerRemoveFuncionarioSearch}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}