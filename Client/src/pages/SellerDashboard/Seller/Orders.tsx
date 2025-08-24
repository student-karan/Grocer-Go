import { assets } from "../../../assets/assets";
import { SellerStates } from "../../../Helpers/types.ts"
import { SellerStore } from "../../../store/seller_dashboard/SellerStore.ts"

const Orders = () => {
    const { orders } = SellerStore() as SellerStates;
    return (
        <div className="dashboard_page">
            <h2 className="seller_heading">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index} className="seller_order_container">
                    <div className="flex gap-5">
                        <img className="boxicon" src={assets.box_icon} alt="boxIcon" />
                        <div className="flex flex-col items-center">
                            {order.items.map((item, index) => (
                                <div key={index} className="seller_order_name">
                                    <p className="font-normal">
                                        {item.product.name} <span className="text-orange-500"> x {item.quantity}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="seller_order_address">
                        <p className='font-medium mb-1'>
                            {order.address.firstName} {order.address.lastName}
                        </p>
                        <p>
                            {order.address.street},  {order.address.city},  {order.address.state},  {order.address.zipcode},  {order.address.country}
                        </p>
                        <p>{order.address.phone}</p>
                    </div>

                    <p className="seller_order_amount">${order.amount}</p>

                    <div className="payment_detals">
                        <p>Method: {order.paymentType}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Payment: {order.isPaid ?
                            <span className="text-green-600">Paid</span>
                            : <span className="text-red-600">Pending</span>}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Orders