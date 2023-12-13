import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
    id: '',
    username: '',
    password: '',
    email: '',
    nombre: '',
    admin: false,
    root: false,
}

const initialErrors = {
    username: '',
    password: '',
    email: '',
    nombre: '',
    id: "",
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        paginator: {},
        userSelected: initialUserForm,
        visibleForm: false,
        errors: initialErrors,
        isLoading: true,
    },

    reducers: {
        addUser: (state, action) => {
            state.users = [
                {
                    ...action.payload,
                },
                ...state.users,
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
            state.isLoading = false ;
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
    addUser,
    removeUser,
    updateUser,
    loadingUsers,
    loadingUsersPage,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
} = usersSlice.actions;