import { createSlice } from "@reduxjs/toolkit";

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
    id: "",
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
    idFuncionario: "",
    idMotivoJubilacion: "",
    idMotivoIncapacidad: "",
    idSemestre: "",
    idEstadoAuxilio: "",
    idParentesco: "",
    idEstudioFormal: "",
    idPrograma: "",
    idSindicato: "",
    idTipoAuxilioIndividual: "",
    idBeneficiarioEstudio: ""
}

export const initialValorTotal = {
    total: {
        result: ''
    }
}


export const auxiliosIndividualesSlice = createSlice({

    name: 'auxiliosindividuales',
    initialState: {
        auxiliosIndividuales: [],
        paginator: {},
        auxiliosIndividualSelected: initialAuxiliosIndividualForm,
        visibleForm: false,
        visibleEstadoForm: false,
        errors: initialErrors,
        isLoading: true,
        onlyShow: false,
        valorTotal: initialValorTotal,
    },

    reducers: {
        onFuncionarioSearch: (state, action) => {
            state.funcionarioSearch = action.payload;
        },
        addAuxilioIndividual: (state, action) => {
            state.auxiliosIndividuales = [
                {
                    ...action.payload,
                },
                ...state.auxiliosIndividuales,
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
                    }
                }
                return auxilioIndividual;
            });

            state.auxiliosIndividualSelected = initialAuxiliosIndividualForm;
            state.visibleForm = false;
            state.visibleEstadoForm = false;
            state.isLoading = false;
        },
        loadingAuxilioIndividuales: (state, action) => {
            state.auxiliosIndividuales = action.payload.content; // action.payload
            state.paginator = action.payload;
            state.isLoading = false;
        },
        onAuxilioIndividualSelectedForm: (state, action) => {
            state.auxiliosIndividualSelected = {
                ...state.auxiliosIndividuales.find(aux => aux.id == action.payload.id)
            };
            state.visibleForm = true;
            state.onlyShow = action.payload.onlyShow;
        },
        onAuxilioSelectedFormToUpdateEstado: (state, action) => {
            state.auxiliosIndividualSelected = {
                ...state.auxiliosIndividuales.find(aux => aux.id == action.payload)
            };
            state.visibleEstadoForm = true;
        },
        onOpenForm: (state) => { // EL ACCTION SE OMITE SI NO SE USA
            state.visibleForm = true;
        },
        onCloseForm: (state) => {
            state.visibleForm = false;
            state.visibleEstadoForm = false
            state.auxiliosIndividualSelected = initialAuxiliosIndividualForm;
            state.onlyShow = false;
            state.valorTotal = initialValorTotal;
        },
        loadingError: (state, { payload }) => {
            state.errors = payload
        },
        loadingValorTotal: (state, { payload }) => {
            state.valorTotal = payload;
            state.errors = initialErrors;
        },
    }
});

export const {
    onFuncionarioSearch,
    addAuxilioIndividual,
    removeAuxilioIndividual,
    updateAuxilioIndividual,
    loadingAuxilioIndividuales,
    onAuxilioIndividualSelectedForm,
    onAuxilioSelectedFormToUpdateEstado,
    onOpenForm,
    onCloseForm,
    loadingError,
    loadingValorTotal,
} = auxiliosIndividualesSlice.actions;