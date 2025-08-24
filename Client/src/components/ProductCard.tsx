import { ThemeStore } from "../store/main_app/ThemeStore.ts";
import { CartStore } from "../store/main_app/CartStore.ts";
import { type product } from "../Helpers/types.ts";
import { ShoppingCart } from "lucide-react";
import { assets } from "../assets/assets.ts";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }: { product: product }) => {
    const { addtoCart, removefromCart, itemcount } = CartStore();
    const count = itemcount(product._id);
    const { theme } = ThemeStore();
    const navigate = useNavigate();
    return (

        <div onClick={() => navigate(`/products/${product.category.toLowerCase()}/${product._id}`)} key={product._id} className={`product_card ${theme === "light" && "border border-gray-500"}`}>

            <img src={product.image[0]} alt="sample" className='product_img' />
            <p className='category'>{product.category}</p>
            <p className='product_name'>{product.name}</p>

            <div className="flex my-1">
                {Array(5).fill(0).map((_, i) => {
                    return (<img key={i} className="sm:size-4 size-2" src={i <= 3 ? assets.star_icon : assets.star_dull_icon} />)
                })}
            </div>

            <div className='card_lower_body' onClick={(e) => e.stopPropagation()}>
                <div className='price'>
                    <p className='offer_price'>&#8377;{product.offerPrice}</p>
                    <p className='real_price'>&#8377;{product.price}</p>
                </div>
                {count === 0 ?
                    (<button className='cartbtn' onClick={() => addtoCart(product._id)}>
                        <ShoppingCart />
                        <p>Add</p>
                    </button>) :
                    (<div className="cartbtn">
                        <p className="text-xl cursor-pointer" onClick={() => removefromCart(product._id)}>-</p>
                        <p className="text-xl">{count}</p>
                        {itemcount(product._id) < 9? (<p className="text-xl cursor-pointer" onClick={() => addtoCart(product._id)}>+</p>):<p></p>}
                    </div>)
                }
            </div>

        </div>
    )
}
export default ProductCard;