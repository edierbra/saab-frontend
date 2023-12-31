import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"

import { useAuth } from "../auth/hooks/useAuth"
import {
    SwalErrorAuthentication, SwalToastDelete, SwalToastErrorsFound, SwalToastNotFound
} from "../components/recursos/SweetAlerts"
import { convertBlobToBase64, dateToString } from "../components/recursos/Funciones"
import {
    loadingError, loadingReporte, setIsLoanding, initialReporte, initialFormReporte,
    reportes, campos1, campos2
} from "../store/slices/reportes/reportesSlice"
import { generarReporteValorConvencional } from "../services/ValorConvencionalService"
import { generarReporteAuxilioIndividual } from "../services/AuxilioIndividualService"

export const useReportes = () => {
    const { isLoading, reporte, errors } = useSelector(state => state.reportes);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const handlerGenerarReporte = async (formReporte) => {
        console.log("Entro a useReporte")
        try {
            if (!login.isAdmin) return;
            let filename = `Reporte_${dateToString(new Date)}.xlsx`;
            let response;

            dispatch(setIsLoanding(true));
            if (formReporte.idReporte == 1) {
                response = await generarReporteAuxilioIndividual(formReporte)
                filename = `AuxiliosIndividuales_${dateToString(new Date)}.xlsx`;
            } else if (formReporte.idReporte == 2) {
                response = await generarReporteValorConvencional(formReporte)
                filename = `ValoresConvencionales_${dateToString(new Date)}.xlsx`;
            } else {
                SwalToastNotFound("error", "Selecione un tipo de Reporte")
            }

            convertBlobToBase64(response.data)
                .then(base64String => {
                    dispatch(loadingReporte({ data: base64String, filename }))
                })
                .catch(error => {
                    console.log(error)
                });

            SwalToastDelete("success", "Reporte Generado")
            dispatch(loadingError({}))
        } catch (error) {
            dispatch(setIsLoanding(false));
            if (error.response && error.response?.status == 400) {
                handleBlobResponse(error.response.data)
                    .then(parsedData => {
                        // Manejar 'parsedData' una vez que se resuelva la promesa
                        console.log(parsedData);
                        dispatch(loadingError(parsedData));
                        SwalToastErrorsFound("error", "Verifica los datos ingresado00s");
                    })
                    .catch(error => {
                        // Manejar cualquier error que ocurra durante el procesamiento
                        console.error(error);
                    });
            } else if (error.response && error.response?.status == 401) {
                SwalErrorAuthentication(handlerLogout)
            } else if (error.response && error.response?.status == 404) {
                handleBlobResponse(error.response.data)
                    .then(parsedData => {
                        // Manejar 'parsedData' una vez que se resuelva la promesa
                        console.log(parsedData);
                        SwalToastNotFound("error", parsedData.error)
                        dispatch(loadingError({}));
                        dispatch(loadingReporte(initialReporte))
                    })
                    .catch(error => {
                        // Manejar cualquier error que ocurra durante el procesamiento
                        console.error(error);
                    });
            } else {
                throw error
            }
        }

    }

    const addError = (error) => {
        dispatch(loadingError({
            // ...errors,
            ...error
        }))
        SwalToastErrorsFound("error", "Verifica los datos ingresados");
    }


    const handlerIsLoanding = (value) => {
        dispatch(setIsLoanding(value));
    }

    function handleBlobResponse(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function () {
                const content = reader.result;

                // Parsea el contenido del Blob a un objeto Map si es JSON
                try {
                    const parsedData = JSON.parse(content);
                    if (parsedData instanceof Object) {
                        resolve(parsedData);
                        // Usa parsedData como desees, podría ser tu Map
                    } else {
                        console.log('El contenido no es un objeto o un mapa:', content);
                        // Manipula content como texto si no es un objeto JSON
                        reject('El contenido no es un objeto o un mapa');
                    }
                } catch (error) {
                    console.log('Error al parsear JSON. Contenido como texto:', content);
                    // Maneja el contenido como texto si no es JSON
                    reject('Error al parsear JSON');
                }
            };

            reader.readAsText(blob);
        });
    }



    return {
        errors,
        isLoading,
        reporte,
        initialReporte,
        initialFormReporte,
        reportes,
        campos1,
        campos2,

        handlerIsLoanding,
        handlerGenerarReporte,
        addError,
    }
}