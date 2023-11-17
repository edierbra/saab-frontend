import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../auth/hooks/useAuth"
import {
    loadingTiposAuxiliosIndividuales, loadingTiposAuxiliosIndividualesBySindicatoId,
    loadingSindicatos, loadingSemestres, loadingMotivosIncapacidades, loadingMotivosJubilaciones,
    initialTipoAuxilioIndividual, loadingParentescos, loadingEstudiosFormales, loadingProgramasByEstudioFormal, 
    loadingBeneficiariosEstudio
} from "../store/slices/othersEntities/othersEntitiesSlice"
import {
    findAllTiposAuxiliosIndividuales, findAllTiposAuxiliosIndividualesBySindicatoId,
    findAllSindicatos, findAllSemestres, findAllMotivoJubilaciones, findAllMotivoIncapacidades,
    findAllParentescos, findAllEstudioFormales, findAllProgramasByIdEstudioFormal, findAllBeneficiariosEstudio
} from "../services/othersEntitiesService"

export const useOthersEntities = () => {

    const { tiposAuxiliosIndividuales, tiposAuxiliosIndividualesBySindicatoId, sindicatos, semestres,
        motivosJubilaciones, motivosIncapacidades, parentescos, estudiosFormales, programasbyestudioformal,
        beneficiariosEstudio } = useSelector(state => state.othersEntities);
    const dispatch = useDispatch();
    const { login, handlerLogout } = useAuth();

    const mesageErrorAuthentication = (title, text, icon) => {
        Swal.fire({
            title: { title },
            text: { text },
            icon: { icon },
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                handlerLogout()
            }
        })
    }

    const getTiposAuxiliosIndividuales = async () => {
        try {
            const result = await findAllTiposAuxiliosIndividuales();
            dispatch(loadingTiposAuxiliosIndividuales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                mesageErrorAuthentication("Error de autenticacion",
                    "No tienes los permisos requeridos, Inicie sesion como administrador",
                    "error");
            }
        }
    }

    const getBeneficiariosEstudio = async () => {
        try {
            const result = await findAllBeneficiariosEstudio();
            dispatch(loadingBeneficiariosEstudio(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                mesageErrorAuthentication("Error de autenticacion",
                    "No tienes los permisos requeridos, Inicie sesion como administrador",
                    "error");
            }
        }
    }

    const getTiposAuxiliosIndividualesBySindicatoId = async (id = 0) => {
        try {
            const result = await findAllTiposAuxiliosIndividualesBySindicatoId(id);
            dispatch(loadingTiposAuxiliosIndividualesBySindicatoId(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                mesageErrorAuthentication("Error de autenticacion",
                    "No tienes los permisos requeridos, Inicie sesion como administrador",
                    "error");
            }
        }
    }

    const getProgramasByIdEstudioFormal = async (id = 0) => {
        try {
            const result = await findAllProgramasByIdEstudioFormal(id);
            dispatch(loadingProgramasByEstudioFormal(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                mesageErrorAuthentication("Error de autenticacion",
                    "No tienes los permisos requeridos, Inicie sesion como administrador",
                    "error");
            }
        }
    }

    const getSindicatos = async () => {
        try {
            const result = await findAllSindicatos();
            dispatch(loadingSindicatos(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                mesageErrorAuthentication("Error de autenticacion",
                    "No tienes los permisos requeridos, Inicie sesion como administrador",
                    "error");
            }
        }
    }

    const getSemestres = async () => {
        try {
            const result = await findAllSemestres();
            dispatch(loadingSemestres(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                mesageErrorAuthentication("Error de autenticacion",
                    "No tienes los permisos requeridos, Inicie sesion como administrador",
                    "error");
            }
        }
    }

    const getMotivosJubilaciones = async () => {
        try {
            const result = await findAllMotivoJubilaciones();
            dispatch(loadingMotivosJubilaciones(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                mesageErrorAuthentication("Error de autenticacion",
                    "No tienes los permisos requeridos, Inicie sesion como administrador",
                    "error");
            }
        }
    }

    const getMotivosIncapacidades = async () => {
        try {
            const result = await findAllMotivoIncapacidades();
            dispatch(loadingMotivosIncapacidades(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                mesageErrorAuthentication("Error de autenticacion",
                    "No tienes los permisos requeridos, Inicie sesion como administrador",
                    "error");
            }
        }
    }

    const getParentescos = async () => {
        try {
            const result = await findAllParentescos();
            dispatch(loadingParentescos(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                mesageErrorAuthentication("Error de autenticacion",
                    "No tienes los permisos requeridos, Inicie sesion como administrador",
                    "error");
            }
        }
    }

    const getEstudioFormales = async () => {
        try {
            const result = await findAllEstudioFormales();
            dispatch(loadingEstudiosFormales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                mesageErrorAuthentication("Error de autenticacion",
                    "No tienes los permisos requeridos, Inicie sesion como administrador",
                    "error");
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

        tiposAuxiliosIndividuales,
        tiposAuxiliosIndividualesBySindicatoId,
        sindicatos,
        semestres,
        parentescos,
        motivosIncapacidades,
        motivosJubilaciones,
        estudiosFormales,
        programasbyestudioformal,
        beneficiariosEstudio,

        initialTipoAuxilioIndividual,
    }
}