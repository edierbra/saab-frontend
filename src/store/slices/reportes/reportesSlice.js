import { createSlice } from "@reduxjs/toolkit";

export const initialReporte = {
    data: '',
    filename: ''
}

export const initialFormReporte = {
    idReporte: 0,
    idFuncionario: '',
    sindicatos: [],
    tiposNegociaciones: [],
    negociaciones: [],
    estados: [],
    campos: [],
    startDate: '',
    endDate: ''
}

export const reportes = [
    { id: 1, nombre: "AUXILIOS INDIVIDUALES" },
    { id: 2, nombre: "VALORES CONVENCIONALES" }
]

export const campos1 = [
    { id: 1, nombre: "TOTAL POR AUXILIO" },
    { id: 2, nombre: "TOTAL POR FUNCIONARIO" },
    { id: 3, nombre: "TOTAL POR SINDICATO" },
    { id: 4, nombre: "TOTAL POR TIPO NEGOCIACION" },
    { id: 5, nombre: "TOTAL POR NEGOCIACION" },
    { id: 6, nombre: "TOTAL POR ESTADO AUXILIO" }
]

export const campos2 = [
    { id: 1, nombre: "TOTAL POR AUXILIO" },
    { id: 2, nombre: "TOTAL POR SINDICATO" },
    { id: 3, nombre: "TOTAL POR TIPO NEGOCIACION" },
    { id: 4, nombre: "TOTAL POR NEGOCIACION" },
    { id: 5, nombre: "TOTAL POR ESTADO AUXILIO" }
]


export const reportesSlice = createSlice({

    name: 'reportes',
    initialState: {
        isLoading: false,
        reporte: initialReporte,
        errors: {},
    },

    reducers: {
        loadingError: (state, { payload }) => {
            state.errors = payload
        },
        loadingReporte: (state, { payload }) => {
            state.reporte = payload
            state.isLoading = false
        },
        setIsLoanding: (state, { payload }) => {
            state.isLoading = payload;
        },
    }
});



export const {
    loadingError,
    loadingReporte,
    setIsLoanding,
} = reportesSlice.actions;