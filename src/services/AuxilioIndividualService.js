import saabApi from "../apis/saabApi";
import saabApiReportesExcel from "../apis/saabApiReportesExcel";
import { generarStringConComas } from "../components/recursos/Funciones";

const BASE_URL = '/auxilios/individuales';

export const findAllAuxilioIndividualesPageable = async (page = 0) => {
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

export const findAuxiliosIndividualesByNombreOrIdOrTipoPageable = async (search = "", page = 0) => {
    const partes = search.split(",");
    var consult = {};

    switch (partes.length) {
        case 1:
            var parte1 = partes[0].trim();
            if (!isNaN(parte1)) {
                consult.id = parte1;
            } else {
                consult.nombre = parte1;
            }
            break;
        case 2:
            var parte1 = partes[0].trim();
            var parte2 = partes[1].trim();
            if (!isNaN(parte1)) {
                consult.id = parte1;
                consult.tipo = parte2;
            } else if (!isNaN(parte2)) {
                consult.nombre = parte1;
                consult.tipo = parte2;
            } else {
                consult.nombre = parte1;
                consult.tipo = parte2;
            }
            break;
        case 3:
            var parte1 = partes[0].trim();
            var parte2 = partes[1].trim();
            var parte3 = partes[2].trim();
            if (!isNaN(parte1)) {
                consult.id = parte1;
                consult.nombre = parte2;
                consult.tipo = parte3;
            } else {
                consult.nombre = parte2;
                consult.tipo = parte3;
            }
            break;
        default:
            break;
    }

    try {
        const response = await saabApi.get(`${BASE_URL}/nombreidtipo`
            , {
                params: {
                    ...consult,
                    pageNum: page,
                    pageSize: 5,
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

export const create = async (auxilioIndividual) => {
    try {
        return await saabApi.post(
            BASE_URL,
            {
                ...auxilioIndividual,
                idEstadoAuxilio: 1,
            },
        )
    } catch (error) {
        throw error;
    }
}

export const calcularValor = async (auxilioIndividual) => {
    try {
        return await saabApi.post(
            `${BASE_URL}/calcularValor`,
            {
                ...auxilioIndividual,
                idEstadoAuxilio: 1,
            },
        )
    } catch (error) {
        throw error;
    }
}

export const update = async (auxilioIndividual) => {
    try {
        return await saabApi.put(
            `${BASE_URL}/${auxilioIndividual?.id}`,
            {
                ...auxilioIndividual,
            },
            // config()
        );
    } catch (error) {
        throw error;
    }
}

export const updateEstado = async (auxilioIndividual) => {
    const { id, fechaViabilidad, resolucion, fechaResolucion, rdp, fechaRdp } = auxilioIndividual;
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

export const generarReporteAuxilioIndividual = async (formReporte) => {
    const { idReporte, idFuncionario, sindicatos, tiposNegociaciones, negociaciones, estados, 
        campos, startDate, endDate } = formReporte;
    console.log("Services: ........", formReporte)
    try {
        const response = await saabApiReportesExcel.get(
            `${BASE_URL}/exportarExcel`,
            {
                params: {
                    idFuncionario, // 1
                    sindicatos: generarStringConComas([...sindicatos]), // 2
                    tiposNegociaciones: generarStringConComas([...tiposNegociaciones]), // 3
                    negociaciones: generarStringConComas([...negociaciones]), // 4
                    estados: generarStringConComas([...estados]), // 5
                    campos: generarStringConComas([...campos]), // 6
                    startDate,
                    endDate 
                    // idFuncionario: '', // 1
                    // sindicatos: generarStringConComas([]), // 2
                    // tiposNegociaciones: generarStringConComas([]), // 3
                    // negociaciones: generarStringConComas([]), // 4
                    // estados: generarStringConComas([]), // 5
                    // campos: generarStringConComas([1]), // 6
                },
            }
        )
        return response;
    } catch (error) {
        throw error;
    }
}