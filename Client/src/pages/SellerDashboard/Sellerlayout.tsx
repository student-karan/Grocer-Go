import { Link, Navigate, Route, Routes } from "react-router-dom";
import { assets } from "../../assets/assets.ts";
import { useEffect, useState } from "react";
import { SellerStore } from "../../store/seller_dashboard/SellerStore.ts";
import { SellerStates } from "../../Helpers/types.ts";
import Addproduct from "./Seller/addProduct/Addproduct.tsx";
import Orders from "./Seller/sellerOrders/Orders.tsx";
import ProductList from "./Seller/ProductList.tsx";

const Sellerlayout = () => {
    const sidebarLinks = [
        { name: "Add Product", path: "/seller/dashboard/add-product", icon: assets.add_icon },
        { name: "Product list", path: "/seller/dashboard/list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/dashboard/orders", icon: assets.order_icon },
    ];
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
    const { Logout, AuthSeller, setOrders, setProductsList } = SellerStore() as SellerStates;

    useEffect(() => {
        async function setup() {
            await setProductsList();
            await setOrders();
        }
        setup();
    }, []);
    return (
        <div className="w-full flex flex-col">
            <div className="seller_navbar">
                <Link to={"/"} className="web_logo">
                    <img className="h-12" src={assets.web_logo} alt="website logo" />
                    <p className="text-2xl text-orange-700">GrocerGo</p>
                </Link>
                <div className="seller_nav_end">
                    <p className="md:block hidden">Hi! Admin</p>
                    <button onClick={Logout} className='seller_logout'>Logout</button>
                </div>
            </div>
            <div className="seller_main_body">
                <div className="seller_sidebar">
                    {sidebarLinks.map((item, idx) => (
                        <Link to={item.path} key={idx} onClick={() => setSelectedComponent(item.name)}
                            className={`normal 
                            ${item.name === selectedComponent ? "selected" : "not_selected"}`}>
                            <img src={item.icon} alt="sidebar icon" />
                            <p className="md:block hidden text-center text-lg">{item.name}</p>
                        </Link>
                    ))}
                </div>
                <Routes>
                    <Route path="add-product" element={AuthSeller ? <Addproduct />
                        : <Navigate to="/seller/login" />} />

                    <Route path="orders" element={AuthSeller ? <Orders />
                        : <Navigate to="/seller/login" />} />

                    <Route path="list" element={AuthSeller ? <ProductList />
                        : <Navigate to="/seller/login" />} />
                </Routes>
            </div>
        </div>
    );
};

export default Sellerlayout