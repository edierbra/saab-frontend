import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../auth/hooks/useAuth"
import {
    loadingTiposAuxiliosIndividuales, loadingTiposAuxiliosIndividualesBySindicatoId,
    loadingSindicatos, loadingSemestres, loadingMotivosIncapacidades, loadingMotivosJubilaciones,
    initialOthersEntities, loadingParentescos, loadingEstudiosFormales, loadingProgramasByEstudioFormal,
    loadingBeneficiariosEstudio,
    loadingGeneros,
    loadingVinculaciones,
    loadingDependencias,
    loadingCargos, 
    loadingTiposNegociacionesSindicales,
    loadingNegociacionesSindicales,
    loadingTiposNegociacionesSindicalesBySindicatoId,
    loadingNegociacionesSindicalesByTipoNegociacionSindicalId,
    loadingGrados,
    loadingLocalidades,
    loadingEstadosFuncionarios,
    loadingDistinctNameSalariosConfig
} from "../store/slices/othersEntities/othersEntitiesSlice"
import {
    findAllTiposAuxiliosIndividuales, findAllTiposAuxiliosIndividualesBySindicatoId,
    findAllSindicatos, findAllSemestres, findAllMotivoJubilaciones, findAllMotivoIncapacidades,
    findAllParentescos, findAllEstudioFormales, findAllProgramasByIdEstudioFormal,
    findAllBeneficiariosEstudio, findAllGeneros, findAllVinculaciones, findAllDependencias,
    findAllTiposNegociacionesSindicales, findAllNegociacionesSindicales,
    findAllTiposNegociacionesSindicalesBySindicatoId,
    findAllNegociacionesSindicalesByTipoNegociacionSindicalId,
    findAllCargos,
    findAllGrados,
    findAllLocalidades,
    findAllEstadosFuncionarios,
    findDistinctNameConfigurationsByTipo
} from "../services/othersEntitiesService"
import { SwalErrorAuthentication } from "../components/recursos/SweetAlerts"

export const useOthersEntities = () => {

    const { tiposAuxiliosIndividuales, tiposAuxiliosIndividualesBySindicatoId, sindicatos, semestres,
        motivosJubilaciones, motivosIncapacidades, parentescos, estudiosFormales, programasbyestudioformal,
        beneficiariosEstudio, generos, vinculaciones, dependencias, cargos, grados, localidades, estadosFuncionarios, negociacionesSindicales,
        tiposNegociacionesSindicales, negociacionesSindicalesByTipoNegociacionSindicalId,
        tiposNegociacionesSindicalesBySindicatoId, distinctNameSalariosConfig
    } = useSelector(state => state.othersEntities);
    const dispatch = useDispatch();
    const { login, handlerLogout } = useAuth();

    const getTiposAuxiliosIndividuales = async () => {
        try {
            const result = await findAllTiposAuxiliosIndividuales();
            dispatch(loadingTiposAuxiliosIndividuales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getBeneficiariosEstudio = async () => {
        try {
            const result = await findAllBeneficiariosEstudio();
            dispatch(loadingBeneficiariosEstudio(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getTiposAuxiliosIndividualesBySindicatoId = async (id = 0) => {
        try {
            const result = await findAllTiposAuxiliosIndividualesBySindicatoId(id);
            dispatch(loadingTiposAuxiliosIndividualesBySindicatoId(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getProgramasByIdEstudioFormal = async (id = 0) => {
        try {
            const result = await findAllProgramasByIdEstudioFormal(id);
            dispatch(loadingProgramasByEstudioFormal(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getDistinctNameConfigurationsByTipo = async (tipo = '') => {
        try {
            const result = await findDistinctNameConfigurationsByTipo(tipo);
            dispatch(loadingDistinctNameSalariosConfig(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getSindicatos = async () => {
        try {
            const result = await findAllSindicatos();
            dispatch(loadingSindicatos(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getSemestres = async () => {
        try {
            const result = await findAllSemestres();
            dispatch(loadingSemestres(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getMotivosJubilaciones = async () => {
        try {
            const result = await findAllMotivoJubilaciones();
            dispatch(loadingMotivosJubilaciones(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getMotivosIncapacidades = async () => {
        try {
            const result = await findAllMotivoIncapacidades();
            dispatch(loadingMotivosIncapacidades(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getParentescos = async () => {
        try {
            const result = await findAllParentescos();
            dispatch(loadingParentescos(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getEstudioFormales = async () => {
        try {
            const result = await findAllEstudioFormales();
            dispatch(loadingEstudiosFormales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getGeneros = async () => {
        try {
            const result = await findAllGeneros();
            dispatch(loadingGeneros(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getVinculaciones = async () => {
        try {
            const result = await findAllVinculaciones();
            dispatch(loadingVinculaciones(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getDependencias = async () => {
        try {
            const result = await findAllDependencias();
            dispatch(loadingDependencias(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getCargos = async () => {
        try {
            const result = await findAllCargos();
            dispatch(loadingCargos(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getGrados = async () => {
        try {
            const result = await findAllGrados();
            dispatch(loadingGrados(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getLocalidades = async () => {
        try {
            const result = await findAllLocalidades();
            dispatch(loadingLocalidades(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getEstadosFuncionarios = async () => {
        try {
            const result = await findAllEstadosFuncionarios();
            dispatch(loadingEstadosFuncionarios(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getTiposNegociacionesSindicales = async () => {
        try {
            const result = await findAllTiposNegociacionesSindicales();
            dispatch(loadingTiposNegociacionesSindicales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getNegociacionesSindicales = async () => {
        try {
            const result = await findAllNegociacionesSindicales();
            dispatch(loadingNegociacionesSindicales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getAllTiposNegociacionesSindicalesBySindicatoId = async (id = 0) => {
        try {
            const result = await findAllTiposNegociacionesSindicalesBySindicatoId(id);
            dispatch(loadingTiposNegociacionesSindicalesBySindicatoId(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getAllNegociacionesSindicalesByTipoNegociacionSindicalId = async (id = 0) => {
        try {
            const result = await findAllNegociacionesSindicalesByTipoNegociacionSindicalId(id);
            dispatch(loadingNegociacionesSindicalesByTipoNegociacionSindicalId(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    return {
        getTiposAuxiliosIndividuales,
        getTiposAuxiliosIndividualesBySindicatoId,
        getSindicatos,
        getSemestres,
        getMotivosJubilaciones,
        getMotivosIncapacidades,
        getParentescos,
        getEstudioFormales,
        getProgramasByIdEstudioFormal,
        getBeneficiariosEstudio,
        getGeneros,
        getDependencias,
        getCargos,
        getGrados,
        getLocalidades,
        getEstadosFuncionarios,
        getVinculaciones,
        getNegociacionesSindicales,
        getTiposNegociacionesSindicales,
        getAllTiposNegociacionesSindicalesBySindicatoId,
        getAllNegociacionesSindicalesByTipoNegociacionSindicalId,
        getDistinctNameConfigurationsByTipo,

        tiposAuxiliosIndividuales,
        generos,
        vinculaciones,
        dependencias,
        cargos,
        grados,
        estadosFuncionarios,
        localidades,
        tiposAuxiliosIndividualesBySindicatoId,
        sindicatos,
        semestres,
        parentescos,
        motivosIncapacidades,
        motivosJubilaciones,
        estudiosFormales,
        programasbyestudioformal,
        beneficiariosEstudio,
        initialOthersEntities,
        negociacionesSindicales,
        tiposNegociacionesSindicales,
        negociacionesSindicalesByTipoNegociacionSindicalId,
        tiposNegociacionesSindicalesBySindicatoId,
        distinctNameSalariosConfig,
    }
}