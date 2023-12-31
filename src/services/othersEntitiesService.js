import saabApi from "../apis/saabApi";
import { generarStringConComas } from "../components/recursos/Funciones";

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

export const findAllTiposAuxiliosIndividualesBySindicatoId = async (id = 0) => {
    try {
        const response = await saabApi.get(`${BASE_URL}/tiposauxiliosindividualesbysindicato/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllProgramasByIdEstudioFormal = async (id = 0) => {
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

export const findAllGeneros = async () => {
    try {
        const response = await saabApi.get(`${BASE_URL}/generos`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllDependencias = async () => {
    try {
        const response = await saabApi.get(`${BASE_URL}/dependencias`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllVinculaciones = async () => {
    try {
        const response = await saabApi.get(`${BASE_URL}/vinculaciones`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllCargos = async () => {
    try {
        const response = await saabApi.get(`${BASE_URL}/cargos`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllGrados = async () => {
    try {
        const response = await saabApi.get(`${BASE_URL}/grados`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllLocalidades = async () => {
    try {
        const response = await saabApi.get(`${BASE_URL}/localidades`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllEstadosFuncionarios = async () => {
    try {
        const response = await saabApi.get(`${BASE_URL}/estadosfuncionarios`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllTiposNegociacionesSindicales = async () => {
    try {
        const response = await saabApi.get(`${BASE_URL}/tiposNegociacionesSindicales`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllEstadosAuxilios = async () => {
    try {
        const response = await saabApi.get(`${BASE_URL}/estadosauxilios`);
        console.log("Estados auxiliso service", response)
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllNegociacionesSindicales = async () => {
    try {
        const response = await saabApi.get(`${BASE_URL}/negociacionesSindicales`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllTiposNegociacionesSindicalesBySindicatoId = async (id = 0) => {
    try {
        const response = await saabApi.get(`${BASE_URL}/tiposNegociacionesSindicalesBySindicatoId/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllNegociacionesSindicalesByTipoNegociacionSindicalId = async (id = 0) => {
    try {
        const response = await saabApi.get(`${BASE_URL}/negociacionesSindicalesByTipoNegociacionSindicalId/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findDistinctNameConfigurationsByTipo = async (tipo='') => {
    try {
        const response = await saabApi.get(`${BASE_URL}/idNamesConfigPresupuestal`
            , {
                params: {
                    tipo,
                }
            }
        );
        
        return response;
    } catch (error) {
        throw error;
    }
}

export const findTiposNegociacionesBySindicatosIds = async (tipos) => {
    try {
        const response = await saabApi.get(`${BASE_URL}/tiposNegociacionesBySindicatosIds`
            , {
                params: {
                    sindicatosIds: generarStringConComas(tipos),
                }
            }
        );
        console.log("tiposNegociacionesBySindicatosIds", response)
        return response;
    } catch (error) {
        throw error;
    }
}

export const findNegociacionesByTiposNegociacionesIds = async (tipos) => {
    try {
        const response = await saabApi.get(`${BASE_URL}/negociacionesByTiposNegociacionesIds`
            , {
                params: {
                    tiposNegociacionesIds: generarStringConComas(tipos),
                }
            }
        );
        console.log("negociacionesByTiposNegociacionesIds", response)
        return response;
    } catch (error) {
        throw error;
    }
}