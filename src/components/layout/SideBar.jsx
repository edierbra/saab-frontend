import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

const initialOpenSideBar = JSON.parse(sessionStorage.getItem('openSideBar'));

export const SideBar = ({ handlerHideSideBar }) => {

    const [openSideBar, setOpenSideBar] = useState(initialOpenSideBar)

    const { login, handlerLogout } = useAuth();

    const onHideSideBar = () => {
        setOpenSideBar(!openSideBar); // Actualizar el estado   
        // console.log(login)
    }

    useEffect(() => {
        sessionStorage.setItem('openSideBar', openSideBar); // Guardar en sessionStorage
        handlerHideSideBar(openSideBar)
    }, [openSideBar]);

    return (
        <>
            <div className="sidebar">

                <div className="container bg-primary min-vh-100 d-flex justify-content-between flex-column pt-2">
                    <div className=" p-0">
                        <div className={openSideBar ? "py-1 d-flex align-items-center text-white text-decoration-none justify-content-between" : "py-1 d-flex align-items-center text-white text-decoration-none justify-content-center"}>

                            <div className={openSideBar ? "m-0 d-none d-md-inline-flex align-items-center " : "m-0 d-none"}>
                                <i className="fs-1 bi bi-speedometer fs-1"></i>
                                <span className="mx-0 mx-2 fw-bold text-white d-none d-md-inline fs-6 fs_custom">{login.user?.username}</span>
                            </div>

                            <div className="m-0 rounded-1 d-none d-md-inline d-flex justify-content-center button_open_close">

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

                        <ul className="nav nav-pills flex-column ">

                            <li className="nav-item text-white rounded-3 mb-1">
                                <NavLink to='/auxilios-individuales' className="nav-link text-white py-1 px-2 d-flex align-items-center justify-content-center justify-content-md-start" activeclassname="active">
                                    <i className="bi bi-collection-fill text-white fs-4 "></i>
                                    <span className={openSideBar ? "ms-2 d-none d-md-inline text-white fs-7  fs_custom nav-link p-0" : "d-none"}>Auxilios Individuales</span>
                                </NavLink>
                            </li>

                            {!login.isAdmin ||
                                <>
                                    <li className="nav-item text-white rounded-3 mb-1">
                                        <NavLink to='/users' className="nav-link text-white py-1 px-2 d-flex align-items-center justify-content-center justify-content-md-start" activeclassname="active">
                                            <i className="bi bi-people-fill text-white fs-4 "></i>
                                            <span className={openSideBar ? "ms-2 d-none d-md-inline text-white fs-7  fs_custom nav-link p-0" : "d-none"}>Gestionar Usuarios</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item text-white rounded-3 mb-1">
                                        <NavLink to='/register-user' className="nav-link text-white py-1 px-2 d-flex align-items-center justify-content-center justify-content-md-start" activeclassname="active">
                                            <i className="bi bi-person-add text-white fs-4 "></i>
                                            <span className={openSideBar ? "ms-2 d-none d-md-inline text-white fs-7  fs_custom nav-link p-0" : "d-none"}>Add customer</span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item text-white rounded-3 mb-1">
                                        <NavLink to='/funcionarios' className="nav-link text-white py-1 px-2 d-flex align-items-center justify-content-center justify-content-md-start" activeclassname="active">
                                            <i className="bi bi-people-fill text-white fs-4 "></i>
                                            <span className={openSideBar ? "ms-2 d-none d-md-inline text-white fs-7  fs_custom nav-link p-0" : "d-none"}>Gestionar Funcionarios</span>
                                        </NavLink>
                                    </li>
                                </>
                            }

                        </ul>
                    </div>

                    <div className="mb-2 d-flex justify-content-center align-items-center">
                        <button
                            className="btn btn-secondary btn_logout flex-row-reverse"
                            aria-expanded="false"
                            onClick={handlerLogout}
                        >

                            <span className={openSideBar ? " d-none d-md-inline fs_custom" : "d-none"}>Log out</span>
                            <i className="bi bi-box-arrow-right  ms-2"></i>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
