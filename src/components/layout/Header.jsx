import { useAuth } from "../../auth/hooks/useAuth"
import { Search } from "./Search"

export const Header = ({ visibleForm, handlerOpenForm, placeholder, valueDefault, functionSearch, setSearch }) => {

    const {
        login
    } = useAuth()

    return (
        <>
            <div className="my-2 px-0 py-2 rounded d-flex justify-content-center shadow-xx">
                <div className="w-50 me-2">
                    <Search
                        placeholder={placeholder}
                        valueDefault={valueDefault}
                        functionSearch={functionSearch}
                        setSearch={setSearch}
                    />
                </div>

                <div className="me-2">
                    {(visibleForm || (!login.isAdmin && !login.isRoot)) ||

                        <button
                            className="btn btn-mybotton btn-color-blue p-1 m-1"
                            onClick={handlerOpenForm}
                        >
                            <i className="bi bi-plus-circle-fill"
                                typeof="button">
                                <span className="ms-1 d-none d-lg-inline">Agregar</span>
                            </i>
                        </button>
                    }
                </div>
            </div>
        </>
    )
}