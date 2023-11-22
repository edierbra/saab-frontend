import { NavLink } from "react-router-dom"
import { useAuth } from "../../auth/hooks/useAuth";
import { useUsers } from "../../hooks/useUsers";
import { Btn } from "../layout/Btn";

export const UserRow = ({ id ,nombre, username, email, admin, root }) => {

    const { handlerRemoveUser, handlerUserSelectedForm } = useUsers();
    const { login } = useAuth()

    const showIcon = (value, icon) => {
        return !value ? <i className={`text-danger bi bi-x-circle-fill`}></i> : <i className={`text-success bi bi-check-circle-fill`}></i>
    }

    return (
        <>
            <tr >
                <td className="px-2 py-0">{id}</td>
                <td className="px-2 py-0">{nombre}</td>
                <td className="px-2 py-0">{username}</td>
                <td className="px-2 py-0">{email}</td>
                <td className="px-2 py-0">{showIcon(admin)}</td>
                <td className="px-2 py-0">{showIcon(root)}</td>
                {!login.isAdmin ||
                    <>
                        <td className="px-2 py-1">
                            <div className="d-flex justify-content-start">

                                <Btn
                                    onClick={handlerUserSelectedForm}
                                    dataOnClick={
                                        {
                                            id: id,
                                            username, // Es lo msimo si coloco los :
                                            email: email,
                                            admin,
                                            nombre,
                                            root,
                                            // password,
                                        }
                                    }
                                    icon={"bi bi-pencil-square"}
                                    style={"btn btn-mybotton btn-color-blue"}
                                />

                                {/* <NavLink
                                    type="button"
                                    className="btn btn-outline-primary btn-sm ms-1 p-0"
                                    to={'/users/edit/' + id}
                                >
                                    <i typeof="button" className="bi bi-pencil-square mx-1 fs-5">Page</i>
                                </NavLink> */}

                                <Btn
                                    onClick={handlerRemoveUser}
                                    dataOnClick={id}
                                    icon={"bi bi-trash-fill"}
                                    style={"btn btn-mybotton btn-color-red"}
                                />
                            </div>
                        </td>
                    </>
                }
            </tr>
        </>
    )
}