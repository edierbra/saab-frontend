import { createSlice } from "@reduxjs/toolkit";
import { useOthersEntities } from "../../../hooks/useOthersEntities";

export const initialUserForm = {
    id: 0,
    fechaSolicitud: "",
    fechaViabilidad: "",
    resolucion: "",
    fechaResolucion: "",
    rdp: "",
    fechaRdp: "",
    valor: "",
    valorTransporteRegreso: "",
    diasDesplazamiento: "",
    lugarDesplazamiento: "",
    fechaRenuncia: "",
    fechaAceptacionRenuncia: "",
    fechaInicioIncapacidad: "",
    fechaFinIncapacidad: "",
    valorMatricula: "",
    promedio: "",
    fechaReciboMatricula: "",
    referenciaReciboMatricula: "",
    observacion: "",
    idFuncionario: 0,
    idMotivoJubilacion: 0,
    idMotivoIncapacidad: 0,
    idSemestre: 0,
    idEstadoAuxilio: 0,
    idParentesco: 0,
    idEstudioFormal: 0,
    idPrograma: 0,
    idSindicato: 0,
    idTipoAuxilioIndividual: 0,
    idBeneficiarioEstudio: 0
}

const initialErrors = {
    username: '',
    password: '',
    email: '',
}


export const auxiliosIndividualesSlices = createSlice({
    
    name: 'auxiliosindividuales',
    initialState: {
        users: [],
        paginator: {},
        userSelected: initialUserForm,
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