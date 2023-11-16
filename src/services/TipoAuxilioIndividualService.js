import saabApi from "../apis/saabApi";

const BASE_URL = '/tiposauxiliosindividuales';

export const findAllTiposAuxiliosIndividuales = async () => { 
    try {
        const response = await saabApi.get(`${BASE_URL}`);
        return response;
    } catch (error) {
        throw error;
    }
}