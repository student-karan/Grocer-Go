import { assets } from "../assets/assets.ts";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppStore } from '../store/main_app/AppStore.ts';
import { CartStore } from "../store/main_app/CartStore.ts";
import { SearchStore } from "../store/main_app/SearchStore.ts";
import { ThemeStore } from "../store/main_app/ThemeStore.ts";
import { CartStates, searchStore, type AppStates, type themeStore } from '../Helpers/types.ts';
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

const Navbar = () => {
    const { AuthUser, LogOut } = AppStore() as AppStates;
    const { setTheme, theme } = ThemeStore() as themeStore;
    const { totalItems, setCart } = CartStore() as CartStates;
    const { search, setSearch } = SearchStore() as searchStore;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (search.length > 0) {
            navigate("/products/all");
        }
    }, [search]);

    useEffect(() => {
        setCart();
    }, [AuthUser]);
    return (
        <div className="navbar_body">
            <div className="navbar-start">
                <Link to={"/"} className="web_logo">
                    <img className="h-16" src={assets.web_logo} alt="website logo" />
                    <p className="text-3xl text-orange-700">GrocerGo</p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="nav_links_full_screen">
                    <li><Link to={"/seller/login"} tabIndex={0} className="font-tektur">Seller</Link></li>

                    <li><Link to={"/"} tabIndex={0} className={`font-tektur ${location.pathname === "/" && "nav_link"}`}>Home</Link></li>

                    <li><Link to={"/products/all"} tabIndex={0} className={`font-tektur ${location.pathname.includes("/products/all") && "nav_link"}`}>Products</Link></li>

                </ul>
            </div>
            <div className="navbar_end_full_screen">
                {/* search bar */}
                <div className="form-control relative">
                    <label htmlFor="Search" className="absolute left-2 top-4 size-4">
                        <img src={assets.search_icon} alt="search" />
                    </label>
                    <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} id="search" name="search" className="search_bar" />
                </div>
                {/* cart */}
                <Link tabIndex={0} to={"/cart"} role="button" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <img src={assets.cart_icon} alt="cart" className="size-7" />
                        <span className="badge badge-sm indicator-item">{totalItems()}</span>
                    </div>
                </Link>
                {AuthUser ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user_image"
                                    src={assets.profile_icon} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown_items">
                            <li><Link to={"/my-orders"} tabIndex={0} className={`font-tektur ${location.pathname.includes("/my-orders") && "nav_link"}`}>My Orders</Link></li>
                            <li><button onClick={LogOut} tabIndex={0} className="font-tektur">Logout</button></li>
                        </ul>
                    </div>
                )
                    :
                    (<Link to={"/login"} className="login">Login</Link>)
                }
                {theme == "dark" ?
                    <button onClick={() => setTheme("light")} className="theme"><Sun className="text-white" /></button>
                    :
                    <button onClick={() => setTheme("dark")} className="theme"><Moon className="text-base-100" /></button>}
            </div>
            <div className="navbar-end flex gap-4 lg:hidden">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <img src={assets.menu_icon} alt="menu-icon" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown_items">
                        <li><Link to={"/seller/login"} tabIndex={0} className="font-tektur">Seller</Link></li>

                        <li><Link to={"/"} tabIndex={0} className={`font-tektur ${location.pathname === "/" && "nav_link"}`}>Home</Link></li>

                        <li><Link to={"/products/all"} tabIndex={0} className={`font-tektur ${location.pathname.includes("/products/all") && "nav_link"}`}>Products</Link></li>

                        {AuthUser ? <li><button onClick={LogOut} tabIndex={0} className="font-tektur">LogOut</button></li>
                            :
                            <li><Link to={"/login"} tabIndex={0} className="font-tektur focus:nav_link">Login</Link></li>}

                        <li>
                            <div tabIndex={0} onClick={() => navigate("/cart")} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <img src={assets.cart_icon} alt="cart" className="size-7" />
                                    <span className="badge badge-sm indicator-item">{totalItems()}</span>
                                </div>
                            </div>
                        </li>

                        <li><div className="form-control relative">
                            <label htmlFor="Search" className="absolute left-6 top-6 size-4">
                                <img src={assets.search_icon} alt="search" />
                            </label>
                            <input type="text" placeholder="Search" id="Search" name="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="input input-bordered md:w-auto pl-8" />
                        </div></li>
                    </ul>
                </div>
                {AuthUser && (<div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="user_image"
                                src={assets.profile_icon} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="dropdown_items">
                        <li><Link to={"/my-orders"} tabIndex={0} className={`font-tektur ${location.pathname.includes("/my-orders") && "nav_link"}`}>My Orders</Link></li>
                        <li><Link to={"/logout"} tabIndex={0} className="font-tektur">Logout</Link></li>
                    </ul>
                </div>)}
                {theme == "dark" ?
                    <button onClick={() => setTheme("light")} className="theme"><Sun className="text-white" /></button>
                    :
                    <button onClick={() => setTheme("dark")} className="theme"><Moon className="text-base-100" /></button>}
            </div>
        </div>
    )
}
export default Navbar