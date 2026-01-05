import { SellerStates } from "../../../../Helpers/types.ts";
import { SellerStore } from "../../../../store/seller_dashboard/SellerStore.ts";
import EachOrder from "./eachOrder.tsx"

const Orders = () => {
  const { orders } = SellerStore() as SellerStates;
  return (
    <div className="dashboard_page">
      <h2 className="seller_heading">Orders List</h2>
      {orders.map((order, index) => (
        <EachOrder order={order} key={index} />
      ))}
    </div>
  );
};

export default Orders;
