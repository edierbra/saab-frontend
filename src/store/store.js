import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";
import { auxiliosIndividualesSlices } from "./slices/auxiliosindividuales/auxiliosIndividualesSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        auth: authSlice.reducer,
        auxiliosindividuales: auxiliosIndividualesSlices.reducer,
    }
})