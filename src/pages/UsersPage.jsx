import { useContext, useEffect, useState } from "react";
import { UserModalForm } from "../components/manage_users/UserModalForm";
import { UsersList } from "../components/manage_users/UsersList"
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/layout/Paginator";
import { Header } from "../components/layout/Header";
import { Spinner } from "../components/layout/Spinner";

export const UsersPage = () => {

    const { page } = useParams()

    const {
        users,
        visibleForm,
        isLoading,
        paginator,

        handlerOpenForm,
        getUsers,
        getUserByIdAndNombre,
    } = useUsers();

    const {
        login
    } = useAuth()

    const [search, setSearch] = useState('')

    useEffect(() => {
        getUserByIdAndNombre(search, page);
    }, [, page])

    useEffect(() => {
        getUserByIdAndNombre(search, 0);
    }, [search])

    if (isLoading) {
        return (
            <Spinner/>
        )
    }

    return (
        <>
            {!visibleForm ||
                <UserModalForm />
            }
            <div className="">

                <Header
                    visibleForm={visibleForm}
                    handlerOpenForm={handlerOpenForm}
                    placeholder={"Buscar por Identificacion o Nombre"}
                    valueDefault={""}
                    functionSearch={getUserByIdAndNombre}
                    setSearch={setSearch}
                />

                {users?.length < 1 ?
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