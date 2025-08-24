import { useNavigate,Link } from "react-router-dom";
import Sectionheading from "../../components/Sectionheading";
import { CartStates, product, ProductStates } from "../../Helpers/types.ts";
import { CartStore } from "../../store/main_app/CartStore.ts";
import { ProductStore } from "../../store/main_app/ProductStore";
import { MoveLeft } from "lucide-react";
import {motion} from 'motion/react'; 
import { assets } from "../../assets/assets.ts";

const CartProducts = () => {
    const { totalItems, cartItems, totalitemAmount,removeitem } = CartStore();
    const MotionLink = motion(Link);
    const MotionArrowLeft = motion(MoveLeft);
  return (
        <div className="cartproducts_section">

          <div className="cart_heading">
            <Sectionheading title="Shopping Cart" />
            <p className="text-orange-700">{totalItems()} items</p>
          </div>

          {totalItems() > 0? (
            <div className="product_table">
            {/* Header row */}
            <div className="col_header_products">Product details</div>
            <div className="col_header">Subtotal</div>
            <div className="col_header">Action</div>

            {/* Product rows */}
            {Object.keys(cartItems).map((itemid) => {
              return (cartItems[itemid] > 0 && (
                <>
                  <div className="col_data_products">
                    <Product itemid={itemid} />
                  </div>
                  <div className="col_data">
                    <p>&#8377;{totalitemAmount(itemid)}</p>
                  </div>
                  <div className="col_data">
                    <img onClick={()=>removeitem(itemid)} src={assets.remove_icon} alt="remove_icon" className="removebtn"/>
                  </div>
                </>
              ))
            })}
          </div>): (
            <p className="no_products_available">No Products in the Cart.</p>
          )}
          <MotionLink whileHover="hover" to="/products/all" className='prod_page_link'>
                <MotionArrowLeft variants={{ hover: { x: -10 } }} initial={{ x: 0 }} className="text-xs" />
                <br />
                <p>Continue Shopping</p>
            </MotionLink>
        </div>
  )
}

const Product = ({ itemid }: { itemid: string }) => {
  const { products } = ProductStore() as ProductStates;
  const { addtoCart, removefromCart, itemcount } = CartStore() as CartStates;
  const navigate = useNavigate();
  const Product = products.find(product => product._id === itemid) as product;

  return (
    <div className="prod_to_buy">
      <span className="product_img_container">
        <img alt="product image" onClick={() => navigate(`/products/${Product.category.toLowerCase()}/${Product._id}`)} src={Product?.image[0]} className="md:size-20 size-14" />
      </span>
      <div className="product_details">
        <p>{Product?.name}</p>
        <p>weight: N/A</p>
        <div className="product_quantity_btn">
          <p className="cursor-pointer" onClick={() => removefromCart(itemid)}>-</p>
          <p className="md:text-xl text-base">{itemcount(itemid)}</p>
          {itemcount(itemid) < 9? (<p className="cursor-pointer" onClick={() => addtoCart(itemid)}>+</p>):<p></p>}
        </div>
        {itemcount(itemid) > 8 && <p className="text-sm text-gray-500">Out of Stock</p>}
      </div>
    </div>
  )
}

export default CartProducts