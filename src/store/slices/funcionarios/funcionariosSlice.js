import { createSlice } from "@reduxjs/toolkit";

const initialErrors = {
    username: '',
    password: '',
    email: '',
}

export const initialFuncionarioForm = {
    id: 0,
    activo: '',
    cargo: '',
    correo: '',
    dependencia: { id: 0, nombre: ''},
    fechaVinculacion: '',
    genero: {id: 0, nombre: ''},
    nombre: '',
    salario: 0,
    vinculacion: {id: 0, nombre: ''},
}

export const funcionariosSlices = createSlice({
    name: 'funcionarios',
    initialState: {
        funcionarios: [],
        paginator: {},
        funcionarioSelected: initialFuncionarioForm,
        funcionarioSearch: initialFuncionarioForm,
        visibleForm: false,
        errors: initialErrors,
        isLoading: true,
    },

    reducers: {
        onFuncionarioSearch: (state, action) => {
            console.log(action.payload)
            state.funcionarioSearch = action.payload;
        },
        loadingUsers: (state, action) => {
            state.funcionarios = action.payload.content;
            state.paginator = action.payload;
            state.isLoading = false;
        },
        onUserSelectedForm: (state, action) => {
            state.funcionarioSelected = action.payload;
            state.visibleForm = true;
        },
        onOpenForm: (state) => { // EL ACCTION SE OMITE SI NO SE USA
            state.visibleForm = true;
        },
        onCloseForm: (state) => {
            state.visibleForm = false;
            state.funcionarioSelected = initialFuncionarioForm;
            state.funcionarioSearch = initialFuncionarioForm;
        },
        onClearFuncionarioSearch: (state) => {
            state.funcionarioSearch = initialFuncionarioForm;
        },
        loadingError: (state, { payload }) => {
            state.errors = payload
        }
    }
});

export const {
    onFuncionarioSearch,
    onClearFuncionarioSearch,
    loadingUsers,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
} = funcionariosSlices.actions;