import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

const Loader = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const nextURL = query.get("next");

    useEffect(() => {
        if (nextURL) {
            setTimeout(() => {
                navigate(`/${nextURL}`);
            }, 5000);
        }
    }, [nextURL])
    return (
        <div className='registration_page'>
            <div className='animate-spin rounded-full size-24 border-4 border-gray-300 border-t-orange-500'>

            </div>
        </div>
    )
}

export default Loader