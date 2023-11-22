import saabApi from "../apis/saabApi";

const BASE_URL = '/funcionarios';

export const findFuncionarioById = async (id = 0) => {
    try {
        const response = await saabApi.get(`${BASE_URL}/${id}`);
        return response;

    } catch (error) {
        throw error;
    }
}

export const findFuncionarioByIdAndNombre = async (search = "") => {
    const partes = String(search).split(",")
    var params = {}

    switch (partes.length) {
        case 1:
            var parte1 = partes[0].trim();
            if (!isNaN(parte1)) {
                params.id = parte1;
            } else {
                params.nombre = parte1;
            }
            break;

        case 2:
            var parte1 = partes[0].trim();
            var parte2 = partes[1].trim();
            if (!isNaN(parte1)) {
                params.id = parte1;
                params.nombre = parte2;
            } else {
                params.nombre = parte1;
            }
            break;

        default:
            params = {}
            break;
    }

    try {
        const response = await saabApi.get(`${BASE_URL}/idandnombre`
            , {
                params: {
                    ...params,
                }
            });
        return response;

    } catch (error) {
        throw error;
    }
}