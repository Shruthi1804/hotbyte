
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../user/UserNavbar";
import cartBg from '../assets/cartbg.jpg'; 

const Cart = () => {
  const [items, setItems] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [successMessage, setSuccessMessage] = useState(""); 

  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  const loadCart = () => {
    axios.get("http://localhost:8080/user/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setItems(res.data))
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCart();
  }, []);

  
  const removeItem = (cartId) => {
    axios.delete(`http://localhost:8080/user/cart/${cartId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => loadCart())
    .catch((err) => console.log(err));
  };

  const placeOrder = () => {
    axios.post("http://localhost:8080/user/order", {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setOrderId(res.data.orderId);
    })
    .catch((err) => {
      alert("Failed to place order");
      console.log(err);
    });
  };

  const makePayment = () => {
    axios.post(`http://localhost:8080/user/payment/${orderId}`, null, {
      params: {
        method: paymentMethod,
        status: "COMPLETED"
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      setSuccessMessage("✅ Order placed successfully! You will receive your order in 30 minutes.");
      setTimeout(() => {
        navigate("/user/orders");
      }, 3000); 
    })
    .catch((err) => {
      alert("Payment failed");
      console.log(err);
    });
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${cartBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      <>
        <UserNavbar />
        <div className="container mt-4">
          <h3>Your Cart</h3>

          {items.length === 0 ? (
            <p className="mt-3">🛒 Your cart is empty.</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.cartId} className="card mb-3 p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{item.foodName}</h5>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ₹{item.foodPrice}</p>
                    </div>
                    <button className="btn btn-danger" onClick={() => removeItem(item.cartId)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {!orderId ? (
                <button className="btn btn-success mt-3" onClick={placeOrder}>
                  Place Order
                </button>
              ) : (
                <div className="mt-4">
                  <h5>Select Payment Method</h5>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label">Cash on Delivery (COD)</label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="paymentMethod"
                      value="ONLINE"
                      checked={paymentMethod === "ONLINE"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label">Online Payment</label>
                  </div>
                  <button className="btn btn-primary" onClick={makePayment}>
                    Make Payment
                  </button>
                </div>
              )}
            </>
          )}

    
          {successMessage && (
            <div className="alert alert-success mt-4 text-center">
              {successMessage}
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default Cart;
