import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import ProductPage from "./pages/Products/ProductPage.tsx";
import Homepage from "./pages/Home/Homepage.js";
import SignupPage from "./pages/Signup/SignupPage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import CartPage from "./pages/Cart/CartPage.tsx";
import Addaddress from "./pages/Address/Addaddress.tsx";
import { ThemeStore } from "./store/main_app/ThemeStore.ts";
import { ProductStore } from "./store/main_app/ProductStore.ts";
import { AppStore } from "./store/main_app/AppStore.ts";
import { type themeStore, type AppStates, SellerStates } from "./Helpers/types.js";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import MyOrders from "./pages/Orders/Orders.tsx";
import SellerPage from "./pages/SellerDashboard/SellerPage.tsx";
import { SellerStore } from "./store/seller_dashboard/SellerStore.ts";
import Loader from "./pages/Cart/Loader.tsx";

const App = () => {
  const { theme } = ThemeStore() as themeStore;
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const { AuthUser, setUser } = AppStore() as AppStates;
  const { setSeller, setProductsList, AuthSeller } = SellerStore() as SellerStates;
  const { loadproducts } = ProductStore();

  useEffect(() => {
    async function rerender() {
      await loadproducts();
      await setUser();
      await setSeller();
      if (AuthSeller) {
        await setProductsList();
      }
    }
    rerender();
  }, []);


  // Scroll to top on route change
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div ref={ref} className={location.pathname.includes("seller") ? "w-full" : "main_container"} data-theme={theme}>
        {location.pathname.includes("seller") ? null : <Navbar />}
        <div className={location.pathname.includes("seller") ? "w-full bg-white min-h-screen" : "w-full mt-5"}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={AuthUser ? <Navigate to="/" /> : <SignupPage />} />
            <Route path="/login" element={AuthUser ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/add-address" element={AuthUser ? <Addaddress /> : <Navigate to="/signup" />} />
            <Route path="/loader" element={<Loader/>} />
            <Route path="/my-orders" element={AuthUser ? <MyOrders /> : <Navigate to="/signup" />} />
            <Route path="/products/*" element={<ProductPage />} />
            <Route path="/seller/*" element={<SellerPage />} />
          </Routes>
        </div>
        {location.pathname.includes("seller") ? null : <Footer />}
      </div>
    </div>
  )
}

export default App