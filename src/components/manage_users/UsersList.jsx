import { UserRow } from "./UserRow"
import { useAuth } from "../../auth/hooks/useAuth";
import { useUsers } from "../../hooks/useUsers";

export const UsersList = () => {

    const { users } = useUsers();
    const { login } = useAuth();

    return (
        <>
            <table className="table table-hover table-striped">
                <thead>
                    <tr className="fs-16px-login-label">
                        <th>id</th>
                        <th>username</th>
                        <th>email</th>
                        <th>admin</th>
                        {!login.isAdmin ||
                            <th>options</th>
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map(({ id, username, email, admin }) => (
                            <UserRow
                                key={id}
                                id={id}
                                username={username}
                                email={email}
                                admin={admin}
                            />
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}