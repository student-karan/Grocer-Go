import { Route, Routes, Navigate } from "react-router-dom";
import { SellerStore } from "../../store/seller_dashboard/SellerStore.ts";
import { SellerStates } from "../../Helpers/types.ts";
import SellerLogin from "./sellerlogin/SellerLogin.tsx";
import Sellerlayout from "./Sellerlayout.tsx";
import { useEffect } from "react";
import NotFound from "../Notfound/Notfound.tsx";


const SellerPage = () => {
    const { AuthSeller,setSeller,setProductsList } = SellerStore() as SellerStates;

    useEffect(() => {
        async function rerender() {
            await setSeller();
            if (AuthSeller) {
                await setProductsList();
            }
        }
        rerender();
    }, []);

    return (
        <Routes>
            <Route path="dashboard/*" element={AuthSeller ? <Sellerlayout />
                : <Navigate to="/seller/login" />} />
            <Route path="login" element={AuthSeller ? <Navigate to="/seller/dashboard" />
                : <SellerLogin />} />
            {/* catch all route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default SellerPage