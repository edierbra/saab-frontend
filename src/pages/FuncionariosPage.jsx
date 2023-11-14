import { useContext, useEffect } from "react";
import { UserModalForm } from "../components/manage_users/UserModalForm";
import { UsersList } from "../components/manage_users/UsersList"
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/layout/Paginator";

export const FuncionariosPage = () => {

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

                <h2 >Users App</h2>

                {(visibleForm || !login.isAdmin) ||
                    <button
                        className="btn btn-primary my-2"
                        onClick={handlerOpenForm}>
                        {'Add user'}
                    </button>
                }

                {users.length < 1 ?
                    <div className="alert alert-warning">{'No hay usuarios en el sistema'}</div> :
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