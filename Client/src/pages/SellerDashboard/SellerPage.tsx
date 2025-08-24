import { Route, Routes, Navigate } from "react-router-dom";
import { SellerStore } from "../../store/seller_dashboard/SellerStore.ts";
import { SellerStates } from "../../Helpers/types.ts";
import SellerLogin from "./sellerlogin/SellerLogin.tsx";
import Sellerlayout from "./Sellerlayout.tsx";


const SellerPage = () => {
    const { AuthSeller } = SellerStore() as SellerStates;

    return (
        <Routes>
            <Route path="dashboard/*" element={AuthSeller ? <Sellerlayout />
                : <Navigate to="/seller/login" />} />
            <Route path="login" element={AuthSeller ? <Navigate to="/seller/dashboard" />
                : <SellerLogin />} />
        </Routes>
    )
}

export default SellerPage