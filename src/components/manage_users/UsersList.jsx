import { UserRow } from "./UserRow";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUsers } from "../../hooks/useUsers";

export const UsersList = () => {
    const { users } = useUsers();
    const { login } = useAuth();

    return (
        <>
            <table className="table table-hover table-striped table-bordered rounded shadow-xx">
                <thead>
                    <tr className="fs-16px-login-label">
                        <th>id</th>
                        <th>Nombre</th>
                        <th>username</th>
                        <th>email</th>
                        <th>admin</th>
                        <th>root</th>
                        {(login.isAdmin) && <th>optiones</th>}
                    </tr>
                </thead>
                <tbody >
                    {
                        users.map(({ id, nombre, username, email, admin, root }) => (
                            <UserRow
                                key={id}
                                id={id}
                                nombre={nombre}
                                username={username}
                                email={email}
                                admin={admin}
                                root={root}
                            />
                        ))
                    }
                </tbody>
            </table>
        </>
    );
};
