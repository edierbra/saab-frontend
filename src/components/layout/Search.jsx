import { useEffect, useState } from "react"
import { useFuncionarios } from "../../hooks/useFuncionarios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";


export const Search = ({ placeholder, valueDefault, functionSearch }) => {

    const { page } = useParams()

    const [valueSearch, setValueSearch] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        // if (false) {
        //     Swal.fire(
        //         'Consulta Erronea!',
        //         'La consulta no puede estar vacía',
        //         'error'
        //     )
        //     return;
        // }
        functionSearch(valueSearch, page);
    }

    useEffect(() => {
        valueDefault && functionSearch(valueDefault, page);
    }, [valueDefault, page])

    const onInputChange = ({ target }) => {
        const { value } = target;
        setValueSearch(value)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <input type="text" className="form-control rounded-pill rounded-end"
                        placeholder={placeholder} aria-describedby="basic-addon2"
                        name="valueSearch"
                        value={valueSearch}
                        onChange={onInputChange}
                    />
                    <span type="button" className="btn ms-1 btn-login input-group-text rounded-pill rounded-start"
                        onClick={onSubmit}>
                        <i className=" bi bi-search"></i>
                    </span>
                </div>
            </form>
        </>
    )
}