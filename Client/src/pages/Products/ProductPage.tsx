import { Route, Routes } from "react-router-dom"
import ProductsCategory from "./ProductsCategory"
import AllProducts from "./AllProducts"
import ProductDetails from "./ProductDetails"
import NotFound from "../Notfound/Notfound"

const ProductPage = () => {
  return (
    <div className="webpage">
      <Routes>
        <Route path="all" element={<AllProducts/>}/>
        <Route path=":category" element={<ProductsCategory/>}/>
        <Route path=":category/:_id" element={<ProductDetails/>}/>
        {/* catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default ProductPage