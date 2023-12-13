import { useState } from "react"
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import logo from '../../assets/logo.png';
import logoU from '../../assets/iconLoginPage/LogoUWhiteS.png'
import nombreU from '../../assets/iconLoginPage/nombreUWhiteS.png'
import { Divider } from "../../components/layout/Divider";

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
            <div className='login tempalte d-flex flex-column w-100 vh-100 bg-blue'>
                <div className="mt-4 d-flex flex-column flex-lg-row align-items-center justify-content-center">
                    <a href="https://www.unicauca.edu.co/versionP/" className="m-0 p-0 w-auto">
                        <img className="me-1" src={logoU} alt="Logo" width={'90px'} />
                        <img className="" src={nombreU} alt="Logo" width={'90px'} />
                    </a>

                    <div className="w-2px h-50 bg-white mx-2 d-none d-lg-inline-block rounded rounded-pill" />

                    <div className="d-flex mt-4 mt-lg-0 flex-column text-white fs-16px text-center text-lg-start">
                        <span>Sistema de Administracion de</span>
                        <span>Auxilios y Bienestar</span>
                    </div>
                </div>

                <div className='mt-4 mb-5 d-flex justify-content-center align-items-center d flex-column bg-blue'>
                    <div className="px-4 py-1 rounded bg-login form_container_login">
                        <img className="logo-size d-flex m-auto mb-0" src={logo} alt="Logo" />
                        <p className="text-center mb-0 fs-24px">{'SAAB'}</p>

                        <form onSubmit={onSubmit}>

                            <p className="text-center mb-0 text-black fw-bold fs-5">{'Iniciar Sesión'}</p>

                            <div className="mb-1 input-group-sm">
                                <label className="form-label fs-16px-login-label mb-0">Usuario:</label>
                                <input
                                    type="text" className="form-control rounded-pill fs-16px-login-input "
                                    placeholder="Ingresa tu usuario" name='username' value={username}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="password" className="form-label fs-16px-login-label mb-0">Contraseña: </label>
                                <div className="input-group input-group-sm rounded-pill rounded-start">
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
                                    disabled={isLoginLoading ? true : false}
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

                <div className="mb-2 mx-auto d-none d-lg-flex flex-column text-white fs-16px text-start">
                    <span>2023 | División de Talento Humano</span>
                    <span>Universidad del Cauca | talentohumano@unicauca.edu.co</span>
                    <span>Versión: v1.0</span>
                </div>

                <div className="mt-0 mb-0 m-auto d-flex flex-row fs-3">
                    <a href="https://www.facebook.com/" className="bi bi-facebook me-3 text-white"></a>
                    <a href="https://www.facebook.com/" className="bi bi-instagram me-3 text-white"></a>
                    <a href="https://www.facebook.com/" className="bi bi-youtube me-3 text-white"></a>
                    <a href="https://www.facebook.com/" className="bi bi-linkedin me-0 text-white"></a>
                </div>
            </div>
        </>
    )
}