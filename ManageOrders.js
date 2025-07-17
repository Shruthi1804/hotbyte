import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../admin/AdminNavbar';
import ownerBg from '../assets/ownerbg.jpg';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:8080/admin/orders", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data))
      .catch(() => alert("Failed to fetch orders."));
  }, []);

  const styles = {
    container: {
      padding: '40px 20px',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '30px'
    },
 
  container: {
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
    color: 'white',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 0 14px rgba(0,0,0,0.15)',
    borderRadius: '10px',
    overflow: 'hidden', 
    backgroundColor: '#ffffffcc',
  },
  th: {
    backgroundColor: '#77afb1ff', 
    color: 'white',
    padding: '14px',
    fontSize: '16px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
  },
  td: {
    padding: '12px 14px',
    fontSize: '15px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#dae6e5ff',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  };


  
  return (
    <div>
      <AdminNavbar />

      <div
        style={{
          backgroundImage:  `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${ownerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <div style={styles.container}>
          <h3 style={styles.title}>View All Orders</h3>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Owner Name</th>
                <th style={styles.th}>User ID</th>
                <th style={styles.th}>User Name</th>
                <th style={styles.th}>order ID</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map(o => (
                  <tr key={o.id}>
                    <td style={styles.td}>{o.ownerId}</td>
                     <td style={styles.td}>{o.ownerName}</td>
                    <td style={styles.td}>{o.userId}</td>
                     <td style={styles.td}>{o.userName}</td>
                     <td style={styles.td}>{o.orderId}</td>
                    <td style={styles.td}>₹{o.totalAmount}</td>
                    <td style={styles.td}>{o.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={styles.td} colSpan="7">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
