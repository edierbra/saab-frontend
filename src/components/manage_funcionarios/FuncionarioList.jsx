import { useAuth } from "../../auth/hooks/useAuth";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { FuncionarioRow } from "./FuncionarioRow";

export const FuncionarioList = () => {
    const openSideBar = JSON.parse(sessionStorage.getItem('openSideBar'));
    const { funcionarios, funcionariosAndErrors, isWithErrors } = useFuncionarios();
    const funcionariosWithErrors = funcionariosAndErrors.map(item => item.funcionario);
    const { login } = useAuth();
    return (
        <>
            <div className="m-0 mb-2 overflow-auto rounded shadow-xx " style={{ width: '100%', maxHeight: '70vh' }}>

                <table className=" mb-0 p-0 m-0 table table-hover table-striped table-bordered">
                    <thead>
                        <tr className="fs-16px-login-label ">
                            <th className="py-1">Identificacion</th>
                            <th className="py-1">Nombre</th>
                            <th className="py-1">Vinculacion</th>
                            <th className="py-1">Fecha Ingreso</th>
                            <th className="py-1">Fecha Retiro</th>
                            <th className="py-1">Estado</th>
                            <th className="py-1">Salario</th>
                            <th className="py-1">Dependencia</th>
                            <th className="py-1">Localidad</th>
                            <th className={openSideBar ? 'd-none' : 'py-1 d-none d-lg-table-cell'}>Genero</th>
                            <th className={openSideBar ? 'd-none' : 'py-1 d-none d-lg-table-cell'}>Cargo</th>
                            <th className={openSideBar ? 'd-none' : 'py-1 d-none d-lg-table-cell'}>Correo</th>
                            {(login.isAdmin) && <th className="py-1">optiones</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (isWithErrors ? funcionariosWithErrors : funcionarios).map((funcionario, position) =>
                            (
                                <FuncionarioRow
                                    key={`${funcionario?.id + position*1.5}`}
                                    funcionario={funcionario}
                                    openSideBar={openSideBar}
                                    position={position}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}