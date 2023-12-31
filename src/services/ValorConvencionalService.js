import saabApi from "../apis/saabApi";
import saabApiReportesExcel from "../apis/saabApiReportesExcel";
import { dateToString, generarStringConComas } from "../components/recursos/Funciones";

const BASE_URL = '/valores/convencionales';

export const findAllValoresConvencionalesPageable = async (page = 0) => {
    try {
        const response = await saabApi.get(`${BASE_URL}/page`
            , {
                params: {
                    pageNum: page,
                    pageSize: 8,
                    orderBy: 'id',
                    orderDir: 'desc'
                }
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export const findValoresConvencionalesByTipoNegociacionNombreOrNegociacionNombre = async (search = "", page = 0) => {
    const partes = search.split(",");
    var consult = {};

    switch (partes.length) {
        case 1:
            var parte1 = partes[0].trim();
            consult.tipoNegociacion = parte1;
            break;

        case 2:
            var parte1 = partes[0].trim();
            var parte2 = partes[1].trim();
            consult.tipoNegociacion = parte1;
            consult.negociacion = parte2;
            break;

        default:
            break;
    }

    try {
        const response = await saabApi.get(`${BASE_URL}/tiponegociacioNegociacion`
            , {
                params: {
                    ...consult,
                    pageNum: page,
                    pageSize: 6,
                    orderBy: 'id',
                    orderDir: 'desc'
                }
            }
        );
        consult = {}
        return response;
    } catch (error) {
        throw error;
    }
}

export const create = async (valorConvencional) => {
    try {
        return await saabApi.post(
            BASE_URL,
            {
                ...valorConvencional,
                idEstadoAuxilio: 1,
            },
        )
    } catch (error) {
        throw error;
    }
}

export const update = async (valorConvencional) => {
    try {
        return await saabApi.put(
            `${BASE_URL}/${valorConvencional?.id}`,
            {
                ...valorConvencional
            },
            // config()
        );
    } catch (error) {
        throw error;
    }
}

export const updateEstado = async (valorConvencional) => {
    const { id, fechaViabilidad, resolucion, fechaResolucion, rdp, fechaRdp } = valorConvencional;
    try {
        return await saabApi.put(
            `${BASE_URL}/estado/${id}`,
            {
                fechaViabilidad,
                resolucion,
                fechaResolucion,
                rdp,
                fechaRdp,
            },
        );
    } catch (error) {
        throw error;
    }
}

export const remove = async (id) => {
    try {
        await saabApi.delete(
            `${BASE_URL}/${id}`,
            // config()
        )
    } catch (error) {
        throw error;
    }
}

export const generarReporteValorConvencional = async (formReporte) => {
    const { idReporte, idFuncionario, sindicatos, tiposNegociaciones, negociaciones,
        estados, campos, startDate, endDate } = formReporte;
    console.log("Services: ........", formReporte)
    try {
        const response = await saabApiReportesExcel.get(
            `${BASE_URL}/exportarExcel`,
            {
                params: {
                    sindicatos: generarStringConComas([...sindicatos]), // 1
                    tiposNegociaciones: generarStringConComas([...tiposNegociaciones]), // 2
                    negociaciones: generarStringConComas([...negociaciones]), // 3
                    estados: generarStringConComas([...estados]), // 4
                    campos: generarStringConComas([...campos]), // 5
                    startDate,
                    endDate
                    // sindicatos: generarStringConComas([]), // 1
                    // tiposNegociaciones: generarStringConComas([]), // 2
                    // negociaciones: generarStringConComas([]), // 3
                    // estados: generarStringConComas([]), // 4
                    // campos: generarStringConComas([1]), // 5
                },
            }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const calcularValor = async (valuesCalculo) => {
    const { fechaSolicitud, fechaOpcionalCalculo, concepto, factor } = valuesCalculo;
    try {
        return await saabApi.post(
            `${BASE_URL}/calcularValor`,
            {
                fechaSolicitud,
                fechaOpcionalCalculo,
                concepto: concepto?.nombre,
                factor
            },
        );
    } catch (error) {
        throw error;
    }
}
