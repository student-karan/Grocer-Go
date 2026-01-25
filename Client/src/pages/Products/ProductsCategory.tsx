import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { product } from "../../Helpers/types.ts";
import ProductCard from "../../components/ProductCard.tsx";
import Sectionheading from "../../components/Sectionheading.tsx";
import { ProductStore } from "../../store/main_app/ProductStore.ts";

const ProductsCategory = () => {
  const { products } = ProductStore();
  const { category } = useParams();
  const SearchedCategory =
    category == undefined
      ? ""
      : category.charAt(0).toUpperCase() + category.substring(1);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product: product) =>
        product.category == SearchedCategory && product.inStock,
    );
  }, [products, SearchedCategory]);

  return (
    <div className="section_body">
      <Sectionheading
        title={category == undefined ? "Products" : SearchedCategory}
      />
      {filteredProducts.length == 0 && (
        <p className="no_products_available">
          The product you're looking for isn't available right now.
        </p>
      )}
      {filteredProducts.length > 0 && (
        <div className="all_products">
          {filteredProducts.map((product: product, idx) => {
            return <ProductCard key={idx} product={product} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsCategory;
