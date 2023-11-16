import { createSlice } from "@reduxjs/toolkit";

export const initialTipoAuxilioIndividual = {
    id: 0,
    nombre: '',
}

export const tiposAuxiliosIndividualesSlice = createSlice({
    name: 'tiposAuxiliosIndividuales',
    initialState: {
        tiposAuxiliosIndividuales: [],
    },

    reducers: {
        loadingTiposAuxiliosIndividuales: (state, action) => {
            state.tiposAuxiliosIndividuales = action.payload; // action.payload
        },
    }
});

export const {
    loadingTiposAuxiliosIndividuales,
} = tiposAuxiliosIndividualesSlice.actions;