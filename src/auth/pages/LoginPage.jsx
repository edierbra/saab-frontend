import { useState } from "react"
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import logo from '../../assets/logo.png'; 

const initialLoginForm = {
    username: '',
    password: '',
}

export const LoginPage = () => {

    const { handlerLogin, isLoginLoading } = useAuth();

    const [loginForm, setLoginForm] = useState(initialLoginForm);

    const [showPassword, setShowPassword] = useState(false);

    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm(
            {
                ...loginForm,
                [name]: value,
            }
        )
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(loginForm)

        if (!username || !password) {
            Swal.fire(
                'Campos obligatorios',
                'Username y Password son requeridos',
                'error'
            )
            return;
        }

        handlerLogin({ username, password });

        setLoginForm(initialLoginForm);
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className='login tempalte d-flex justify-content-center align-items-center w-100 vh-100 bg-blue'>
                <div className="px-5 py-3 rounded bg-login form_container_login">
                    <img className="logo-size d-flex m-auto mb-0" src={logo} alt="Logo" />
                    <p className="text-center mb-0 fs-24px">{'SAAB'}</p>
                    
                    <form onSubmit={onSubmit}>

                        <p className="text-center mb-0 text-black fw-bold fs-5">{'Sing In '}</p>

                        <div className="mb-2 input-group-sm">
                            <label className="form-label fs-16px-login-label mb-0">Usuario:</label>
                            <input
                                type="text" className="form-control rounded-pill fs-16px-login-input "
                                placeholder="Ingresa tu usuario" name='username' value={username}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fs-16px-login-label mb-0">Contraseña: </label>
                            <div className="input-group input-group-sm">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control rounded-end rounded-pill fs-16px-login-input "
                                    placeholder="Ingresa tu contraseña" name='password' value={password}
                                    onChange={onInputChange}
                                />

                                <button
                                    className="btn btn-outline-secondary rounded-pill rounded-start"
                                    disabled={password ? false : true}
                                    type="button"
                                    onClick={togglePassword}>
                                    <i className="bi bi-eye-fill"></i>
                                </button>
                            </div>
                        </div>

                        <div className="d-flex mb-2 align-content-center justify-content-center">
                            <button
                                type="submit"
                                disabled={isLoginLoading? true : false}
                                className="btn btn-login rounded-pill">
                                {
                                    isLoginLoading ? (
                                        <>
                                            <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true"></span>
                                            <span role="status">Iniciando sesión...</span>
                                        </>
                                    ) : (
                                        'Ingresar'
                                    )
                                }
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}