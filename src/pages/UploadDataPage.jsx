import { useEffect, useState } from "react";
import { useAuth } from "../auth/hooks/useAuth";
import { SelectFile } from "../components/manage_upload_data/SelectFile";
import { FuncionarioList } from "../components/manage_funcionarios/FuncionarioList";
import { useFuncionarios } from "../hooks/useFuncionarios";
import { FuncionarioModalForm } from "../components/manage_funcionarios/FuncionarioModalForm";
import { Spinner } from "../components/layout/Spinner";
import { TableExampleModal } from "../components/manage_upload_data/TableExampleModal";

export const UploadDataPage = () => {
    const { visibleForm, funcionariosAndErrors, handlerChangeIsWithErrors, getAllFuncionarios,
        handlerIsLoanding } = useFuncionarios();
    const [showTable, setShowTable] = useState(false)

    const {
        login
    } = useAuth()

    useEffect(() => {
        getAllFuncionarios()
        handlerChangeIsWithErrors(true);
        handlerIsLoanding(false)
    }, [])

    const onShowTable = () => {
        setShowTable(!showTable)
    }

    return (
        <>
            {!visibleForm ||
                <FuncionarioModalForm />
            }

            {showTable &&
                <TableExampleModal
                    onShowTable={onShowTable}
                    showTable={showTable}
                />
            }

            <SelectFile
                onShowTable={onShowTable}
                showTable={showTable}
            />

            {funcionariosAndErrors?.length < 1 || !funcionariosAndErrors ?
                <div className="alert alert-warning">{'No hay funcionarios por verificar'}</div> :
                (
                    <>
                        <FuncionarioList />
                    </>
                )
            }
        </>
    )
}