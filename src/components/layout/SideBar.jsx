import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import logo from '../../assets/logo.png';
import { useUsers } from "../../hooks/useUsers";

const initialOpenSideBar = JSON.parse(sessionStorage.getItem('openSideBar'));

export const SideBar = ({ handlerHideSideBar }) => {

    const [openSideBar, setOpenSideBar] = useState(initialOpenSideBar)

    const { login, handlerLogout } = useAuth();

    const { users, getUsers } = useUsers();

    const onHideSideBar = () => {
        setOpenSideBar(!openSideBar); // Actualizar el estado   
        // console.log(login)
    }

    const findUser = () => {
        const user =  users.find(u => u?.username == login.user?.username)
        return user?.nombre;
    }

    useEffect(() => {
        sessionStorage.setItem('openSideBar', openSideBar); // Guardar en sessionStorage
        handlerHideSideBar(openSideBar)
    }, [openSideBar]);

    return (
        <>
            <div className="sidebar bg-body-tertiary  shadow-xx">

                <div className="container text-sidebar min-vh-100 d-flex justify-content-between flex-column pt-2">
                    <div className="">
                        <div className={openSideBar ? "p-2 d-flex align-items-center text-decoration-none justify-content-between shadow-xx bg-body-tertiary rounded px-2" : "py-1 d-flex align-items-center text-decoration-none justify-content-center shadow-lg bg-body-tertiary rounded"}>

                            <div className={openSideBar ? "m-0 d-none d-md-inline-flex align-items-center " : "m-0 d-none"}>
                                <img className="logo-size d-flex m-0 mb-0" src={logo} alt="Logo" />
                                <span className="mx-0 mx-2 fw-bold text-uppercase d-none d-md-inline fs-6 ">{login.user?.username}</span>
                            </div>

                            <div className="m-0 p-0 rounded-1 d-none d-md-inline d-flex justify-content-center button_open_close">
                                {openSideBar ?
                                    <i typeof="button" className="bi bi-chevron-double-left fs-3 m-0 "
                                        onClick={onHideSideBar}>
                                    </i>
                                    :
                                    <i typeof="button" className="bi bi-chevron-double-right fs-3 m-0 "
                                        onClick={onHideSideBar}>
                                    </i>
                                }
                            </div>

                        </div>

                        <hr className="m-1 text-secondary d-none d-md-block w-100 border border-1 rounded" />

                        <ul className="nav nav-pills flex-column">

                            <li className="nav-item rounded-3 mb-1">
                                <NavLink to='/auxilios-individuales' className="nav-link text-sidebar py-1 px-2 d-flex align-items-center justify-content-center justify-content-md-start" activeclassname="active">
                                    <i className="bi bi-collection-fill"></i>
                                    <span className={openSideBar ? "ms-2 d-none d-md-inline fs-7 p-0" : "d-none"}>Auxilios Individuales</span>
                                </NavLink>
                            </li>

                            {!login.isAdmin ||
                                <>
                                    <li className="nav-item rounded-3 mb-1">
                                        <NavLink to='/users' className="nav-link text-sidebar py-1 px-2 text-sidebar d-flex align-items-center justify-content-center justify-content-md-start" activeclassname="active">
                                            <i className="bi bi-person-circle"></i>
                                            <span className={openSideBar ? "ms-2 d-none d-md-inline fs-7 fs_custom p-0" : "d-none"}>Gestionar Usuarios</span>
                                        </NavLink>
                                    </li>
                                    {/* <li className="nav-item rounded-3 mb-1">
                                        <NavLink to='/register-user' className="nav-link text-sidebar py-1 px-2 d-flex align-items-center justify-content-center justify-content-md-start" activeclassname="active">
                                            <i className="bi bi-person-add"></i>
                                            <span className={openSideBar ? "ms-2 d-none d-md-inline fs-7 fs_custom p-0" : "d-none"}>Add customer</span>
                                        </NavLink>
                                    </li> */}

                                    <li className="nav-item rounded-3 mb-1">
                                        <NavLink to='/funcionarios' className="nav-link text-sidebar py-1 px-2 d-flex align-items-center justify-content-center justify-content-md-start" activeclassname="active">
                                            <i className="bi bi-people-fill"></i>
                                            <span className={openSideBar ? "ms-2 d-none d-md-inline fs-7 p-0" : "d-none"}>Gestionar Funcionarios</span>
                                        </NavLink>
                                    </li>
                                </>
                            }

                        </ul>
                    </div>

                    <div className="mb-2 d-flex justify-content-center align-items-center">
                        <button
                            className="btn btn-mybotton btn-color-blue flex-row-reverse p-2"
                            onClick={handlerLogout}
                        >

                            <span className={openSideBar ? "ms-2 d-none d-md-inline fs-7 p-0" : "d-none"}>Log out</span>
                            <i className="bi bi-box-arrow-right ms-2"></i>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
