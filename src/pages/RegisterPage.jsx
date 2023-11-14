import { useEffect, useState } from "react"
import { UserForm } from "../components/manage_users/UserForm"
import { useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

export const RegisterPage = () => {

    const { users = [], initialUserForm } = useUsers();

    const [userSelected, setUserSelected] = useState(initialUserForm);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const user = users.find(user => user.id == id) || initialUserForm;
            setUserSelected(user);
        }
    }, [id])

    return (
        <>
            <div className="container my-4 w-50">
                <div className="row m-0 p-0">
                    <div className="col m-0 p-0">
                        <h4>{userSelected.id > 0 ? 'Edit user' : 'Add user'}</h4>

                        <UserForm
                            userSelected={userSelected}
                        />

                    </div>
                </div>
            </div>
        </>
    )
}