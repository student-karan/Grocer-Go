import Mainbanner from "./Mainbanner"
import { categories } from "../../assets/assets.ts";
import Categories from "./categories.tsx";
import BestSellers from "./BestSellers.tsx";
import Bottombanner from "./Bottombanner.tsx";
import Newsletter from "./Newsletter.tsx";
import { ProductStore } from "../../store/main_app/ProductStore.ts";

const Homepage = () => {
  const { products } = ProductStore();

  return (
    <div className="webpage">
      <Mainbanner />
      <Categories categories={categories} />
      <BestSellers products={products} />
      <Bottombanner />
      <Newsletter />
    </div>
  )
}

export default Homepage