import { SellerStates } from "../../../Helpers/types.ts";
import { SellerStore } from "../../../store/seller_dashboard/SellerStore.ts";

const ProductList = () => {
   const {productList,toggleStock}  = SellerStore() as SellerStates;

  return (
    <div className="dashboard_page">
      <h2 className="seller_heading">All Products</h2>
      <div className="productlist_container">
        <table className="list_table">
          <thead className="list_thead">
            <tr>
              <th className="list_th_item">Product</th>
              <th className="list_th_item">Category</th>
              <th className="list_th_item hidden md:block">Selling Price</th>
              <th className="list_th_item">In Stock</th>
            </tr>
          </thead>
          <tbody className="list_tbody">
            {productList.map((product) => (
              <tr key={product._id} className="tbody_row">
                <td className="list_td_image">
                  <div className="list_td_img_body">
                    <img src={product.image[0]} alt="Product" className="w-16" />
                  </div>
                  <span className="truncate max-sm:hidden w-full">{product.name}</span>
                </td>
                <td className="list_td">{product.category}</td>
                <td className="list_td max-sm:hidden"> &#8377;{product.offerPrice}</td>
                <td className="list_td">
                  <label className="list_checkbox_label">
                    <input type="checkbox" className="sr-only peer" onChange={()=>toggleStock(!product.inStock,product._id)} checked={product.inStock}/>
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList