import Swal from "sweetalert2"
import { findFuncionarioById } from "../services/FuncionarioService"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../auth/hooks/useAuth"
import {  onFuncionarioSearch, onClearFuncionarioSearch, initialFuncionarioForm } from "../store/slices/funcionarios/funcionariosSlice"

export const useFuncionarios = () => {

    const { funcionarioSearch } =  useSelector(state => state.funcionarios);

    const dispatch = useDispatch();

    const { login, handlerLogout } = useAuth();

    const getFuncionarioById = async (id = 0) => {
        
        try {
            const result = await findFuncionarioById(id);
            dispatch(onFuncionarioSearch(result.data));
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

    const handlerRemoveUserSearch = () => {
        dispatch(onClearFuncionarioSearch());
    }

    return {
        getFuncionarioById,
        funcionarioSearch,
        onFuncionarioSearch, 
        initialFuncionarioForm,
        handlerRemoveUserSearch,
    }
}