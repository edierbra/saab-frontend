import saabApi from "../apis/saabApi";

const BASE_URL = '/funcionarios';

export const findAllFuncionarios = async () => {
    try {
        const response = await saabApi.get(`${BASE_URL}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const findAllFuncionariosPageable = async (page = 0) => {
    try {
        const response = await saabApi.get(`${BASE_URL}/page`
            , {
                params: {
                    pageNum: page,
                    pageSize: 5,
                    orderBy: 'id',
                    orderDir: 'desc'
                }
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export const findFuncionarioById = async (id = 0) => {
    try {
        const response = await saabApi.get(`${BASE_URL}/${id}`);
        return response;

    } catch (error) {
        throw error;
    }
}

export const findFuncionarioByIdAndNombre = async (search = "", page = 0) => {
    const partes = String(search).split(",")
    var params = {}

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
                    pageSize: 4,
                    orderBy: 'nombre',
                    orderDir: 'asc'
                }
            });
        console.log(response)
        return response;
    } catch (error) {
        throw error;
    }
}

export const create = async (funcionario) => {
    try {
        return await saabApi.post(
            BASE_URL,
            {
                ...deleteNulls(funcionario)
            },
            // config()
        )
    } catch (error) {
        throw error;
    }
}

export const update = async (funcionario) => {
    try {
        const response = await saabApi.put(
            `${BASE_URL}/${funcionario.id}`,
            {
                ...deleteNulls(funcionario)
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export const remove = async (id) => {
    try {
        const response = await saabApi.delete(
            `${BASE_URL}/${id}`
        )

        return response;

    } catch (error) {
        throw error;
    }
}

export const uploadData = async (files) => {
    const file = new FormData();
    file.append('file', files);
    try {
        const response = await saabApi.post(`${BASE_URL}/upload-data`, file,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Es importante definir el Content-Type como 'multipart/form-data' para enviar archivos
                },
            });
        return response;
    } catch (error) {
        throw error;
    }
}

const verifyNullObject = (value) => {
    return value ? value?.id : 0;
}

const deleteNulls = ({ id, nombre, fechaIngreso, fechaRetiro, estadoFuncionario, genero, cargo,
    grado, dependencia, localidad, vinculacion, salario, correo }) => {
    return {
        id,
        nombre,
        fechaIngreso,
        fechaRetiro,
        idEstadoFuncionario: verifyNullObject(estadoFuncionario),
        idGenero: verifyNullObject(genero),
        idCargo: verifyNullObject(cargo),
        idGrado: verifyNullObject(grado),
        idDependencia: verifyNullObject(dependencia),
        idLocalidad: verifyNullObject(localidad),
        idVinculacion: verifyNullObject(vinculacion),
        salario,
        correo,
    }
}