import { createSlice } from "@reduxjs/toolkit";
import { useOthersEntities } from "../../../hooks/useOthersEntities";

export const initialAuxiliosIndividualForm = {
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
    diasIncapacidad: "",
    lugarDesplazamiento: "",
    fechaRenuncia: "",
    fechaAceptacionRenuncia: "",
    fechaInicioIncapacidad: "",
    fechaOtorgamientoAnteojos: "",
    fechaOpcionalCalculo: "",
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
        auxiliosIndividuales: [],
        paginator: {},
        auxiliosIndividualSelected: initialAuxiliosIndividualForm,
        visibleForm: false,
        errors: initialErrors,
        isLoading: true,
        onlyShow: false,
    },

    reducers: {
        onFuncionarioSearch: (state, action) => {
            console.log(action.payload)
            state.funcionarioSearch = action.payload;
        },
        addAuxilioIndividual: (state, action) => {
            state.auxiliosIndividuales = [
                ...state.auxiliosIndividuales,
                {
                    ...action.payload,
                }
            ];

            state.auxiliosIndividualSelected = initialAuxiliosIndividualForm;
            state.visibleForm = false;
        },
        removeAuxilioIndividual: (state, action) => {
            state.auxiliosIndividuales = state.auxiliosIndividuales.filter(auxilioIndividual => auxilioIndividual.id !== action.payload);
        },
        updateAuxilioIndividual: (state, action) => {
            state.isLoading = true;
            state.auxiliosIndividuales = state.auxiliosIndividuales.map(auxilioIndividual => {
                if (auxilioIndividual.id === action.payload.id) {
                    return {
                        ...action.payload,
                        // password: user.password, // ya no se usa
                    }
                }
                return auxilioIndividual;
            });

            state.auxiliosIndividualSelected = initialAuxiliosIndividualForm;
            state.visibleForm = false;
            state.isLoading = false;
        },
        loadingAuxilioIndividuales: (state, action) => {
            state.auxiliosIndividuales = action.payload.content; // action.payload
            state.paginator = action.payload;
            state.isLoading = false;
        },
        onAuxilioIndividualSelectedForm: (state, action) => {
            state.auxiliosIndividualSelected = {
                ...state.auxiliosIndividuales.find(aux => aux.id==action.payload.id)
            };
            state.visibleForm = true;
            state.onlyShow = action.payload.onlyShow ;
        },
        onOpenForm: (state) => { // EL ACCTION SE OMITE SI NO SE USA
            state.visibleForm = true;
        },
        onCloseForm: (state) => {
            state.visibleForm = false;
            state.auxiliosIndividualSelected = initialAuxiliosIndividualForm;
            state.onlyShow = false;
        },  
        loadingError: (state, { payload }) => {
            state.errors = payload
        }
    }
});

export const {
    onFuncionarioSearch,
    onClearFuncionarioSearch,
    addAuxilioIndividual,
    removeAuxilioIndividual,
    updateAuxilioIndividual,
    loadingAuxilioIndividuales,
    loadingUsersPage,
    onAuxilioIndividualSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
} = auxiliosIndividualesSlices.actions;