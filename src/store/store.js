import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";
import { auxiliosIndividualesSlices } from "./slices/auxiliosindividuales/auxiliosIndividualesSlice";
import { funcionariosSlices } from "./slices/funcionarios/funcionariosSlice";
import { othersEntitiesSlice } from "./slices/othersEntities/othersEntitiesSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        auth: authSlice.reducer,
        auxiliosindividuales: auxiliosIndividualesSlices.reducer,
        funcionarios: funcionariosSlices.reducer,
        othersEntities: othersEntitiesSlice.reducer,
    }
})