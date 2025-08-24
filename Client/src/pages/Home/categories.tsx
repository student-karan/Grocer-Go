import { type CategorySection, type Category, themeStore } from "../../Helpers/types.ts"
import { Link } from "react-router-dom"
import { ThemeStore } from "../../store/main_app/ThemeStore.ts"

const Categories = ({ categories }: CategorySection) => {
    return (
        <div className="section_body">
            <div className="section_heading_container">
                <h1 className="section_heading">Categories</h1>
                <div className="heading_underline"></div>
            </div>
            <div className="all_categories">
                {categories.map((category,idx) => {
                    return (
                        <CategorySection key={idx} category={category}/>
                    )
                })}
            </div>
        </div>
    )
}
const CategorySection = ({ category }: { category:Category }) => {
    const { theme } = ThemeStore() as themeStore;
    return (
        <Link to={`/products/${category.path}`} onClick={()=>scrollTo(0,0)} className={`category_body ${theme === "light" && "border-2 border-black"}`} style={{backgroundColor:category.bgColor}}>
            <img src={category.image} alt="category" className="product_img" />
            <h1 className="text-black">{category.text}</h1>
        </Link>
    )
}
export default Categories