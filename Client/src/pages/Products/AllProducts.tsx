import { useMemo } from "react";
import ProductCard from "../../components/ProductCard.tsx";
import { SearchStore } from "../../store/main_app/SearchStore.ts";
import { ProductStore } from "../../store/main_app/ProductStore.ts";
import { type product } from "../../Helpers/types.ts";
import Sectionheading from "../../components/Sectionheading.tsx";

const AllProducts = () => {
    const { products } = ProductStore();
    const { search } = SearchStore();

    const filteredProducts = useMemo(() => {
        if (search.length >= 1) {
            const searchedProducts = products.filter((product:product) => product.name.toLowerCase().includes(search));
            return searchedProducts.filter((product:product) => product.inStock);
        }
        return products.filter((product:product) => product.inStock);
    }, [search, products]);

    return (
        <div className="section_body">
            <Sectionheading title="All Products"/>
            {filteredProducts.length == 0 && <p className="no_products_available">The product you're looking for isn't available right now.</p>}
            <div className="all_products">
                {filteredProducts.map((product: product, idx:number) => {
                    return (<ProductCard key={idx} product={product} />)
                })}
            </div>
        </div>
    )
}



export default AllProducts