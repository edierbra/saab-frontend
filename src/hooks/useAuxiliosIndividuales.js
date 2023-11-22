import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import {
    findAllAuxilioIndividualesPageable, findAuxiliosIndividualesByNombreOrIdOrTipoPageable, create, update,
    remove
} from "../services/AuxilioIndividualService"
import { useDispatch, useSelector } from "react-redux"
import {
    initialAuxiliosIndividualForm, addAuxilioIndividual, removeAuxilioIndividual,
    updateAuxilioIndividual, loadingAuxilioIndividuales, onAuxilioIndividualSelectedForm,
    onOpenForm, onCloseForm, loadingError
} from "../store/slices/auxiliosindividuales/auxiliosIndividualesSlice"
import { useAuth } from "../auth/hooks/useAuth"
import { useFuncionarios } from "./useFuncionarios"

export const useAuxiliosIndividuales = () => {
    const { initialErrors, auxiliosIndividuales, auxiliosIndividualSelected, visibleForm,
        errors, isLoading, paginator, onlyShow } = useSelector(state => state.auxiliosindividuales);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const { handlerRemoveUserSearch } = useFuncionarios()

    const getAuxiliosIndividuales = async (page = 0) => {
        try {
            const result = await findAllAuxilioIndividualesPageable(page); // findAllUsers()
            dispatch(loadingAuxilioIndividuales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                Swal.fire({
                    title: 'Error de autenticacion',
                    text: "No tienes los permisos requeridos, Inicie sesion como administrador",
                    icon: 'error',
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
        }
    }

    const getAuxiliosIndividualesByNombreOrIdOrTipoPageable = async (search = "", page = 0) => {
        try {
            const result = await findAuxiliosIndividualesByNombreOrIdOrTipoPageable(search, page); // findAllUsers()
            dispatch(loadingAuxilioIndividuales(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                Swal.fire({
                    title: 'Error de autenticacion',
                    text: "No tienes los permisos requeridos, Inicie sesion como Admin o Root",
                    icon: 'error',
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

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: (auxilioIndividual.id === 0) ? 'Auxilio Creado' : 'Auxilio Editado',
                width: 300,
                showConfirmButton: false,
                timer: 1500
            })
            handlerCloseForm();
            navigate('/auxilios-individuales')
        } catch (error) {
            // const UK_username = 'UK_r43af9ap4edm43mmtq01oddj6'; // index de la columna de la DB
            // const UK_email = 'UK_6dotkott2kjsp8vw4d0m25fb7';
            if (error.response && error.response?.status == 400) {
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
            } else if (error.response && error.response?.status == 409) { // conflictos
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
            } else if (error.response && error.response?.status == 401) {
                Swal.fire({
                    title: 'Error de autenticacion',
                    text: "No tienes los permisos requeridos, Inicie sesion como administrador",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        handlerLogout()
                    }
                })
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveAuxilioIndividual = (id) => {

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Quieres eliminar el auxilio?',
            text: "El auxilio sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id); // elimina de la base de datos
                    dispatch(removeAuxilioIndividual(id));

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Auxilio eliminado!',
                        width: 300,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } catch (error) {
                    if (error.response && error.response?.status == 401) {
                        Swal.fire({
                            title: 'Error de autenticacion',
                            text: "No tienes los permisos requeridos, Inicie sesion como administrador",
                            icon: 'error',
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
                }
            }
        })
    }

    const handlerAuxilioIndividualSelectedForm = (data) => {
        dispatch(onAuxilioIndividualSelectedForm({ ...data }))
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm())
        handlerRemoveUserSearch();
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

        handlerAddAuxilioIndividual,
        handlerRemoveAuxilioIndividual,
        handlerAuxilioIndividualSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getAuxiliosIndividuales,
        getAuxiliosIndividualesByNombreOrIdOrTipoPageable,
        // getUsersPage,
    }
}