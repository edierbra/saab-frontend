import { createSlice } from "@reduxjs/toolkit";

const initialErrors = {

    id: '',
    nombre: '',
    fechaIngreso: '',
    fechaRetiro: '',
    idEstadoFuncionario: '',
    idGenero: '',
    idCargo: '',
    idGrado: '',
    idDependencia: '',
    idLocalidad: '',
    idVinculacion: '',
    salario: '',
    correo: '',
}

export const initialFuncionarioForm = {
    id: '',
    nombre: '',
    fechaIngreso: '',
    fechaRetiro: '',
    estadoFuncionario: { id: 0, nombre: '' },
    genero: { id: 0, nombre: '' },
    cargo: { id: 0, nombre: '' },
    grado: { id: 0, nombre: '' },
    dependencia: { id: 0, nombre: '' },
    localidad: { id: 0, nombre: '' },
    vinculacion: { id: 0, nombre: '' },
    salario: '',
    correo: '',
}

export const funcionariosSlices = createSlice({
    name: 'funcionarios',
    initialState: {
        funcionarios: [],
        errorsList: [],
        funcionariosAndErrors: [],
        allFuncionarios: [],
        paginator: {},
        funcionarioSelected: initialFuncionarioForm,
        funcionarioSearch: initialFuncionarioForm,
        visibleForm: false,
        errors: initialErrors,
        isLoading: true,
        isWithErrors: false,
        indice: -1,
    },

    reducers: {
        addFuncionario: (state, action) => {
            state.funcionarios = [
                {
                    ...action.payload,
                },
                ...state.funcionarios,
            ];

            state.allFuncionarios = [
                {
                    ...action.payload,
                },
                ...state.allFuncionarios,
            ];

            state.funcionarioSelected = initialFuncionarioForm;
            state.visibleForm = false;
        },
        updateFuncionario: (state, action) => {
            state.funcionarios = state.funcionarios.map(funcionario => {
                if (funcionario.id === action.payload.id) {
                    return {
                        ...action.payload,
                    }
                }
                return funcionario;
            });

            state.funcionarioSelected = initialFuncionarioForm;
            state.visibleForm = false;
        },
        removeFuncionario: (state, action) => {
            state.funcionarios = state.funcionarios.filter(funcionarios => funcionarios.id !== action.payload);
        },
        onFuncionarioSearch: (state, action) => {
            state.funcionarioSearch = action.payload;
        },
        loadingFuncionarios: (state, action) => {
            state.funcionarios = action.payload.totalElements > 0 ? action.payload.content : [];
            state.paginator = action.payload;
            state.isLoading = false;
        },
        loadingAllFuncionarios: (state, action) => {
            state.allFuncionarios = action.payload;
            state.isLoading = false;
        },
        loadingFuncionariosExcel: (state, action) => {
            state.funcionarios = action.payload;
            state.isLoading = false;
        },
        onFuncionarioSelectedForm: (state, action) => {
            state.funcionarioSelected = action.payload;
            state.visibleForm = true;
        },
        onSetIndice: (state, action) => {
            state.indice = action.payload;
        },
        onOpenForm: (state) => { // EL ACCTION SE OMITE SI NO SE USA
            state.visibleForm = true;
            console.log(state.visibleForm, "entro al slicesFuncionario")
        },
        onCloseForm: (state) => {
            state.visibleForm = false;
            state.funcionarioSelected = initialFuncionarioForm;
            state.funcionarioSearch = initialFuncionarioForm;
            console.log(state.visibleForm)
        },
        onClearFuncionarioSearch: (state) => {
            state.funcionarioSearch = initialFuncionarioForm;
        },
        loadingError: (state, { payload }) => {
            state.errors = payload
        },
        loadingErrorList: (state, { payload }) => {
            state.errorsList = payload
        },
        loadingFuncionariosAndErrors: (state, { payload }) => {
            state.funcionariosAndErrors = payload
            state.isLoading = false;
            state.isWithErrors = true
        },
        removeFuncionarioAndError: (state, { payload }) => {
            state.funcionariosAndErrors.splice(payload, 1)
        },
        onChangeIsWithErrors: (state, { payload }) => {
            state.isWithErrors = payload
        },
        setIsLoanding: (state, { payload }) => {
            state.isLoading = payload;
        }
    }
});

export const {
    onFuncionarioSearch,
    onClearFuncionarioSearch,
    removeFuncionario,
    removeFuncionarioAndError,
    loadingFuncionarios,
    loadingFuncionariosExcel,
    loadingAllFuncionarios,
    loadingFuncionariosAndErrors,
    onFuncionarioSelectedForm,
    onSetIndice,
    onOpenForm,
    onCloseForm,
    loadingError,
    loadingErrorList,
    addFuncionario,
    updateFuncionario,
    onChangeIsWithErrors,
    setIsLoanding,
} = funcionariosSlices.actions;