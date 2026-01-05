import { useEffect } from "react";
import { useNavigate,useSearchParams } from "react-router-dom"
import { CartStore } from "../../store/main_app/CartStore";
import { AppStore } from "../../store/main_app/AppStore";

const Verify = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {isverifyingPayment,verifyPayment} = CartStore();
    const {AuthUser} = AppStore();

    const success = searchParams.get("success") || "";
    const orderId = searchParams.get("orderId") || "";
    
    useEffect(()=>{
        if(!AuthUser){
            navigate("/login");
        }
        verifyPayment(success,orderId).then((result)=>{
            if(result){
                navigate("/my-orders");
            } else {
                navigate("/cart");
            }
        })
    },[AuthUser]);
    return (
        <>
            {isverifyingPayment && (
                <div className='registration_page'>
                    <div className='animate-spin rounded-full size-24 border-4 border-gray-300 border-t-orange-500'>

                    </div>
                </div>
            )}
        </>
    )
}

export default Verify