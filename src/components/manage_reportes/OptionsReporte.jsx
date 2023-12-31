import { useReportes } from "../../hooks/useReportes";
import { Btn } from "../layout/Btn";
import { BtnLoading } from "../layout/BtnLoading";
import { BtnSubmit } from "../layout/BtnSubmit";
import { Spinner } from "../layout/Spinner";
import { donwloadExcel } from "../recursos/Funciones";

export const OptionsReporte = ({ dataReporte }) => {
    const { isLoading } = useReportes();

    return (
        <>
            <div className="m-0 p-2 d-flex justify-content-center">
                {isLoading ?
                    <BtnLoading
                        icon={"bi bi-cloud-arrow-down-fill"}
                        style={"btn btn-mybotton btn-color-blue"}
                        text={'Generar Reporte'}
                    />
                    :
                    <BtnSubmit
                        icon={"bi bi-cloud-arrow-down-fill"}
                        style={"btn btn-mybotton btn-color-blue"}
                        text={'Generar Reporte'}
                        type={"submit"}
                    />

                }
                {dataReporte.data != '' &&
                    <Btn
                        onClick={donwloadExcel}
                        dataOnClick={dataReporte}
                        icon={"bi bi-download"}
                        style={"btn btn-mybotton btn-color-blue"}
                        text={'Descargar'}
                        type={"button"}
                    />
                }
            </div>

        </>
    )
}