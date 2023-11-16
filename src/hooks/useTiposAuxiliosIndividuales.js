import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../auth/hooks/useAuth"
import { loadingTiposAuxiliosIndividuales } from "../store/slices/tiposAuxiliosIndividuales/tiposAuxiliosIndividualesSlice"
import { findAllTiposAuxiliosIndividuales } from "../services/TipoAuxilioIndividualService"

export const useTiposAuxiliosIndividuales = () => {

    const { tiposAuxiliosIndividuales } =  useSelector(state => state.tiposAuxiliosIndividuales);
    const dispatch = useDispatch();
    const { login, handlerLogout } = useAuth();

    const getTiposAuxiliosIndividuales = async () => {
        
        try {
            const result = await findAllTiposAuxiliosIndividuales();
            dispatch(loadingTiposAuxiliosIndividuales(result.data));
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

    return {
        getTiposAuxiliosIndividuales,
        tiposAuxiliosIndividuales,
    }
}