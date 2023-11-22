import Swal from "sweetalert2"
import { loginUser } from "../services/authServices"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { onLogin, onLogout, onStartLogin } from "../../store/slices/auth/authSlice"

export const useAuth = () => {

    const dispatch = useDispatch();
    const { user, isAdmin, isRoot, isAuth, isLoginLoading } = useSelector(state => state.auth);

    const navigate = useNavigate();

    const handlerLogin = async ({ username, password }) => {

        try {
            dispatch(onStartLogin()); // muestra spiner de login
    
            const response = await loginUser({ username, password })

            const token = response.data.token;

            const claims = JSON.parse(window.atob(token.split(".")[1])); // En la posicion 1 se encuentra el payload 
            console.log(claims)

            const user = { username: response.data.username } // claims.sub or claims.username

            dispatch(onLogin({ user, isAdmin: claims.isAdmin, isRoot: claims.isRoot  }));

            sessionStorage.setItem('login', JSON.stringify(
                {
                    isAuth: true,
                    isAdmin: claims.isAdmin,
                    isRoot: claims.isRoot,
                    user: user,
                }
            ));

            sessionStorage.setItem('token', `Bearer ${token}`);

            navigate('/users')

        } catch (error) {
            
            dispatch(onLogout());
            if (error.response?.status == 401) {
                Swal.fire(
                    'Error de autenticación',
                    'Username o Password son incorrectos',
                    'error'
                )
            } else if (error.response?.status == 403) {
                Swal.fire(
                    'Error de autenticación',
                    'No tienes los permisos necesarios',
                    'error'
                )
            } else {
                throw error;
            }
        }
    }

    const handlerLogout = () => {
        Swal.fire({
            title: '¿Estas seguro que quieres salir de SAAB?',
            text: "¡Perderas lo que estas haciendo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, salir!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(onLogout());

                sessionStorage.removeItem('login');
                sessionStorage.removeItem('openSideBar');
                sessionStorage.removeItem('token');
                sessionStorage.clear();
            }
        })
    }

    return {
        login: {
            user,
            isAdmin,
            isRoot, 
            isAuth,
        },
        isLoginLoading,
        handlerLogin,
        handlerLogout,
    }
}