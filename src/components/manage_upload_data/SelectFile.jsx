import { useEffect, useState } from "react";
import { Btn } from "../layout/Btn"
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { SwalSelectedFile } from "../recursos/SweetAlerts";
import { BtnSubmit } from "../layout/BtnSubmit";
import { BtnLoading } from "../layout/BtnLoading";

export const SelectFile = ({ onShowTable, showTable }) => {
    const { handlerUploadData, isLoading } = useFuncionarios();
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (event) => {
        setSelectedFile(event.target?.files[0]);
    };

    const onDeleteFile = (event) => {
        document.getElementById("inputGroupFile03").value = "";
        setSelectedFile(null)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            const maxSize = 1 * 1048576
            if (selectedFile?.size > maxSize) { // tamaño en bytes
                SwalSelectedFile('Tamaño demasiado grande',
                    "El archivo debe tener un tamaño menor a 5MB",
                    'error'
                )
                return
            }

            console.log(event.type)
            console.log(selectedFile)

            if (selectedFile?.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                SwalSelectedFile('Formato Icorrecto',
                    "Por favor, selecciona un archivo Excel (.xlsx)",
                    'error'
                )
                return
            }
            console.log(selectedFile)
            handlerUploadData(selectedFile);
            setSelectedFile(null)
            document.getElementById("inputGroupFile03").value = "";
        } else {
            SwalSelectedFile('No ha Selecionando ningun Archivo',
                "Por favor, selecciona un archivo Excel (.xlsx)",
                'error'
            )
            return
        }
    };

    return (
        <>
            <div className="my-2 p-2 m-auto rounded rounded-2 shadow-xx d-flex justify-content-center">
                <div className="w-67">
                    <form className="" onSubmit={onSubmit} noValidate>
                        <div className="input-group">
                            <input
                                type="file"
                                className="form-control"
                                accept=".xlsx"
                                onChange={onFileChange}
                                id="inputGroupFile03"
                            />
                            {selectedFile &&
                                <Btn
                                    onClick={onDeleteFile}
                                    dataOnClick={null}
                                    icon={"bi bi-x-lg"}
                                    style={"btn btn-mybotton btn-color-gray m-0"}
                                    text={''}
                                    type={"button"}
                                />
                            }
                            {isLoading ?
                                <BtnLoading
                                    icon={"bi bi-upload"}
                                    style={"btn btn-mybotton btn-color-blue"}
                                    text={'Cargar Datos'}
                                />
                                :
                                <BtnSubmit
                                    icon={"bi bi-upload"}
                                    style={"btn btn-mybotton btn-color-blue"}
                                    text={'Cargar Datos'}
                                    type={"submit"}
                                />
                            }

                        </div>

                    </form>

                    <div className="text-red d-flex justify-content-end">
                        <span>Solo archivos Excel (.xlsx) de hasta 5 MB</span>
                    </div>

                </div>

                <div className="ms-3">
                    {!showTable &&
                        <Btn
                            onClick={onShowTable}
                            dataOnClick={''}
                            icon={showTable ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}
                            style={"btn btn-mybotton btn-color-blue"}
                            text={showTable ? "Ocultar Estructura Requerida" : "Mostrar Estructura Requerida"}
                            type={"button"}
                        />
                    }
                </div>

            </div>
        </>
    )
}