import { useEffect, useRef, useState } from "react"
import { useUsers } from "../../hooks/useUsers";
import { BtnSubmit } from "../layout/BtnSubmit";
import { Btn } from "../layout/Btn";
import { DividerSimple } from "../layout/DividerSimple";

export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { initialUserForm, handlerAddUser, errors } = useUsers();

    const [userForm, setUserForm] = useState(initialUserForm);
    const [checked, setChecked] = useState({ admin: userForm.admin, root: userForm.root });
    const { id, username, password, email, admin, root, nombre } = userForm;
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        setUserForm({
            ...userSelected,
        })
    }, [userSelected])

    useEffect(() => {
        if (root == true) {
            setChecked({
                ...checked,
                admin: true
            });
            setUserForm({
                ...userForm,
                admin: true
            })
        }
    }, [, admin, root])


    const onInputChange = ({ target }) => {
        console.log(target)
        const { name, value } = target;
        setUserForm(
            {
                ...userForm,
                [name]: value
            }
        )
        console.log(userForm);
    }

    const onCheckboxChange = ({ target }) => {
        const { name } = target;
        setChecked({
            ...checked,
            [name]: name == 'admin' ? !checked.admin : name == 'root' && !checked.root,
        });
        setUserForm({
            ...userForm,
            [name]: name == 'admin' ? !checked.admin : name == 'root' && !checked.root,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(userForm)

        handlerAddUser(userForm) // Guardar el userFrom en userList
    }

    const onCloseForm = () => {
        setUserForm(initialUserForm);
        handlerCloseForm();
    }

    return (
        <>
            <form className="" onSubmit={onSubmit} noValidate >
                <div className="overflow-auto" style={{ maxHeight: "52vh" }}>
                    <div className=" mx-0">

                        {userSelected?.id == "" && (
                            <div className="mb-1">
                                <label className="form-label fs-16px-login-label mb-0">Identificacion</label>
                                <input
                                    type="number" className="form-control date rounded-pill fs-16px-login-input py-0"
                                    placeholder="Identificacion" name='id' value={id}
                                    onChange={onInputChange}
                                />
                                <p className="text-danger mb-0">{errors?.id}</p>
                            </div>
                        )}

                        <div className="mb-1">
                            <label className="form-label fs-16px-login-label mb-0">Nombre</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Nombre" name='nombre' value={nombre}
                                onChange={onInputChange}
                            />
                            <p className="text-danger mb-0">{errors?.nombre}</p>
                        </div>

                        <div className="mb-1 ">
                            <label className="form-label fs-16px-login-label mb-0">Username</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Username" name='username' value={username}
                                onChange={onInputChange}
                            />
                            <p className="text-danger mb-0">{errors?.username}</p>
                        </div>

                        {userSelected?.id == '' && (
                            <div className="mb-1">
                                <label className="form-label fs-16px-login-label mb-0">Contraseña</label>
                                <div className="input-group input-group-sm">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control rounded-end rounded-pill fs-16px-login-input py-0"
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
                                <p className="text-danger mb-0">{errors?.password}</p>
                            </div>
                        )}

                        <div className="mb-1 ">
                            <label className="form-label fs-16px-login-label mb-0">Correo</label>
                            <input
                                type="text" className="form-control date rounded-pill fs-16px-login-input py-0"
                                placeholder="Email" name='email' value={email}
                                onChange={onInputChange}
                            />
                            <p className="text-danger mb-0">{errors?.email}</p>
                        </div>

                        <div className="d-flex">
                            <span className="me-2 fs-16px-login-label">Role:</span>
                            <div className="mb-3 form-check  me-4">
                                <input type="checkbox"
                                    name="admin"
                                    checked={admin}
                                    className="form-check-input"
                                    onChange={onCheckboxChange}
                                    disabled={root == true}
                                />
                                <label className="form-ckeck-label">{'Admin'}</label>
                            </div>

                            <div className="mb-3 form-check me-4">
                                <input type="checkbox"
                                    name="root"
                                    checked={root}
                                    className="form-check-input"
                                    onChange={onCheckboxChange}
                                />
                                <label className="form-ckeck-label">{'Root'}</label>
                            </div>
                        </div>

                    </div>
                </div>

                <DividerSimple />

                <div className="">
                    <BtnSubmit
                        icon={"bi bi-floppy-fill"}
                        style={"btn btn-mybotton btn-color-blue"}
                        text={userSelected?.id == '' ? 'Agregar' : 'Editar'}
                        type={"submit"}
                    />

                    {!handlerCloseForm ||

                        <Btn
                            onClick={onCloseForm}
                            dataOnClick={''}
                            icon={"bi bi-x-lg"}
                            style={"btn btn-mybotton btn-color-red"}
                            text={'Cerrar'}
                            type={"button"}
                        />
                    }
                </div>

            </form>
        </>
    )
}