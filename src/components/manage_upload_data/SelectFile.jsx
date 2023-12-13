import { useEffect, useState } from "react";
import { Btn } from "../layout/Btn"
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { SwalSelectedFile } from "../recursos/SweetAlerts";

export const SelectFile = () => {
    const { handlerUploadData } = useFuncionarios();
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (event) => {
        setSelectedFile(event.target?.files[0]);
    };

    const onDeleteFile = (event) => {
        document.getElementById("inputGroupFile03").value = "";
        setSelectedFile(null)
    }

    const onSubmit = (event) => {
        if (selectedFile) {
            const maxSize = 1*1048576
            if (event?.size > maxSize) { // tamaño en bytes
                SwalSelectedFile('Tamaño demasiado grande',
                    "El archivo debe tener un tamaño menor a 5MB",
                    'error'
                )
                return
            }

            if (event?.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
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
        }
    };

    return (
        <>
            <div className="my-2 p-2 m-auto rounded rounded-2 shadow w-50">
                <form action="">
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
                                icon={"bi bi-x"}
                                style={"btn btn-mybotton btn-color-gray m-0"}
                                text={''}
                            />
                        }
                        <Btn
                            onClick={onSubmit}
                            dataOnClick={selectedFile}
                            icon={"bi bi-upload"}
                            style={"btn btn-mybotton btn-color-blue"}
                            text={'Cargar Datos'}
                        />
                    </div>
                </form>

                <div className="text-red d-flex justify-content-end">
                    <span>Solo archivos Excel (.xlsx) de hasta 5 MB</span>
                </div>

            </div>

        </>
    )
}