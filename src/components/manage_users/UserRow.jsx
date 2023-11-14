import { NavLink } from "react-router-dom"
import { useAuth } from "../../auth/hooks/useAuth";
import { useUsers } from "../../hooks/useUsers";

export const UserRow = ({ id, username, email, admin }) => {

    const { handlerRemoveUser, handlerUserSelectedForm } = useUsers();
    const { login } =  useAuth()

    return (
        <>
            <tr >
                <td className="px-2 py-0 aling-items-center">{id}</td>
                <td className="px-2 py-0">{username}</td>
                <td className="px-2 py-0">{email}</td>
                <td className="px-2 py-0">{admin ? 'true':'false'}</td>
                {!login.isAdmin ||
                    <>
                        <td  className="px-2 py-1">
                            <div className="d-flex justify-content-start">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm ms-1 p-0"
                                    onClick={() => handlerUserSelectedForm(
                                        {
                                            id: id,
                                            username, // Es lo msimo si coloco los :
                                            email: email,
                                            admin,
                                            // password,
                                        }
                                    )}>
                                    <i typeof="button" className="bi bi-pencil-square mx-1 fs-5"></i>
                                </button>

                                <NavLink
                                    type="button"
                                    className="btn btn-outline-primary btn-sm ms-1 p-0"
                                    to={'/users/edit/' + id}
                                >
                                    <i typeof="button" className="bi bi-pencil-square mx-1 fs-5">Page</i>
                                </NavLink>

                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm ms-1 p-0"
                                    onClick={() => handlerRemoveUser(id)}>
                                    <i typeof="button" className="bi bi-trash-fill mx-1 fs-5"></i>
                                </button>

                            </div>
                        </td>
                    </>
                }
            </tr>
        </>
    )
}