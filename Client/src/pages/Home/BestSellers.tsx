import ProductCard from '../../components/ProductCard.tsx';
import { type product } from '../../Helpers/types.ts';

const BestSellers = ({ products }: { products: product[] }) => {
    let BestProducts = products.filter((product) => product.inStock);
    if (!products || !Array.isArray(products)) {
        return <div>Loading products...</div>;
    }
    return (
        <div className="section_body">
            <div className="section_heading_container">
                <h1 className="section_heading">Best Sellers</h1>
                <div className="heading_underline"></div>
            </div>
            <div className='all_products'>
                {BestProducts.map((product, idx) => {
                    return (<ProductCard key={idx} product={product} />)
                })}
            </div>
        </div>
    )
}


export default BestSellers