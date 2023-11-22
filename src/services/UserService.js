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
        const response = await saabApi.get(`${BASE_URL}/page`,
            {
                params: {
                    pageNum: page,
                    pageSize: 8,
                    orderBy: 'id',
                    orderDir: 'desc'
                }
            });
        return response;
    } catch (error) {
        throw error;
    }
}

export const findUserByIdAndNombre = async (search = "", page=0) => {
    const partes = String(search).split(",")
    var params = {}

    console.log(partes)

    switch (partes.length) {
        case 1:
            var parte1 = partes[0].trim();
            if (!isNaN(parte1)) {
                params.id = parte1;
            } else {
                params.nombre = parte1;
            }
            break;

        case 2:
            var parte1 = partes[0].trim();
            var parte2 = partes[1].trim();
            if (!isNaN(parte1)) {
                params.id = parte1;
                params.nombre = parte2;
            } else {
                params.nombre = parte1;
            }
            break;

        default:
            params = {}
            break;
    }

    try {
        const response = await saabApi.get(`${BASE_URL}/idandnombre`
            , {
                params: {
                    ...params,
                    pageNum: page,
                    pageSize: 8,
                    orderBy: 'id',
                    orderDir: 'desc'
                }
            });
        console.log(response)
        return response;

    } catch (error) {
        throw error;
    }
}

export const create = async (user) => {

    console.log(user)
    try {
        return await saabApi.post(
            BASE_URL,
            {
                ...user
            },
            // config()
        )
    } catch (error) {
        throw error;
    }

}

export const update = async ({ id, username, email, admin, root, nombre }) => {
    console.log("id en service", id)
    try {
        return await saabApi.put(
            `${BASE_URL}/${id}`,
            {
                username, // si tiene nombre diferentes colocar los 2 puntos
                email,
                admin,
                nombre,
                root,
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