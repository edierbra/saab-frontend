import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { create, findAllUsersPageable, findUserByIdAndNombre, remove, update } from "../services/UserService"
import { useDispatch, useSelector } from "react-redux"
import {
    initialUserForm, addUser, removeUser, updateUser, loadingUsers, onUserSelectedForm,
    onOpenForm, onCloseForm, loadingError
} from "../store/slices/users/usersSlice"
import { useAuth } from "../auth/hooks/useAuth"
import { SwalErrorAuthentication, SwalContentDelete, SwalToastDelete, SwalToastCreateOrEdit } from "../components/recursos/SweetAlerts"

export const useUsers = () => {
    const { initialErrors, users, userSelected, visibleForm, errors, isLoading, paginator
    } = useSelector(state => state.users);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getUsers = async (page = 0) => {
        try {
            const result = await findAllUsersPageable(page); // findAllUsers()
            dispatch(loadingUsers(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 403) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const getUserByIdAndNombre = async (search = '', page = 0) => {
        try {
            const result = await findUserByIdAndNombre(search, page);
            dispatch(loadingUsers(result.data));
        } catch (error) {
            if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 403) {
                SwalErrorAuthentication(handlerLogout)
            }
        }
    }

    const handlerAddUser = async (user) => {

        if (!login.isAdmin) return;

        let response;

        try {

            if (userSelected?.id == '') {
                response = await create(user);
                dispatch(addUser(response.data));
            } else {
                response = await update(user);
                dispatch(updateUser(response.data));
            }

            SwalToastCreateOrEdit("success", "Usuario", userSelected?.id)

            handlerCloseForm();
            navigate('/users')

        } catch (error) {
            if (error.response && error.response?.status == 400) {
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
            } else if (error.response && error.response?.status == 409) { // conflictos
                dispatch(loadingError(error.response.data));
                console.log(error.response.data) // imprime eerores
            } else if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 403) {
                SwalErrorAuthentication(handlerLogout)
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveUser = (id) => {
        if (!login.isAdmin) return;

        Swal.fire({
            ...SwalContentDelete("question", "Usuario", "Usuario")
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id); // elimina de la base de datos
                    dispatch(removeUser(id));

                    SwalToastDelete("success", "Usuario eliminado con Exito")
                } catch (error) {
                    if (error.response && error.response?.status == 401) {
                        SwalErrorAuthentication(handlerLogout)
                    }
                }
            }
        })
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
        visibleForm,
        errors,
        isLoading,
        paginator,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
        getUserByIdAndNombre,
    }
}