import { createSlice } from "@reduxjs/toolkit";
import { useOthersEntities } from "../../../hooks/useOthersEntities";

export const initialValorConvencionalForm = {
    id: 0,
    fechaSolicitud: "",
    fechaViabilidad: "",
    resolucion: "",
    fechaResolucion: "",
    rdp: "",
    fechaRdp: "",
    valor: "",
    observacion: "",
    fechaOpcionalCalculo: "",
    idEstadoAuxilio: 0,
    idSindicato: 0,
    idTipoNegociacionSindical: 0,
    idNegociacionSindical: 0,
}

export const initialValuesCalculo = {
    concepto: { id: 0, nombre: '' },
    factor: ''
}

export const initialErrors = {
    id: '',
    fechaSolicitud: "",
    fechaViabilidad: "",
    resolucion: "",
    fechaResolucion: "",
    rdp: "",
    fechaRdp: "",
    valor: "",
    observacion: "",
    fechaOpcionalCalculo: "",
    idEstadoAuxilio: '',
    idSindicato: '',
    idTipoNegociacionSindical: '',
    idNegociacionSindical: '',
}

export const valoresConvencionalesSlice = createSlice({

    name: 'valoresconvencionales',
    initialState: {
        valoresConvencionales: [],
        paginator: {},
        valorConvencionalSelected: initialValorConvencionalForm,
        visibleForm: false,
        visibleEstadoForm: false,
        errors: initialErrors,
        isLoading: true,
        onlyShow: false,
        valorTotal: '',

    },

    reducers: {
        addValorConvencional: (state, action) => {
            state.valoresConvencionales = [
                {
                    ...action.payload,
                },
                ...state.valoresConvencionales,
            ];

            state.valorConvencionalSelected = initialValorConvencionalForm;
            state.visibleForm = false;
        },
        removeValorConvencional: (state, action) => {
            state.valoresConvencionales = state.valoresConvencionales.filter(valorConvencional => valorConvencional.id !== action.payload);
        },
        updateValorConvencional: (state, action) => {
            state.isLoading = true;
            state.valoresConvencionales = state.valoresConvencionales.map(valorConvencional => {
                if (valorConvencional.id === action.payload.id) {
                    return {
                        ...action.payload,
                    }
                }
                return valorConvencional;
            });

            state.valorConvencionalSelected = initialValorConvencionalForm;
            state.visibleForm = false;
            state.visibleEstadoForm = false
            state.isLoading = false;
        },
        loadingValoresConvencionales: (state, action) => {
            // if(!action.payload.content)
            state.valoresConvencionales = action.payload.content; // action.payload
            state.paginator = action.payload;
            state.isLoading = false;
        },
        onValorConvencionalSelectedForm: (state, action) => {
            state.valorConvencionalSelected = {
                ...state.valoresConvencionales.find(valor => valor.id == action.payload.id)
            };
            state.visibleForm = true;
            state.onlyShow = action.payload.onlyShow;
        },
        onValorSelectedFormToUpdateEstado: (state, action) => {
            state.valorConvencionalSelected = {
                ...state.valoresConvencionales.find(aux => aux.id == action.payload)
            };
            state.visibleEstadoForm = true;
        },
        onOpenForm: (state) => { // EL ACCTION SE OMITE SI NO SE USA
            state.visibleForm = true;
        },
        onCloseForm: (state) => {
            state.visibleForm = false;
            state.visibleEstadoForm = false;
            state.valorConvencionalSelected = initialValorConvencionalForm;
            state.onlyShow = false;
            state.valorTotal = '';
        },
        loadingError: (state, { payload }) => {
            state.errors = payload
        },
        loadingValorTotal: (state, { payload }) => {
            state.valorTotal = payload;
            state.errors = initialErrors;
        },
        setIsLoanding: (state, { payload }) => {
            state.isLoading = payload;
        },
    }
});



export const {
    addValorConvencional,
    removeValorConvencional,
    updateValorConvencional,
    loadingValoresConvencionales,
    onValorConvencionalSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
    loadingValorTotal,
    setIsLoanding,
    onValorSelectedFormToUpdateEstado,
} = valoresConvencionalesSlice.actions;