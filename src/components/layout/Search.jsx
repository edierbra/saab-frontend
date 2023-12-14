import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


export const Search = ({ placeholder, functionSearch, setSearch}) => {

    const [valueSearch, setValueSearch] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        functionSearch(valueSearch); 
    }

    const onInputChange = ({ target }) => { // Guarda el termino de busqueda para usarlo en futuras ocaciones
        const { value } = target;
        setValueSearch(value)
        setSearch && setSearch(value)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <input type="text" className="form-control rounded-pill rounded-end"
                        placeholder={placeholder} aria-describedby="basic-addon2"
                        autoComplete="off"
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