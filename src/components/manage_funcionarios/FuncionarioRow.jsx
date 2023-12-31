import { NavLink } from "react-router-dom"
import { useAuth } from "../../auth/hooks/useAuth";
import { useUsers } from "../../hooks/useUsers";
import { useAuxiliosIndividuales } from "../../hooks/useAuxiliosIndividuales";
import { Btn } from "../layout/Btn";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { useState } from "react";

export const FuncionarioRow = ({ funcionario, openSideBar, position }) => {

    const { handlerRemoveFuncionario, handlerFuncionarioSelectedForm, isWithErrors, handlerDeleteFuncionarioAndError } = useFuncionarios();
    const { login } = useAuth()

    const showIcon = (value, icon1, icon2) => {
        return value = value == 'false' ? <i className={`${icon1} py-0 text-red `}></i> : <i className={`${icon2} py-0 text-green`}></i>
    }

    return (
        <>
            <tr className="p-0">
                <td className="py-0">{funcionario?.id}</td>
                <td className="py-0">{funcionario?.nombre}</td>
                <td className="py-0">{funcionario.vinculacion?.nombre}</td>
                <td className="py-0">{funcionario?.fechaIngreso}</td>
                <td className="py-0">{funcionario?.fechaRetiro}</td>
                <td className="py-0">{funcionario.estadoFuncionario?.nombre}</td>
                <td className="py-0">{funcionario?.salario}</td>
                <td className="py-0">{funcionario.dependencia?.nombre}</td>
                <td className="py-0">{funcionario.localidad?.nombre}</td>
                <td className={openSideBar ? 'd-none' : 'py-0 d-none d-lg-table-cell'}>{funcionario.genero?.nombre}</td>
                <td className={openSideBar ? 'd-none' : 'py-0 d-none d-lg-table-cell'}>{`${funcionario.cargo?.id} - ${funcionario.cargo?.nombre} Grado ${funcionario.grado?.nombre}`}</td>
                <td className={openSideBar ? 'd-none' : 'py-0 d-none d-lg-table-cell'}>{funcionario?.correo? funcionario?.correo.split('@')[0]:''}</td>
                {/* <td className="py-0">{showIcon(funcionario?.activo, 'bi bi-x-circle-fill', 'bi bi-check-circle-fill')}</td> */}

                <td className="py-1">
                    <div className="d-flex justify-content-start">
                        {!login.isAdmin ||
                            isWithErrors ?
                            <>
                                <Btn
                                    onClick={handlerFuncionarioSelectedForm}
                                    dataOnClick={{ funcionario, position }}
                                    icon={"bi bi-pencil-square"}
                                    style={"btn btn-mybotton btn-color-blue"}
                                    text={''}
                                    type={"button"}
                                />

                                <Btn
                                    onClick={handlerDeleteFuncionarioAndError}
                                    dataOnClick={position}
                                    icon={"bi bi-x-lg"}
                                    style={"btn btn-mybotton btn-color-red"}
                                    text={''}
                                    type={"button"}
                                />
                            </>
                            :
                            <>
                                <Btn
                                    onClick={handlerFuncionarioSelectedForm}
                                    dataOnClick={{ funcionario }}
                                    icon={"bi bi-pencil-square"}
                                    style={"btn btn-mybotton btn-color-blue"}
                                    text={''}
                                    type={"button"}
                                />

                                <Btn
                                    onClick={handlerRemoveFuncionario}
                                    dataOnClick={funcionario?.id}
                                    icon={"bi bi-trash-fill"}
                                    style={"btn btn-mybotton btn-color-red"}
                                    text={''}
                                    type={"button"}
                                />

                                {/* <Btn
                                    onClick={handlerRemoveFuncionario}
                                    dataOnClick={funcionario?.id}
                                    icon={funcionario?.activo == "true" ? "bi bi-toggle-on": "bi bi-toggle-off"}
                                    style={funcionario?.activo == "true"? "btn btn-mybotton btn-color-green": ' btn btn-mybotton btn-color-gray'}
                                    text={''}
                                    type={"button"}
                                /> */}
                            </>
                        }

                    </div>
                </td>
            </tr>

            {/* <tr key={`progress-${auxilio.id}`}>
                <td colSpan="8" className="pading-0">
                    <div className="progress" role="progressbar">
                        <div className={`progress-bar ${setEstado()}`}></div>
                    </div>
                </td>
            </tr> */}
        </>
    )
}