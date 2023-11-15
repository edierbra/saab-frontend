import { useState } from "react"
import { useFuncionarios } from "../../hooks/useFuncionarios";


export const Search = ({ placeholder }) => {

    const { getFuncionarioById } = useFuncionarios();

    const [id, setId] = useState('');
    var funcionario = {};

    const onSubmit = (event) => {
        event.preventDefault();
        getFuncionarioById(id);
    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setId(value)
    }

    return (
        <>
         <form onSubmit={onSubmit}>
            <div class="input-group">
                <input type="text" className="form-control rounded-pill rounded-end"
                    placeholder={placeholder} aria-describedby="basic-addon2"
                    name="id"
                    value={id}
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