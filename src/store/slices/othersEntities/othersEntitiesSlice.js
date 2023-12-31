import { createSlice } from "@reduxjs/toolkit";

export const initialOthersEntities = {
    id: 0,
    nombre: '',
}

export const othersEntitiesSlice = createSlice({
    name: 'othersEntities',
    initialState: {
        tiposAuxiliosIndividuales: [],
        motivosJubilaciones: [],
        motivosIncapacidades: [],
        estudiosFormales: [],
        parentescos: [],
        tiposAuxiliosIndividualesBySindicatoId: [],
        programasbyestudioformal: [],
        sindicatos: [],
        semestres: [],
        beneficiariosEstudio: [],
        generos: [],
        allEstadosAuxilios: [],
        cargos:[],
        grados:[],
        estadosFuncionarios:[],
        localidades: [],
        vinculaciones: [],
        dependencias: [],
        tiposNegociacionesSindicales: [],
        negociacionesSindicales: [],
        tiposNegociacionesSindicalesBySindicatoId:[],
        negociacionesSindicalesByTipoNegociacionSindicalId: [],
        distinctNameSalariosConfig: [],
        tiposNegociacionesBySindicatosIds: [],
        negociacionesByTiposNegociacionesIds: [],
    },

    reducers: {
        loadingTiposNegociacionesBySindicatosIds: (state, action) => {
            state.tiposNegociacionesBySindicatosIds = action.payload;
        },
        loadingAllEstadosAuxilios: (state, action) => {
            state.allEstadosAuxilios = action.payload;
        },
        loadingNegociacionesByTiposNegociacionesIds: (state, action) => {
            state.negociacionesByTiposNegociacionesIds = action.payload;
        },
        loadingTiposAuxiliosIndividuales: (state, action) => {
            state.tiposAuxiliosIndividuales = action.payload;
        },
        loadingTiposAuxiliosIndividualesBySindicatoId: (state, action) => {
            state.tiposAuxiliosIndividualesBySindicatoId = action.payload;
        },
        loadingProgramasByEstudioFormal: (state, action) => {
            state.programasbyestudioformal = action.payload;
        },
        loadingMotivosJubilaciones: (state, action) => {
            state.motivosJubilaciones = action.payload;
        },
        loadingMotivosIncapacidades: (state, action) => {
            state.motivosIncapacidades = action.payload;
        },
        loadingSindicatos: (state, action) => {
            state.sindicatos = action.payload;
        },
        loadingSemestres: (state, action) => {
            state.semestres = action.payload;
        },
        loadingParentescos: (state, action) => {
            state.parentescos = action.payload;
        },
        loadingEstudiosFormales: (state, action) => {
            state.estudiosFormales = action.payload;
        },
        loadingBeneficiariosEstudio: (state, action) => {
            state.beneficiariosEstudio = action.payload;
        },
        loadingGeneros: (state, action) => {
            state.generos = action.payload;
        },
        loadingVinculaciones: (state, action) => {
            state.vinculaciones = action.payload;
        },
        loadingGrados: (state, action) => {
            state.grados = action.payload;
        },
        loadingCargos: (state, action) => {
            state.cargos = action.payload;
        },
        loadingEstadosFuncionarios: (state, action) => {
            state.estadosFuncionarios = action.payload;
        },
        loadingLocalidades: (state, action) => {
            state.localidades = action.payload;
        },
        loadingDependencias: (state, action) => {
            state.dependencias = action.payload;
        },
        loadingTiposNegociacionesSindicales: (state, action) => {
            state.tiposNegociacionesSindicales = action.payload;
        },
        loadingNegociacionesSindicales: (state, action) => {
            state.negociacionesSindicales = action.payload;
        },
        loadingTiposNegociacionesSindicalesBySindicatoId: (state, action) => {
            state.tiposNegociacionesSindicalesBySindicatoId = action.payload;
        },
        loadingNegociacionesSindicalesByTipoNegociacionSindicalId: (state, action) => {
            state.negociacionesSindicalesByTipoNegociacionSindicalId = action.payload;
        },
        loadingDistinctNameSalariosConfig: (state, action) => {
            state.distinctNameSalariosConfig = action.payload;
        },
    }
});

export const {
    loadingTiposAuxiliosIndividuales,
    loadingTiposAuxiliosIndividualesBySindicatoId,
    loadingMotivosIncapacidades,
    loadingMotivosJubilaciones,
    loadingSindicatos,
    loadingSemestres,
    loadingParentescos,
    loadingEstudiosFormales,
    loadingProgramasByEstudioFormal,
    loadingBeneficiariosEstudio,
    loadingDependencias,
    loadingCargos,
    loadingGrados,
    loadingEstadosFuncionarios,
    loadingLocalidades,
    loadingGeneros,
    loadingVinculaciones,
    loadingTiposNegociacionesSindicales,
    loadingNegociacionesSindicales,
    loadingTiposNegociacionesSindicalesBySindicatoId,
    loadingNegociacionesSindicalesByTipoNegociacionSindicalId,
    loadingDistinctNameSalariosConfig,
    loadingNegociacionesByTiposNegociacionesIds,
    loadingTiposNegociacionesBySindicatosIds,
    loadingAllEstadosAuxilios,
} = othersEntitiesSlice.actions;