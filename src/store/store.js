import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";
import { auxiliosIndividualesSlice } from "./slices/auxiliosindividuales/auxiliosIndividualesSlice";
import { funcionariosSlices } from "./slices/funcionarios/funcionariosSlice";
import { othersEntitiesSlice } from "./slices/othersEntities/othersEntitiesSlice";
import { valoresConvencionalesSlice } from "./slices/valoresconvencionales/valoresConvencionalesSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        auth: authSlice.reducer,
        auxiliosindividuales: auxiliosIndividualesSlice.reducer,
        funcionarios: funcionariosSlices.reducer,
        othersEntities: othersEntitiesSlice.reducer,
        valoresconvencionales: valoresConvencionalesSlice.reducer,
    }
})