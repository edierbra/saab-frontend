import saabApi from "../apis/saabApi";

const BASE_URL = '/funcionarios';

export const findFuncionarioById = async (id = 0) => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/${id}`);
        console.log(response)
        return response;
        
    } catch (error) {
        throw error;
    }
}