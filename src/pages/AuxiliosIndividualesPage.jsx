import { useEffect } from "react";
import { UserModalForm } from "../components/manage_users/UserModalForm";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/layout/Paginator";
import { useAuxiliosIndividuales } from "../hooks/useAuxiliosIndividuales";
import { AuxiliosIndividualesList } from "../components/manage_auxilios_individuales/AuxiliosIndividualesList";
import { AuxilioIndividualModalForm } from "../components/manage_auxilios_individuales/AuxilioIndividualModalForm";

export const AuxiliosIndividualesPage = () => {

    const { page } = useParams()

    const {
        users,
        visibleForm,
        isLoading,
        paginator,

        handlerOpenForm,
        getUsers,
    } = useAuxiliosIndividuales();

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
                <AuxilioIndividualModalForm/>
            }
            <div className="">

                <h2 >AUXILIOS INDIVIDUALES</h2>

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
                    <div className="alert alert-warning">{'No hay usuarios en el sistema'}</div> :
                    (
                        <>
                            <AuxiliosIndividualesList />
                            <Paginator
                                url="/auxilios-individuales/page"
                                paginator={paginator}
                            />
                        </>
                    )
                }
            </div>

        </>
    )
}