import Swal from "sweetalert2"
import {
    findFuncionarioById, findFuncionarioByIdAndNombre, findAllFuncionariosPageable,
    create, update, remove, findAllFuncionarios, uploadData
} from "../services/FuncionarioService"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../auth/hooks/useAuth"
import {
    onFuncionarioSearch, onClearFuncionarioSearch, removeFuncionario, initialFuncionarioForm,
    loadingFuncionarios, onOpenForm, onFuncionarioSelectedForm, onCloseForm, loadingError,
    addFuncionario, updateFuncionario, loadingAllFuncionarios, loadingFuncionariosExcel,
    loadingErrorList, loadingFuncionariosAndErrors, onChangeIsWithErrors, onSetIndice, removeFuncionarioAndError, setIsLoanding
} from "../store/slices/funcionarios/funcionariosSlice"
import { useNavigate, useParams } from "react-router-dom"
import { SwalErrorAuthentication, SwalContentDelete, SwalToastDelete, SwalToastCreateOrEdit, SwalToastNotFound, SwalToastErrorsFound } from "../components/recursos/SweetAlerts"

export const useFuncionarios = () => {

    const { funcionarioSearch, visibleForm, errors, funcionarioSelected, funcionarios, allFuncionarios, paginator,
        isLoading, initialErrors, errorsList, funcionariosAndErrors, isWithErrors, indice } = useSelector(state => state.funcionarios);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page } = useParams()

    const { login, handlerLogout } = useAuth();

    const getAllFuncionarios = async () => { // retorna todos los funcionarios
        try {
            const result = await findAllFuncionarios();
            dispatch(loadingAllFuncionarios(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getFuncionarios = async (page = 0) => {
        try {
            const result = await findAllFuncionariosPageable(page); // findAllUsers()
            dispatch(loadingFuncionarios(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 403) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getFuncionarioById = async (id = 0) => {
        try {
            const result = await findFuncionarioById(id);
            dispatch(onFuncionarioSearch(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            }
            if (error.response && error.response?.status == 404) {
                dispatch(onClearFuncionarioSearch());
                SwalToastNotFound("error", "Funcionario no encontrado")
            }
        }
    }

    const getFuncionarioByIdAndNombre = async (search = '', page = 0, message = 0) => {
        try {
            const result = await findFuncionarioByIdAndNombre(search, page);
            dispatch(loadingFuncionarios(result.data));
            dispatch(onFuncionarioSearch(result.data?.content[0]));
            if (result.data?.totalElements == 0) {
                dispatch(onClearFuncionarioSearch());
            }
        } catch (error) {
            if (error.response && error.response?.status == 401) { //authenticacion reuqrida
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 403) { //authenticacion reuqrida
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 404) { // not Found
                dispatch(onClearFuncionarioSearch());
                SwalToastNotFound("error", "Funcionario no encontrado")
            }
        }
    }

    const handlerAddFuncionario = async (funcionario) => {
        if (!login.isAdmin) return;

        const exist = allFuncionarios.some(f => f.id == funcionario.id); // busca si en todos los funcionarios se encuentra funcionario

        let response;
        try {
            if (funcionarioSelected?.id == '' || !exist) {
                response = await create(funcionario);
                dispatch(addFuncionario(response?.data));
            } else {
                response = await update(funcionario);
                dispatch(updateFuncionario(response.data));
            }

            SwalToastCreateOrEdit("success", "Funcionario", funcionarioSelected?.id)

            handlerCloseForm();
            funcionariosAndErrors.length > 0 && dispatch(removeFuncionarioAndError(indice))
            isWithErrors ? navigate('/upload-data') : navigate('/funcionarios')

        } catch (error) {
            if (error.response && error.response?.status == 400) { // Bad rrequest
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
            }
            if (error.response && error.response?.status == 409) { // conflictos
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
            }
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveFuncionario = (id) => {
        if (!login.isAdmin) return;
        let response;

        Swal.fire({
            ...SwalContentDelete("question", "Funcionario", "Funcionario")
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(setIsLoanding(true));
                try {
                    response = await remove(id); // elimina de la base de datos
                    dispatch(removeFuncionario(id));
                    dispatch(setIsLoanding(false));

                    SwalToastDelete("success", "Funcionario eliminado con Exito")
                } catch (error) {
                    dispatch(setIsLoanding(false));
                    if (error.response && error.response?.status == 401) { //Authenticacion reuquerida
                        SwalErrorAuthentication(handlerLogout)
                    } else if (error.response && error.response?.status == 409) { // conflictos
                        SwalToastDelete("error", error.response.data.auxilios)
                    }
                }
            }
        })
    }

    const handlerUploadData = async (file) => {
        if (!login.isAdmin) return;
        let result;

        try {
            dispatch(setIsLoanding(true));
            result = await uploadData(file);

            dispatch(loadingFuncionariosAndErrors(result.data));
            console.log(result.data.length == 0)
            dispatch(setIsLoanding(false));
            if (result.data.length == 0) {
                SwalToastErrorsFound("success", "Todos los Funcionarios se cargaron correctamente");
            } else {
                SwalToastErrorsFound("error", `Verifica los datos, ${result.data.length} Funcionario(s) con error(es)`);
            }
            navigate('/upload-data')
        } catch (error) {
            dispatch(setIsLoanding(false));
            if (error.response && error.response?.status == 400) { //Bad Request
                dispatch(loadingError(error.response.data));
                console.log(error.response.data)
            }
            if (error.response && error.response?.status == 409) { // conflictos
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
            }
            if (error.response && error.response?.status == 401) { // authenticacion requerida
                SwalErrorAuthentication(handlerLogout)
            } else {
                throw error;
            }
        }
    }

    const handlerFuncionarioSelectedForm = ({ funcionario, position = null }) => {
        dispatch(onFuncionarioSelectedForm({ ...funcionario }))
        dispatch(onSetIndice(position));
        dispatch(loadingError(funcionariosAndErrors[position]?.errors))
    }

    const handlerDeleteFuncionarioAndError = (position) => {
        dispatch(removeFuncionarioAndError(position));
    }

    const handlerRemoveFuncionarioSearch = () => {
        dispatch(onClearFuncionarioSearch());
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

    const handlerChangeIsWithErrors = (value) => {
        dispatch(onChangeIsWithErrors(value));
    }

    const handlerIsLoanding = (value) => {
        dispatch(setIsLoanding(value));
    }

    return {
        funcionarios,
        allFuncionarios,
        paginator,
        visibleForm,
        errors,
        funcionarioSelected,
        isLoading,
        initialFuncionarioForm,
        funcionarioSearch,
        errors,
        errorsList,
        funcionariosAndErrors,
        isWithErrors,

        getFuncionarioById,
        getFuncionarioByIdAndNombre,
        getAllFuncionarios,
        onFuncionarioSearch,
        handlerRemoveFuncionarioSearch,
        handlerRemoveFuncionario,
        getFuncionarios,
        handlerOpenForm,
        handlerCloseForm,
        addError,
        handlerFuncionarioSelectedForm,
        handlerAddFuncionario,
        handlerUploadData,
        handlerChangeIsWithErrors,
        handlerDeleteFuncionarioAndError,
        handlerIsLoanding,
    }
}