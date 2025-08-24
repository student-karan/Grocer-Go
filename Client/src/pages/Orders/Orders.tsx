import Sectionheading from "../../components/Sectionheading.tsx";
import { AppStates, orders } from "../../Helpers/types.ts";
import { AppStore } from "../../store/main_app/AppStore.ts";

const MyOrders = () => {
    const { myOrders} = AppStore() as AppStates;

    return (
        <div className="webpage md:px-10 px-2">
            <Sectionheading title="My Orders" />
            <div className="single_order">
                {myOrders.length === 0 && <p className="no_products_available">You hadn't placed any orders with us.</p>}
                {myOrders.map((order: orders) => {
                    return (
                        <div className="order_container">
                            <div className="order_row">
                                <p>Order id : {order._id}</p>
                                <p className="md:block hidden">Payment : {order.paymentType}</p>
                                <p className="sm:block hidden">Total Amount : &#8377;{order.amount}</p>
                            </div>
                            <div className="hd_line mb-2"></div>

                            {order.items.map((item, idx) => {
                                return (
                                    <div key={idx} className="order_row items-center">

                                        <div className="order_img_container">
                                            <img src={item.product.image[0]} alt="item image" className="order_img" />

                                            <div className="about_product">
                                                <p className="order_name">{item.product.name}</p>
                                                <p>Category: {item.product.category}</p>
                                            </div>
                                        </div>
                                        <div className="order_data">
                                            <p>Quantity : {item.quantity}</p>
                                            <p>Status : {order.status}</p>
                                            <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>

                                        <div className="order_amount">
                                            Amount : &#8377;{item.product.offerPrice * item.quantity}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders