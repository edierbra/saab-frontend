import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { findAllUsersPageable} from "../services/AuxilioIndividualService"
import { useDispatch, useSelector } from "react-redux"
import { initialUserForm, initialFuncionarioSearch, addUser, removeUser, updateUser, loadingUsers, onUserSelectedForm, onOpenForm, onCloseForm, loadingError, loadingUsersPage, onFuncionarioSearch } from "../store/slices/auxiliosindividuales/auxiliosIndividualesSlice"
import { useAuth } from "../auth/hooks/useAuth"

export const useAuxiliosIndividuales = () => {
    const { initialErrors, users, userSelected, visibleForm, errors, isLoading, paginator, funcionarioSearch } = useSelector(state => state.auxiliosindividuales);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getUsers = async (page = 0) => {
        try {
            const result = await findAllUsersPageable(page); // findAllUsers()
            dispatch(loadingUsers(result.data));
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

    const handlerAddUser = async (user) => {

        if (!login.isAdmin) return;

        let response;

        try {

            if (user.id === 0) {
                response = await create(user);
                dispatch(addUser(response.data));
            } else {
                response = await update(user);
                dispatch(updateUser(response.data));
            }

            Swal.fire(
                (user.id === 0) ? 'Usuario Creado' : 'Usuario Editado',
                (user.id === 0) ?
                    'El usuario ha sido creado con exito' :
                    'El usuario ha sido editado con exito',
                'success'
            )

            handlerCloseForm();
            navigate('/users')
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

    const handlerRemoveUser = (id) => {

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Quieres eliminar el usuario?',
            text: "El usuario sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id); // elimina de la base de datos

                    dispatch(removeUser(id));

                    Swal.fire(
                        'Usuario eliminado!',
                        'El usuario ha sido eliminado.',
                        'success'
                    )
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

    const handlerFuncionarioSearch = (funcionario) => {
        dispatch(onFuncionarioSearch({ ...funcionario }))
    }

    const handlerUserSelectedForm = (user) => {
        dispatch(onUserSelectedForm({ ...user }))
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm())
        dispatch(loadingError(initialErrors)) // limpia los errors
    }

    return {
        users,
        userSelected,
        initialUserForm,
        initialFuncionarioSearch,
        visibleForm,
        errors,
        isLoading,
        paginator,
        funcionarioSearch,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
        // getUsersPage,
    }
}