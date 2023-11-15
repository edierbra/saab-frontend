import { useState } from "react"
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";

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
                    <p className="text-center mb-4 fs-24px">{'SAAB'}</p>
                    
                    <form onSubmit={onSubmit}>

                        <p className="text-center mb-3 text-black fw-bold fs-4">{'Sing In '}</p>

                        <div class="mb-2">
                            <label className="form-label fs-16px-login-label ">Usuario:</label>
                            <input
                                type="text" className="form-control rounded-pill fs-16px-login-input"
                                placeholder="Ingresa tu usuario" name='username' value={username}
                                onChange={onInputChange}
                            />
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label fs-16px-login-label">Contraseña: </label>
                            <div class="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control rounded-end rounded-pill fs-16px-login-input"
                                    placeholder="Ingresa tu contraseña" name='password' value={password}
                                    onChange={onInputChange}
                                />
                                <button
                                    className="btn btn-outline-secondary rounded-pill rounded-start"
                                    disabled={password ? false : true}
                                    type="button"
                                    onClick={togglePassword}>
                                    <i class="bi bi-eye-fill"></i>
                                </button>
                            </div>
                        </div>

                        <div className="d-flex align-content-center justify-content-center">
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