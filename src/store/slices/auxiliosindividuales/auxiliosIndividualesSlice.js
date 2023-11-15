import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
    id: 0,
    fechaSolicitud: "",
    fechaViabilidad: "",
    resolucion: "",
    fechaResolucion: "",
    rdp: "",
    fechaRdp: "",
    valor: 0,
    valorTransporteRegreso: 0,
    diasDesplazamiento: 0,
    lugarDesplazamiento: "",
    fechaRenuncia: "",
    fechaAceptacionRenuncia: "",
    fechaInicioIncapacidad: "",
    fechaFinIncapacidad: "",
    valorMatricula: 0,
    promedio: 0,
    fechaReciboMatricula: "",
    referenciaReciboMatricula: "",
    observacion: "",
    funcionario: {},
    motivoJubilacion: {},
    motivoIncapacidad: {},
    semestre: {},
    estadoAuxilio: {},
    parentesco: {},
    estudioFormal: {},
    programa: {},
    sindicato: {},
    tipoAuxilioIndividual: {}
}

const initialErrors = {
    username: '',
    password: '',
    email: '',
}

export const initialFuncionarioSearch = {
    activo: '',
    cargo: '',
    correo: '',
    dependencia: { id: '', nombre: ''},
    fechaVinculacion: '',
    genero: {id: '', nombre: ''},
    id: '',
    nombre: '',
    salario: '',
    vinculacion: {id: '', nombre: ''},
}

export const auxiliosIndividualesSlices = createSlice({
    name: 'auxiliosindividuales',
    initialState: {
        users: [],
        paginator: {},
        userSelected: initialUserForm,
        funcionarioSearch: initialFuncionarioSearch,
        visibleForm: false,
        errors: initialErrors,
        isLoading: true,
    },

    reducers: {
        onFuncionarioSearch: (state, action) => {
            console.log(action.payload)
            state.funcionarioSearch = action.payload;
        },
        addUser: (state, action) => {
            state.users = [
                ...state.users,
                {
                    ...action.payload,
                }
            ];

            state.userSelected = initialUserForm;
            state.visibleForm = false;
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
            state.users = state.users.map(user => {
                if (user.id === action.payload.id) {
                    return {
                        ...action.payload,
                        // password: user.password, // ya no se usa
                    }
                }
                return user;
            });

            state.userSelected = initialUserForm;
            state.visibleForm = false;
        },
        loadingUsers: (state, action) => {
            state.users = action.payload.content; // action.payload
            state.paginator = action.payload;
            state.isLoading = false;
        },
        onUserSelectedForm: (state, action) => {
            state.userSelected = action.payload;
            state.visibleForm = true;
        },
        onOpenForm: (state) => { // EL ACCTION SE OMITE SI NO SE USA
            state.visibleForm = true;
        },
        onCloseForm: (state) => {
            state.visibleForm = false;
            state.userSelected = initialUserForm;
            state.funcionarioSearch = initialFuncionarioSearch;
        },
        onClearFuncionarioSearch: (state) => {
            state.funcionarioSearch = initialFuncionarioSearch;
        },
        loadingError: (state, { payload }) => {
            state.errors = payload
        }
    }
});

export const {
    onFuncionarioSearch,
    onClearFuncionarioSearch,
    addUser,
    removeUser,
    updateUser,
    loadingUsers,
    loadingUsersPage,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
} = auxiliosIndividualesSlices.actions;