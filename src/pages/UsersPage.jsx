import { useContext, useEffect } from "react";
import { UserModalForm } from "../components/manage_users/UserModalForm";
import { UsersList } from "../components/manage_users/UsersList"
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/layout/Paginator";

export const UsersPage = () => {

    const { page } = useParams()

    const {
        users,
        visibleForm,
        isLoading,
        paginator,

        handlerOpenForm,
        getUsers,
    } = useUsers();

    const {
        login
    } = useAuth()

    useEffect(() => {
        getUsers(page);
    }, [, page])

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true"></span>
                    <span role="status">Cargando...</span>
                </button>
            </div>
        )
    }

    return (
        <>
            {!visibleForm ||
                <UserModalForm />
            }
            <div className="">

                <h2 >USUARIOS</h2>

                {(visibleForm || !login.isAdmin) ||
                    <button
                        className="btn btn-login my-2 py-1"
                        onClick={handlerOpenForm}>
                        <i className="bi bi-plus-circle-fill"
                            typeof="button">
                            <label className="ms-1">Agregar</label>
                        </i>
                    </button>
                }

                {users.length < 1 ?
                    <div className="alert alert-warning">{'No hay Datos registrados en el sistema'}</div> :
                    (
                        <>
                            <UsersList />
                            <Paginator
                                url="/users/page"
                                paginator={paginator}
                            />
                        </>
                    )
                }
            </div>

        </>
    )
}