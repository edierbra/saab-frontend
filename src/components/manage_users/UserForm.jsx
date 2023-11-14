import { useEffect, useState } from "react"
import { useUsers } from "../../hooks/useUsers";

export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { initialUserForm, handlerAddUser, errors } = useUsers();

    const [userForm, setUserForm] = useState(initialUserForm);
    const [checked, setChecked] = useState(userForm.admin);
    const { id, username, password, email, admin } = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: '',
        })
    }, [userSelected])

    const onInputChange = ({ target }) => {

        const { name, value } = target;
        setUserForm(
            {
                ...userForm,
                [name]: value
            }
        )
    }

    const onCheckboxChange = () => {
        setChecked(!checked);
        setUserForm({
            ...userForm,
            admin: checked,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault(); // permite que no se recargue la pagina cundo se envia el formulario
        // if (!username || (!password && id === 0) || !email) {
        //     Swal.fire(
        //         'Error de Validacion',
        //         'Todos los campos son obligatorios!',
        //         'error'
        //     )

        //     return;
        // }

        // if (!email.includes('@')) {

        //     Swal.fire(
        //         'Error de Validacion',
        //         'El Email debe incluir un @!',
        //         'error'
        //     )

        //     return;
        // }

        handlerAddUser(userForm) // Guardar el userFrom en userList

        // setUserForm(initialUserForm) // Limpiar el userForm
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    className="form-control m-0 w-100"
                    type="text"
                    value={username}
                    name="username"
                    placeholder="username"
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.username}</p>

                {id > 0 || (
                    <input
                        className="form-control m-0 w-100"
                        type="password"
                        value={password}
                        name="password"
                        placeholder="password"
                        onChange={onInputChange}
                    />)
                }
                <p className="text-danger">{errors?.password}</p>

                <input
                    className="form-control mt-3 w-100"
                    type="text"
                    value={email}
                    name="email"
                    placeholder="email"
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.email}</p>

                <div className="mb-3 form-check">
                    <input type="checkbox"
                        name="admin"
                        checked={admin}
                        className="form-check-input"
                        onChange={onCheckboxChange}
                    />
                    <label className="form-ckeck-label">{ 'Admin' }</label>
                </div>

                <input
                    className="form-control mt-3 w-100"
                    type="hidden"
                    value={id}
                    name="id"
                    placeholder="id"
                    onChange={onInputChange}
                />
                <button
                    className="btn btn-primary"
                    type="submit">
                    {id > 0 ? 'Edit' : 'Add'}
                </button>

                {!handlerCloseForm ||
                    <button
                        className="btn btn-primary mx-2"
                        type="button"
                        onClick={onCloseForm}>
                        Hide Form
                    </button>
                }

            </form>
        </>
    )
}