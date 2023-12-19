export const onOptionsSelect = (objetoIdNombre, defaultOption, showidNombre) => {

    if (!objetoIdNombre) return null // Manejar el caso en que funcionarioForm es null o undefined

    const options = (
        <>
            <option
                key='0'
                value='0'>
                {defaultOption}
            </option>
            {Array.isArray(objetoIdNombre) ? (
                objetoIdNombre.map(({ id, nombre }) => (
                    <option
                        key={id}
                        value={id}
                    // selected={identificador == id}
                    >
                        {showidNombre ? `${id} - ${nombre}` : nombre}
                    </option>
                ))
            ) : (
                (objetoIdNombre?.nombre && objetoIdNombre?.id) && (
                    <option
                        key={objetoIdNombre?.id}
                        value={objetoIdNombre?.id}
                    // selected={identificador == objetoIdNombre?.id}
                    >
                        {showidNombre ? `${objetoIdNombre.id} ${objetoIdNombre.nombre}` : objetoIdNombre.nombre}
                    </option>
                )
            )}
        </>
    );

    return options;
};

export const verificarFormatoFecha = (texto) => {
    // const regex = /^\d{4}-\d{2}-\d{2}$/;
    const regex = /^(19[5-9]\d|2\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const match = regex.test(texto);

    if (match) {
        const partesFecha = texto.split("-");
        const año = parseInt(partesFecha[0], 10);
        const mes = parseInt(partesFecha[1], 10);
        const dia = parseInt(partesFecha[2], 10);

        if (año > 1950 && mes <= 12 && dia <= 31) {
            return true; // Cumple con todos los criterios
        } else {
            return false; // No cumple con los criterios adicionales
        }
    } else {
        return false; // No cumple con el formato AAAA-MM-DD
    }
}

export const diferenceDays = (fecha1, fecha2) => {
    let result = 0
    const miliseconsByDay = 1000 * 60 * 60 * 24;
    const difeInDays = Math.floor((new Date(fecha2) - new Date(fecha1)) / miliseconsByDay);
    (!difeInDays && difeInDays != 0) ? result = '' :
        result = difeInDays < 0 ? difeInDays - 1 :
            difeInDays + 1

    return result;
}