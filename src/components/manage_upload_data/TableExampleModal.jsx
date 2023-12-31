import { Btn } from "../layout/Btn"
import { TableExample } from "./TableExample"

export const TableExampleModal = ({ onShowTable, showTable }) => {
    return (
        <>
            <div className="abrir-modal animation fadeIn">
                <div className="modal" style={{ display: 'block' }} tabIndex={'-1'}>
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header border rounded shadow-lg m-2">
                                <div className="modal-title">
                                    <h5 className="modal-title ">
                                        {"ESTRUCTURA REQUERIDA DEL ARCHIVO EXCEL"}
                                    </h5>
                                </div>
                            </div>
                            <div className="modal-body mt-2 pt-0 px-2">
                                <TableExample />
                            </div>
                            <div className="modal-footer mt-0 pt-0 d-flex justify-content-start">
                                <Btn
                                    onClick={onShowTable}
                                    dataOnClick={''}
                                    icon={"bi bi-x-lg"}
                                    style={"btn btn-mybotton btn-color-red"}
                                    text={"Cerrar"}
                                    type={"button"}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}