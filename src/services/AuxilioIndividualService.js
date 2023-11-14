import saabApi from "../apis/saabApi";

const BASE_URL = '/auxilios/individuales';

export const findAllUsersPageable = async (page = 0) => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/page/${page}`);
        console.log(response);
        return response;
        
    } catch (error) {
        throw error;
    }
}