import { CartStore } from "../../store/main_app/CartStore.ts";
import { AppStore } from "../../store/main_app/AppStore.ts";
import { Address } from "../../Helpers/types.ts";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const PaymentTab = () => {
  const { paymentOption, setPaymentOption, AllCartItemsPrice, cartItems, setOrderCOD, setOrderstripe } = CartStore();
  const { showAddress, selectedAddress, addresses, setShowAddress, setSelectedAddress, getAddresses, AuthUser,setMyorders } = AppStore();

  async function placeOrder() {
    if (Object.keys(cartItems).length == 0 || !selectedAddress) {
      toast.error("You cart must not be null and your address should be valid.");
      return;
    }
    if (paymentOption === "COD") {
      await setOrderCOD();
    } else {
      await setOrderstripe();
    }
  }
  // Handle address selection using array index
  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value);
    if (selectedIndex >= 0 && selectedIndex < addresses.length) {
      setSelectedAddress(addresses[selectedIndex]);
      setShowAddress();
    }
  };

  useEffect(() => {
    if (AuthUser) {
      getAddresses();
    }
  }, [addresses]);

  useEffect(() => {
        setMyorders();
    }, [setOrderCOD, setOrderstripe, AuthUser]);

  return (
    <div className="payment_box">
      <h1 className="paymentbox_heading">Order Summary</h1>
      <div className="hd_line"></div>
      <h2 className="paymentbox_subheading">Delivery Address</h2>

      <div className="paymentbox_listings">
        <p className={selectedAddress ? "text-orange-500" : "text-gray-500"}>
          {selectedAddress ? (<Location address={selectedAddress} />)
            : "No address found"}
        </p>
        <button onClick={() => setShowAddress()} className="hover:underline text-sm">Change</button>
      </div>

      {showAddress ? (
        <div className="buyer_address">
          <select
            className="p-2"
            onChange={handleAddressChange}
            defaultValue=""
          >
            <option value="" disabled>Select an address</option>
            {addresses.map((address, idx) => (
              <option className="p-2" value={idx} key={idx}>
                <Location address={address} />
              </option>
            ))}
          </select>
          <Link className="add_address" to={"/add-address"}>Add Address</Link>
        </div>
      ) : (
        <div className="payment_method">
          <h2 className="text-lg font-medium">Payment Option</h2>
          <select className="p-2" onChange={(e) => setPaymentOption(e.target.value as "COD" | "Online")}>
            <option value="COD">Cash on delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>
      )}
      <div className="hd_line"></div>

      <div className="billings">
        <div className="paymentbox_listings">
          <p>Price</p>
          <p>{AllCartItemsPrice()}</p>
        </div>
        <div className="paymentbox_listings">
          <p>Shipping Fee</p>
          <p className="text-orange-500">Free</p>
        </div>
        <div className="paymentbox_listings">
          <p>Tax (2%)</p>
          <p>{AllCartItemsPrice() * 2 / 100}</p>
        </div>
        <div className="paymentbox_listings text-lg">
          <p>Total Amount</p>
          <p>{AllCartItemsPrice() + AllCartItemsPrice() * 2 / 100}</p>
        </div>
      </div>

      <button onClick={() => placeOrder()} className="paymentbox_btn">{paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}</button>
    </div>
  )
}

const Location = ({ address }: { address: Address }) => {
  return (<>{address.street}, {address.city}, {address.state}, {address.country}</>)
}

export default PaymentTab