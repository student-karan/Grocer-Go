import { Link } from "react-router-dom"
import { product } from "../Helpers/types"

const Productpath = ({Product}:{Product: product}) => {
  return (
    <div className="flex self-start items-end flex-col gap-2 mb-4">
    <div className="flex items-center gap-1 md:text-2xl sm:text-xl text-base font-medium text-white/80">
       <Link to="/" className="link_on_hover">Home</Link>
       <span> / </span>
       <Link to="/products/all" className="link_on_hover">Products</Link>
       <span> / </span>
       <Link to={`/products/${Product?.category || ""}`} className="link_on_hover">{Product?.category || ""}</Link>
       <span> / </span>
       <p className="text-orange-600">{Product?.name || ""}</p>
    </div>
    <div className="heading_underline"></div>
    </div>
  )
}

export default Productpath