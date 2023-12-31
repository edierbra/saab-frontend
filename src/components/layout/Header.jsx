import { useAuth } from "../../auth/hooks/useAuth"
import { Btn } from "./Btn"
import { Search } from "./Search"

export const Header = ({ visibleForm, handlerOpenForm, placeholder, valueDefault, functionSearch, setSearch }) => {

    const {
        login
    } = useAuth()

    return (
        <>
            <div className="my-2 px-0 py-2 rounded d-flex justify-content-center justify-items-center aling-items-center shadow-xx">
                <div className="w-50 me-2">
                    <Search
                        placeholder={placeholder}
                        valueDefault={valueDefault}
                        functionSearch={functionSearch}
                        setSearch={setSearch}
                    />
                </div>

                {(visibleForm || (!login.isAdmin && !login.isRoot)) ||
                    <Btn
                        onClick={handlerOpenForm}
                        dataOnClick={''}
                        icon={"bi bi-plus-circle-fill"}
                        style={"btn btn-mybotton btn-color-blue my-1"}
                        text={'Agregar'}
                        type={"button"}
                    />
                }
            </div>
        </>
    )
}