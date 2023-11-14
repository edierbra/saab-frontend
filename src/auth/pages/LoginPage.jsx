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

    return (
        <>
            <div className='login tempalte d-flex justify-content-center align-items-center w-100 vh-100 bg-primary'>
                <div className="p-5 rounded bg-white form_container_login">
                    <form onSubmit={onSubmit}>

                        <h3 className="text-center mb-4 fs-24px">{'SAAB'}</h3>

                        <h3 className="text-center mb-3">{'Sing In '}</h3>

                        <div className="input-group mb-3">
                            <label className="input-group-text">Username</label>
                            <input
                                type="text" className="form-control"
                                placeholder="Username" name='username' value={username}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="input-group mb-4">
                            <label className="input-group-text">Password</label>
                            <input
                                type="password" className="form-control"
                                placeholder="Password" name='password' value={password}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="d-grid ">
                            <button
                                type="submit"
                                className="btn btn-primary">
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