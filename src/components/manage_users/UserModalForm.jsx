import { useUsers } from "../../hooks/useUsers";
import { UserForm } from "./UserForm"

export const UserModalForm = () => {

    const { userSelected, handlerCloseForm } = useUsers();

    return (
        <>
            <div className="abrir-modal animation fadeIn">
                <div className="modal" style={{ display: 'block' }} tabIndex={'-1'}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border rounded shadow-lg m-2">
                                <div className="modal-title">
                                    <h5 className="modal-title">
                                        {userSelected.id == '' ? 'Agregar Usuario' : 'Editar Usuario'}
                                    </h5>
                                </div>
                            </div>
                            <div className="modal-body mt-0 pt-0">
                                <UserForm
                                    userSelected={userSelected}
                                    handlerCloseForm={handlerCloseForm}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}