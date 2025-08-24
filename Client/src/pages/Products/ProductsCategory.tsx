import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { product } from "../../Helpers/types.ts";
import ProductCard from "../../components/ProductCard.tsx";
import { categories } from "../../assets/assets.ts";
import Sectionheading from "../../components/Sectionheading.tsx";
import { ProductStore } from "../../store/main_app/ProductStore.ts";

const ProductsCategory = () => {
    const { products } = ProductStore();
    const { category } = useParams();
    const [filteredProducts, setFilteredProducts] = useState<product[]>([]);
    const searchCategory = categories.find(Category => Category.path === category);
    useEffect(() => {
        if (products.length > 0) {
            let categoryProducts = products.filter(product => product.category === category && product.inStock);
            setFilteredProducts(categoryProducts);
        }
    }, [category]);
    return (
        <div className="section_body">
            <Sectionheading title={searchCategory ? searchCategory.text : "All Products"} />
            {filteredProducts.length == 0 && <p className="no_products_available">The product you're looking for isn't available right now.</p>}
            {filteredProducts.length > 0 && <div className="all_products">
                {filteredProducts.map((product: product, idx) => {
                    return (<ProductCard key={idx} product={product} />)
                })}
            </div>}
        </div>
    )
}

export default ProductsCategory