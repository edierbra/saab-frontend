import { useAuth } from "../../auth/hooks/useAuth"
import { Search } from "./Search"

export const Header = ({ visibleForm, handlerOpenForm, placeholder, valueDefault, functionSearch }) => {

    const {
        login
    } = useAuth()

    return (
        <>
            <div className="my-2 px-0 py-2 rounded d-flex justify-content-center shadow-xx">
                <div className="w-75 me-2">
                    <Search
                        placeholder={placeholder}
                        valueDefault={valueDefault}
                        functionSearch={functionSearch}
                    />
                </div>

                <div className="me-2">
                    {(visibleForm || (!login.isAdmin && !login.isRoot)) ||
                        <button
                            className="btn btn-mybotton btn-color-blue p-1 m-1"
                            onClick={handlerOpenForm}>
                            <i className="bi bi-plus-circle-fill"
                                typeof="button">
                                <span className="ms-1">Agregar</span>
                            </i>
                        </button>
                    }
                </div>
            </div>
        </>
    )
}