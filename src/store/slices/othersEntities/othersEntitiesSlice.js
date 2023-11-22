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
        beneficiariosEstudio: []
    },

    reducers: {
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
    loadingBeneficiariosEstudio
} = othersEntitiesSlice.actions;