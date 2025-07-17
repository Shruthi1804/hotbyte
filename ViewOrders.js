import React, { useEffect, useState } from "react";
import axios from "axios";
import OwnerNavbar from "../owner/OwnerNavbar";
import restaurantbg from '../assets/restaurantbg.jpg';
const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusOptions] = useState(["PENDING", "ACCEPTED", "PREPARING", "DELIVERED"]);

  const token = localStorage.getItem("token");

 
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/owner/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      alert(" Failed to fetch orders");
      console.error(err);
    }
  };

  
  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/owner/orders/${orderId}/status?status=${newStatus}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order status updated!");
      fetchOrders();
    } catch (err) {
      alert(" Failed to update order status");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
     <div
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${restaurantbg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}
  >
     <div>
      <OwnerNavbar />
    <div className="container mt-5">
      <h2 className="mb-4">🍽️ Manage Restaurant Orders</h2>

      {orders.length === 0 ? (
        <p className="text-muted">No orders found.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total ₹</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.userName || "N/A"}</td>
                <td>₹{order.totalAmount}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) => updateStatus(order.orderId, e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
    </div>
  );
};

export default ViewOrders;
