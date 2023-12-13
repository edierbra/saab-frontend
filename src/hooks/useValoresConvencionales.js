import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import {
    calcularValor,
    create,
    findAllValoresConvencionalesPageable, findValoresConvencionalesByTipoNegociacionNombreOrNegociacionNombre, remove, update
} from "../services/ValorConvencionalService"
import { useDispatch, useSelector } from "react-redux"
import {
    initialValorConvencionalForm, initialValuesCalculo, addValorConvencional, removeValorConvencional,
    updateValorConvencional, loadingValoresConvencionales, onValorConvencionalSelectedForm,
    onOpenForm, onCloseForm, loadingError, loadingValorTotal
} from "../store/slices/valoresconvencionales/valoresConvencionalesSlice"
import { useAuth } from "../auth/hooks/useAuth"
import { SwalErrorAuthentication, SwalContentDelete, SwalToastDelete, SwalToastCreateOrEdit, SwalToastNotFound, SwalToastErrorsFound } from "../components/recursos/SweetAlerts"

export const useValoresConvencionales = () => {
    const { initialErrors, valoresConvencionales, valorConvencionalSelected, visibleForm,
        errors, isLoading, paginator, onlyShow, valorTotal } = useSelector(state => state.valoresconvencionales);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getValoresConvencionales = async (page = 0) => {
        try {
            const result = await findAllValoresConvencionalesPageable(page);
            dispatch(loadingValoresConvencionales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 403) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getValoresConvencionalesByTipoNegociacionNombreOrNegociacionNombrePageable = async (search = "", page = 0) => {
        try {
            const result = await findValoresConvencionalesByTipoNegociacionNombreOrNegociacionNombre(search, page);
            dispatch(loadingValoresConvencionales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 403) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const handlerAddValorConvencional = async (valorConvencional) => {

        if (!login.isAdmin) return;

        let response;

        try {

            if (valorConvencional.id == 0) {
                response = await create(valorConvencional);
                dispatch(addValorConvencional(response.data));
            } else {
                response = await update(valorConvencional);
                dispatch(updateValorConvencional(response.data));
            }

            SwalToastCreateOrEdit("success", "Valor Convencional", valorConvencional?.id)

            handlerCloseForm();
            navigate('/valores-convencionales')
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
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveValorConvencional = (id) => {

        if (!login.isAdmin) return;

        Swal.fire({
            ...SwalContentDelete("question", "Valor Convencional", "Valor Convencional")
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id); // elimina de la base de datos
                    dispatch(removeValorConvencional(id));

                    SwalToastDelete("success", "Valor Convencional eliminado con Exito")
                } catch (error) {
                    if (error.response && error.response?.status == 401) {
                        SwalErrorAuthentication(handlerLogout)
                    }
                }
            }
        })
    }

    const handlerCalcularValorConvencional = async (valuesCalculo) => {

        if (!login.isAdmin) return;

        let response;

        try {
            response = await calcularValor(valuesCalculo);
            console.log(response)
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
                SwalToastNotFound("error", "No se encontro un concepto para la Fecha ingresada")
                dispatch(loadingError(initialErrors));
            } else {
                throw error;
            }
        }
    }

    const handlerValorConvencionalSelectedForm = (data) => {
        dispatch(onValorConvencionalSelectedForm({ ...data }))
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm())
    }

    const addError = (error) => {
        dispatch(loadingError({
            // ...errors,
            ...error
        }))
        SwalToastErrorsFound("error", "Verifica los datos ingresados");
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm())
        dispatch(loadingError(initialErrors)) // limpia los errors
    }

    return {
        valoresConvencionales,
        valorConvencionalSelected,
        initialValorConvencionalForm,
        initialValuesCalculo,
        visibleForm,
        errors,
        isLoading,
        paginator,
        onlyShow,
        valorTotal,

        handlerValorConvencionalSelectedForm,
        handlerAddValorConvencional,
        handlerRemoveValorConvencional,
        handlerOpenForm,
        handlerCloseForm,
        handlerCalcularValorConvencional,
        getValoresConvencionales,
        getValoresConvencionalesByTipoNegociacionNombreOrNegociacionNombrePageable,
        addError,
    }
}