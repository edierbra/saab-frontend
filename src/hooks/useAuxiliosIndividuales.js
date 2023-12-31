import Swal from "sweetalert2"
import { useNavigate, useParams } from "react-router-dom"
import {
    findAllAuxilioIndividualesPageable, findAuxiliosIndividualesByNombreOrIdOrTipoPageable, create, update,
    remove,
    calcularValor,
    updateEstado
} from "../services/AuxilioIndividualService"
import { useDispatch, useSelector } from "react-redux"
import {
    initialAuxiliosIndividualForm, addAuxilioIndividual, removeAuxilioIndividual,
    updateAuxilioIndividual, loadingAuxilioIndividuales, onAuxilioIndividualSelectedForm,
    onOpenForm, onCloseForm, loadingError, loadingValorTotal, onAuxilioSelectedFormToUpdateEstado
} from "../store/slices/auxiliosindividuales/auxiliosIndividualesSlice"
import { useAuth } from "../auth/hooks/useAuth"
import { useFuncionarios } from "./useFuncionarios"
import { SwalErrorAuthentication, SwalContentDelete, SwalToastDelete, SwalToastCreateOrEdit, SwalToastErrorsFound, SwalToastNotFound } from "../components/recursos/SweetAlerts"

export const useAuxiliosIndividuales = () => {
    const { initialErrors, auxiliosIndividuales, auxiliosIndividualSelected, visibleForm,
        errors, isLoading, paginator, onlyShow, valorTotal, visibleEstadoForm } = useSelector(state => state.auxiliosindividuales);

    const { login, handlerLogout } = useAuth();
    const { handlerRemoveFuncionarioSearch } = useFuncionarios()

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page } = useParams()

    const getAuxiliosIndividuales = async (page = 0) => {
        try {
            const result = await findAllAuxilioIndividualesPageable(page); // findAllUsers()
            dispatch(loadingAuxilioIndividuales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getAuxiliosIndividualesByNombreOrIdOrTipoPageable = async (search = "", page = 0) => {
        try {
            const result = await findAuxiliosIndividualesByNombreOrIdOrTipoPageable(search, page);
            dispatch(loadingAuxilioIndividuales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 403) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const handlerAddAuxilioIndividual = async (auxilioIndividual) => {

        if (!login.isAdmin) return;

        let response;

        try {

            if (auxilioIndividual.id === 0) {
                response = await create(auxilioIndividual);
                dispatch(addAuxilioIndividual(response.data));
            } else {
                response = await update(auxilioIndividual);
                dispatch(updateAuxilioIndividual(response.data));
            }

            SwalToastCreateOrEdit("success", "Auxilio Individual", auxilioIndividual?.id)

            handlerCloseForm();
            navigate(`/auxilios-individuales/page/${page}`)
        } catch (error) {
            // const UK_username = 'UK_r43af9ap4edm43mmtq01oddj6'; // index de la columna de la DB
            // const UK_email = 'UK_6dotkott2kjsp8vw4d0m25fb7';
            if (error.response && error.response?.status == 400) {
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
                SwalToastErrorsFound("error", "Verifica los datos ingresados");
            } else if (error.response && error.response?.status == 409) { // conflictos
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
                SwalToastErrorsFound("error", "Verifica los datos ingresados");
            } else if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 404) {
                SwalToastNotFound("error", error.response.data.error)
                dispatch(loadingError(initialErrors));
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveAuxilioIndividual = (id) => {

        if (!login.isAdmin) return;

        Swal.fire({
            ...SwalContentDelete("question", "Auxilio Individual", "Auxilio Individual")
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id); // elimina de la base de datos
                    dispatch(removeAuxilioIndividual(id));

                    SwalToastDelete("success", "Auxilio Individual eliminado con Exito")
                } catch (error) {
                    if (error.response && error.response?.status == 401) {
                        SwalErrorAuthentication(handlerLogout)
                    }
                }
            }
        })
    }

    const handlerCalcularAuxilioIndividual = async (auxilioIndividual) => {

        if (!login.isAdmin) return;

        let response;

        try {
            response = await calcularValor(auxilioIndividual);
            dispatch(loadingValorTotal(response.data));
        } catch (error) {
            if (error.response && error.response?.status == 400) {
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime errores
                SwalToastErrorsFound("error", "Verifica los datos ingresados");
            } else if (error.response && error.response?.status == 409) { // conflictos
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
                SwalToastErrorsFound("error", "Verifica los datos ingresados");
            } else if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 404) {
                SwalToastNotFound("error", error.response.data.error)
                dispatch(loadingError(initialErrors));
            } else {
                throw error;
            }
        }
    }

    const handlerUpdateEstadoAuxilio = async (auxilioIndividual) => {

        if (!login.isAdmin) return;

        let response;

        try {

            response = await updateEstado(auxilioIndividual);
            dispatch(updateAuxilioIndividual(response.data));

            SwalToastCreateOrEdit("success", "Auxilio Individual", auxilioIndividual?.id)

            handlerCloseForm();
            navigate(`/auxilios-individuales/page/${page}`)
        } catch (error) {
            if (error.response && error.response?.status == 400) {
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
                SwalToastErrorsFound("error", "Verifica los datos ingresados");
            } else if (error.response && error.response?.status == 409) { // conflictos
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
                SwalToastErrorsFound("error", "Verifica los datos ingresados");
            } else if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 404) {
                SwalToastNotFound("error", error.response.data.error)
                dispatch(loadingError(initialErrors));
            } else {
                throw error;
            }
        }
    }

    

    const handlerAuxilioIndividualSelectedForm = (data) => {
        dispatch(onAuxilioIndividualSelectedForm({ ...data }))
    }
    
    const handlerAuxilioSelectedFormToUpdateEstado = (id) => {
        dispatch(onAuxilioSelectedFormToUpdateEstado(id))
    }

    const handlerOpenForm = () => {
        handlerRemoveFuncionarioSearch();
        dispatch(onOpenForm())
    }

    const addError = (error) => {
        dispatch(loadingError({
            // ...errors,
            ...error
        }))
        SwalToastErrorsFound("error", "Verifica los datos ingresados");
    }

    const clearErrors = () => {
        dispatch(loadingError(initialErrors))
    }

    const handlerCloseForm = () => {
        handlerRemoveFuncionarioSearch();
        dispatch(onCloseForm())
        dispatch(loadingError(initialErrors)) // limpia los errors
    }

    return {
        auxiliosIndividuales,
        auxiliosIndividualSelected,
        initialAuxiliosIndividualForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        onlyShow,
        valorTotal,
        visibleEstadoForm,

        handlerAddAuxilioIndividual,
        handlerUpdateEstadoAuxilio,
        handlerRemoveAuxilioIndividual,
        handlerAuxilioIndividualSelectedForm,
        handlerAuxilioSelectedFormToUpdateEstado,
        handlerOpenForm,
        handlerCloseForm,
        getAuxiliosIndividuales,
        getAuxiliosIndividualesByNombreOrIdOrTipoPageable,
        addError,
        clearErrors,
        handlerCalcularAuxilioIndividual,
        // getUsersPage,
    }
}