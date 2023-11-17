import saabApi from "../apis/saabApi";

const BASE_URL = '/others';

export const findAllTiposAuxiliosIndividuales = async () => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/tiposauxiliosindividuales`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllSindicatos = async () => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/sindicatos`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllTiposAuxiliosIndividualesBySindicatoId = async (id=0) => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/tiposauxiliosindividualesbysindicato/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllProgramasByIdEstudioFormal = async (id=0) => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/programasbyestudioformal/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllSemestres = async () => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/semestres`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllMotivoJubilaciones = async () => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/motivojubilaciones`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllMotivoIncapacidades = async () => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/motivoincapacidades`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllParentescos = async () => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/parentescos`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllEstudioFormales = async () => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/estudiosformales`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllBeneficiariosEstudio = async () => { 
    try {
        const response = await saabApi.get(`${BASE_URL}/beneficiariosestudio`);
        return response;
    } catch (error) {
        throw error;
    }
}