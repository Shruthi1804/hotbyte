
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import orderhistorybg from "../assets/orderhistorybg.jpg"
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/user/order-history", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
     <div
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${orderhistorybg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
       color: 'white'
    }}
  >
    <>
      <UserNavbar />
    <div className="container mt-2">
      <h3> Your Order History</h3>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="card mb-5 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Order ID: #{order.orderId}</h5>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Restaurant:</strong> {order.restaurantName}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>

              <h6 className="mt-3">Items:</h6>
              <ul className="list-group list-group-flush">
                {order.items.map((item, index) => (
                  <li key={index} className="list-group-item">
                     {item.foodName} — Qty: {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        ))
      )}
    </div>
    </>
    </div>
  );
};

export default OrderHistory;
