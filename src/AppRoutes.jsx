import { LoginPage } from "./auth/pages/LoginPage"
import { Navigate, Route, Routes } from "react-router-dom"
import { SaabRoutes } from "./routes/SaabRoutes"
import { useSelector } from "react-redux"
import { useState } from "react"

export const AppRoutes = () => {
    const [value1, setValue1] = useState('custom-sidebar-open p-0') // width for SideBar
    const [value2, setValue2] = useState('custom-main-content-open p-0 body') // width for body 

    const handlerHideSideBar = (openSideBar) => {
        setValue1(openSideBar ? "custom-sidebar-open p-0 sidebar" : "custom-sidebar-close sidebar p-0 sidebar");  // setValue1(openSideBar ?  'col-1 col-lg-2 p-0': 'col-1 col-lg-1 p-0'); 
        setValue2(openSideBar ? "custom-main-content-open px-3 body" : "custom-main-content-close px-3 body") // setValue2(openSideBar ? "col-11 col-lg-10 p-0" : "col-11 col-lg-11 p-0")
    }

    const { isAuth} = useSelector(state => state.auth);

    // if (isLoginLoading) { // isLoading colocarlo en useSelector
    //     return (
    //         <div className="d-flex justify-content-center align-items-center vh-100">
    //             <button className="btn btn-primary" type="button" disabled>
    //                 <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true"></span>
    //                 <span role="status">Cargando...</span>
    //             </button>
    //         </div>
    //     )
    // }

    return (
        <Routes>
            {
                isAuth ?
                    (
                        <>
                            <Route path="/*"
                                element={
                                    <SaabRoutes
                                        handlerHideSideBar={handlerHideSideBar}
                                        value1={value1}
                                        value2={value2}
                                    />
                                }
                            />
                        </>
                    ) :
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/*" element={<Navigate to={"/login"} />} />
                    </>
            }
        </Routes>
    )
}