import { CartStates, product, ProductStates } from "../../Helpers/types.ts"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets.ts";
import { CartStore } from "../../store/main_app/CartStore.ts";
import { ProductStore } from "../../store/main_app/ProductStore.ts";
import Productpath from "../../components/Productpath.tsx";
import { Loader } from "lucide-react";
import ProductCard from "../../components/ProductCard.tsx";
import Sectionheading from "../../components/Sectionheading.tsx";

const ProductDetails = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const { products } = ProductStore() as ProductStates;
    const Product = products.find((product: product) => product._id === _id) as product;;
    const [thumbnail, setThumbnail] = useState<string>("");
    const { addtoCart } = CartStore() as CartStates;
    const [relatedProducts, setRelatedProducts] = useState<product[]>([]);

    function buyNow(productId: string) {
        addtoCart(productId);
        navigate("/cart");
    }

    useEffect(() => {
        if (Product) {
            setThumbnail(Product.image[0]);
            const related = products.filter((item: product) => item.category === Product.category && item._id !== Product._id);
            setRelatedProducts(related);
        }
    }, [Product])
    return (
        <div className="section_body">
            {Product ? (
                <div className="prod_page">
                    <Productpath Product={Product} />
                    <div className="main_container_detail">
                        {/* image gallery */}
                        <div className="img_container">
                            {Product?.image.length > 1 &&
                                <div className="img_gallery">
                                    {Product?.image.map((img, idx) => (
                                        <img onClick={() => setThumbnail(img)} key={idx} src={img} alt={Product.name} className="gallery_img" />
                                    ))}
                                </div>}
                            <img src={thumbnail} alt={Product?.name} className="display_img" />
                        </div>
                        {/* product details */}
                        <div className="detail_container">
                            {/* product name and rating */}
                            <div className="flex flex-col gap-1">
                                <p className="product_name_details">{Product?.name}</p>
                                <div className="rating">
                                    <div className="flex my-1">
                                        {Array(5).fill(0).map((_, i) => {
                                            return (<img className="md:size-5" key={i} src={i <= 3 ? assets.star_icon : assets.star_dull_icon} />)
                                        })}
                                    </div>
                                    <p className="text-lg">(4)</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-2xl">MRP : <span className="font-medium">₹{Product.offerPrice}</span>  <span className="text-xl line-through">₹{Product.price}</span></p>
                                <p className="text-gray-500">(Inclusive of all taxes)</p>
                            </div>

                            <div>
                                <h1 className="about_prod">About Product:</h1>
                                <ul className="product_properties">
                                    {Product.description.map((property, idx) => {
                                        return <li key={idx}>{property}</li>
                                    })}
                                </ul>
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={() => addtoCart(Product._id)} className="add_cart_details">Add to Cart</button>

                                <button onClick={() => buyNow(Product._id)} className="buy_now">
                                    Buy Now</button>
                            </div>
                        </div>
                    </div>
                    {/* Related products */}
                    <div className="related_products">
                        <Sectionheading title="Related Products"/>
                        <div className='related_prod_container'>
                            {relatedProducts.map((product, idx) => {
                                return (<ProductCard key={idx} product={product} />)
                            })}
                        </div>
                    </div>
                </div>) : (
                <div className="loader_container">
                    <Loader className="loader" />
                </div>
            )}
        </div>
    )
}

export default ProductDetails