import CartProducts from "./CartProducts.tsx";
import PaymentTab from "./PaymentTab.tsx";
import { CartStore } from "../../store/main_app/CartStore.ts";
import { CartStates } from "../../Helpers/types.ts";
const CartPage = () => {
  const {totalItems} = CartStore() as CartStates;
  return (
    <div className="webpage">
      <div className={`cartPage ${totalItems() > 0 && "md:justify-center"}`}>
        <CartProducts />
        {totalItems() > 0 && <PaymentTab/>}
      </div>
    </div >
  );
};

export default CartPage;