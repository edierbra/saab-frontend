import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { findFuncionarioById } from "../services/FuncionarioService"
import { useDispatch, useSelector } from "react-redux"
// import { initialUserForm, addUser, removeUser, updateUser, loadingUsers, onUserSelectedForm, onOpenForm, onCloseForm, loadingError, loadingUsersPage } from "../store/slices/users/usersSlice"
import { useAuth } from "../auth/hooks/useAuth"
import {  onFuncionarioSearch, onClearFuncionarioSearch } from "../store/slices/auxiliosindividuales/auxiliosIndividualesSlice"

export const useFuncionarios = () => {

    const dispatch = useDispatch();

    const { login, handlerLogout } = useAuth();

    const getFuncionarioById = async (id = 0) => {
        
        try {
            const result = await findFuncionarioById(id); // findAllUsers()
            dispatch(onFuncionarioSearch(result.data));
            return result.data;
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
            if (error.response && error.response?.status == 404) {
                dispatch(onClearFuncionarioSearch());
                Swal.fire(
                    `Funcionario no encontrado`,
                    `Funcionario identificado con ${id} no se encuientra en la base de datos`,
                    'error'
                )
            }
        }
    }


    return {
        getFuncionarioById
    }
}