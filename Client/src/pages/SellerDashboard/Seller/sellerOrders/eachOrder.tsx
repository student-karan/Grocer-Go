import {ChangeEvent, useState} from 'react';
import { assets } from '../../../../assets/assets';
import { orders, SellerStates } from '../../../../Helpers/types';
import { SellerStore } from '../../../../store/seller_dashboard/SellerStore';

const EachOrder = ({order,key}:{order:orders,key:number}) => {
    const [status,setStatus] = useState<string>(order.status);
    const {updateOrderStatus} = SellerStore() as SellerStates;

    const UpdateStatus = async (event:ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        await updateOrderStatus(order._id, newStatus);
    }
  return (
    <div className="seller_order_container">
          <div key={key} className="seller_order_details">
            <div className="flex flex-col md:flex-row gap-6">
              <img className="boxicon" src={assets.box_icon} alt="boxIcon" />
              <div className="flex gap-5 flex-col items-start">
                <div className="flex flex-col">
                  {order.items.map((item, index) => (
                    <div key={index} className="seller_order_name">
                      <p className="font-normal">
                        {item.product.name}{" "}
                        <span className="text-orange-500">
                          {" "}
                          x {item.quantity}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="seller_order_address">
                  <i className="font-medium mb-1">
                    {order.address.firstName.charAt(0).toUpperCase() + order.address.firstName.slice(1)}{" "} 
                    {order.address.lastName.charAt(0).toUpperCase() + order.address.lastName.slice(1)}
                  </i>
                  <p>
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}, {order.address.zipcode},{" "}
                    {order.address.country}
                  </p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
            </div>

            <div className="payment_detals">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>
                Payment:{" "}
                {order.isPaid ? (
                  <span className="text-green-600">Paid</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </p>
            </div>
            <p className="seller_order_amount">${order.amount}</p>
          </div>
          {order.isPaid && (
            <select className="seller_order_status" onChange={UpdateStatus} value={status}>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          )}
        </div>
  )
}

export default EachOrder
