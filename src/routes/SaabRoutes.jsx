import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { SideBar } from "../components/layout/SideBar";
import { RegisterPage } from "../pages/RegisterPage";
import { useAuth } from "../auth/hooks/useAuth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AuxiliosIndividualesPage } from "../pages/AuxiliosIndividualesPage";
import { FuncionariosPage } from "../pages/FuncionariosPage";
import { ValoresConvencionalesPage } from "../pages/ValoresConvencionalesPage";
import { UploadDataPage } from "../pages/UploadDataPage";

export const SaabRoutes = ({ handlerHideSideBar, value1, value2 }) => {
    const { isAdmin } = useSelector(state => state.auth);

    // const { handlerLogin } = useAuth();

    // useEffect(() => {
    //     // Iniciar el temporizador al montar el componente
    //     const tokenRenewalInterval = setInterval(() => {
    //       // Lógica para renovar el token
    //       renewToken();
    //     }, 1 * 30 * 1000); // 15 minutos en milisegundos

    //     // Limpiar el temporizador al desmontar el componente
    //     return () => clearInterval(tokenRenewalInterval);
    //   }, []); // El segundo parámetro [] asegura que useEffect se ejecute solo al montar y desmontar el componente

    //   const renewToken = () => {
    //     handlerLogin({password: '123', username: 'admin'})
    //     console.log('Token renovado');
    //   };

    return (
        <div className="row m-0">
            <div className={value1}>
                <SideBar handlerHideSideBar={handlerHideSideBar} />
            </div>

            <div className={value2}>
                <Routes>
                    <Route path="/" element={<Navigate to="auxilios-individuales" />} />
                    <Route path="/auxilios-individuales" element={<AuxiliosIndividualesPage />} />
                    <Route path="/auxilios-individuales/page/:page" element={<AuxiliosIndividualesPage />} />
                    {/* Agregamos una ruta para manejar rutas desconocidas */}
                    <Route path="*" element={<Navigate to="/auxilios-individuales" />} />

                    {isAdmin && (
                        <>
                            <Route path="/users" element={<UsersPage />} />

                            <Route path="/users/page/:page" element={<UsersPage />} />

                            <Route path="/funcionarios" element={<FuncionariosPage />} />

                            <Route path="/funcionarios/page/:page" element={<FuncionariosPage />} />

                            <Route path="/valores-convencionales" element={<ValoresConvencionalesPage />} />

                            <Route path="/valores-convencionales/page/:page" element={<ValoresConvencionalesPage />} />

                            <Route path="/upload-data" element={<UploadDataPage />} />

                            {/* <Route path="/register-user" element={<RegisterPage />} /> */}
                            {/* <Route path="/users/edit/:id" element={<RegisterPage />} /> */}
                        </>
                    )}

                </Routes>
            </div>
        </div>
    );
};
