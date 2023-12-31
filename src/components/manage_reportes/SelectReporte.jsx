import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { base64ToByteArray } from "../recursos/Funciones";
import { TableReporte } from "./TableReporte";
import { OptionsReporte } from "./OptionsReporte";
import { FormReporte } from "./FormReporte";
import { useReportes } from "../../hooks/useReportes";

export const SelectReporte = () => {

    const { reporte, initialReporte, initialFormReporte } = useReportes();
    const [formReporte, setFormReporte] = useState(initialFormReporte);
    const [dataReporte, setDataReporte] = useState(initialReporte);
    const { data, filename } = dataReporte;
    const [excelData, setExcelData] = useState([]);

    useEffect(() => {
        setDataReporte({ ...reporte })
    }, [reporte])

    useEffect(() => {
        handleShowExcel(data)
    }, [data])


    const handleShowExcel = () => {
        const bytes = base64ToByteArray(dataReporte.data)

        const workbook = XLSX.read(bytes, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        setExcelData(jsonData);
    };

    return (
        <>
            <FormReporte
                formReporte={formReporte}
                setFormReporte={setFormReporte}
                dataReporte={dataReporte}
            />

            {(excelData.length > 1) &&
                <TableReporte
                    excelData={excelData}
                />
            }

        </>
    )
}