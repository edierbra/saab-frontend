import { useState } from "react"
import { Btn } from "../layout/Btn"

export const TableExample = () => {
    return (
        <>
            <div className="overflow-auto" style={{ maxWidth: '100%', maxHeight: '70vh' }}>
                <table className=" table table-hover table-striped table-bordered" >
                    <thead>
                        <tr className="fs-16px-login-label ">
                            <th className="py-1">Identificacion</th>
                            <th className="py-1">Nombre</th>
                            <th className="py-1">fec. Ingreso</th>
                            <th className="py-1">Estado</th>
                            <th className="py-1">Fec. Retiro</th>
                            <th className="py-1">Genero</th>
                            <th className="py-1">Cargo</th>
                            <th className="py-1">Grado</th>
                            <th className="py-1">Denominacion del Cargo</th>
                            <th className="py-1">C. Costo</th>
                            <th className="py-1">Dependencia</th>
                            <th className="py-1">Localidad</th>
                            <th className="py-1">Vinculación</th>
                            <th className="py-1">Salario</th>
                            <th className="py-1">Correo</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="py-1">{"1034650786"}</td>
                            <td className="py-1">{"JUAN PEREZ"}</td>
                            <td className="py-1">{"1/1/2008"}</td>
                            <td className="py-1">{"N / V / R"}</td>
                            <td className="py-1">{"18/4/2023"}</td>
                            <td className="py-1">{"FEM / MAS"}</td>
                            <td className="py-1">{"3132"}</td>
                            <td className="py-1">{"9"}</td>
                            <td className="py-1">{"TECNICO OPERATIVO"}</td>
                            <td className="py-1">{"2911"}</td>
                            <td className="py-1">{"DIVISION ADMINISTRATIVA"}</td>
                            <td className="py-1">{"UNIDAD DE SALUD / UNIVERSIDAD DEL CAUCA"}</td>
                            <td className="py-1">{"ASISTENCIAL / EMPLEADO PUBLICO / TRABAJADOR OFICIAL"}</td>
                            <td className="py-1">{"2100304"}</td>
                            <td className="py-1">{"juanperez@ unicauca.edu.co"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}