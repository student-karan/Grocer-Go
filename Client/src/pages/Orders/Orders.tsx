import { useEffect } from "react";
import Sectionheading from "../../components/Sectionheading.tsx";
import { AppStates, CartStates, orders } from "../../Helpers/types.ts";
import { AppStore } from "../../store/main_app/AppStore.ts";
import { CartStore } from "../../store/main_app/CartStore.ts";

const MyOrders = () => {
  const { myOrders, setMyorders, AuthUser } = AppStore() as AppStates;
  const { setOrderCOD, setOrderstripe } = CartStore() as CartStates;

  useEffect(() => {
    if(AuthUser){
      setMyorders();
    }
  }, [setOrderCOD, setOrderstripe]);

  return (
    <div className="webpage md:px-10">
      <Sectionheading title="My Orders" />
      <div className="single_order">
        {myOrders.length === 0 && (
          <p className="no_products_available">
            You hadn't placed any orders with us.
          </p>
        )}
        {myOrders.map((order: orders) => {
          return (
            <div className="order_container">
              <div className="order_row">
                <div className="flex flex-col gap-2">
                    <p>Order id : {order._id}</p>
                    <p className="md:hidden block">Status : {order.status}</p>
                </div>
                <p className="md:block hidden">Payment : {order.paymentType}</p>
                <button onClick={setMyorders}  className="track_order">Track Order</button>
              </div>
              <div className="hd_line mb-2"></div>

              {order.items.map((item, idx) => {
                return (
                  <div key={idx} className="order_row items-center">
                    <div className="order_img_container">
                      <img
                        src={item.product.image[0]}
                        alt="item image"
                        className="order_img"
                      />

                      <div className="about_product">
                        <p className="order_name">{item.product.name}</p>
                        <p>Category: {item.product.category}</p>
                      </div>
                    </div>
                    <div className="order_data">
                      <p>Quantity : {item.quantity}</p>
                      <p>Status : {order.status}</p>
                      <p>
                        Date : {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="order_amount">
                        Amount : &#8377;
                        {item.product.offerPrice * item.quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
