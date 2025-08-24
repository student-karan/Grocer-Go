import { assets } from "../../assets/assets.ts";
import { Link } from "react-router-dom";
const Mainbanner = () => {
    return (
        <div className="relative w-[95%]">
            <img src={assets.main_banner_bg} alt="banner" className="banner" />
            <img src={assets.main_banner_bg_sm} alt="banner" className="banner_sm" />
            <div className="banner_data">
                <h1 className="banner_text">Freshness You Can Smell,<br /> Delivered in Minutes.</h1>
                <div className="banner_links">
                    <Link to={"/products/all"} className="banner_link_1">
                        <p>Shop Now</p>
                        <img className="banner_link_1_arrow" src={assets.white_arrow_icon} alt="arrow" />
                    </Link>
                    <Link to={"/products"} className="banner_link_2">
                        <p>Explore deals</p>
                        <img className="banner_link_2_arrow" src={assets.black_arrow_icon} alt="arrow" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Mainbanner