import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = { token: false };
    return auth.token ? <Outlet /> : <Navigate to='/signin' />;
}

export default PrivateRoutes;
