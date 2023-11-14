import saabApi from "../apis/saabApi";

const BASE_URL = '/users';

// const BASE_URL = 'http://localhost:8081/api/v1/users';
// const config = () => {
//     return {
//         headers: {
//             "Authorization": sessionStorage.getItem('token'),
//             "Content-Type": 'application/json', // no es necesario pasarlo
//         }
//     }
// }

export const findAllUsers = async () => {
    try {
        const response = await saabApi.get(BASE_URL);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllUsersPageable = async (page = 0) => {
    try {
        const response = await saabApi.get(`${BASE_URL}/page/${page}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const create = async ({ username, email, password, admin }) => {
    try {
        return await saabApi.post(
            BASE_URL,
            {
                username, // si tiene nombre diferentes colocar los 2 puntos
                email,
                password,
                admin,
            },
            // config()
        )
    } catch (error) {
        throw error;
    }

}

export const update = async ({ id, username, email, admin }) => {
    try {
        return await saabApi.put(
            `${BASE_URL}/${id}`,
            {
                username, // si tiene nombre diferentes colocar los 2 puntos
                email,
                admin,
                // password: 'nothing',
            },
            // config()
        );
    } catch (error) {
        throw error;
    }

}

export const remove = async (id) => {
    try {
        await saabApi.delete(
            `${BASE_URL}/${id}`,
            // config()
        )
    } catch (error) {
        throw error;
    }
}