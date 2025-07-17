import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../admin/AdminNavbar'; 
import ownerBg from '../assets/ownerbg.jpg';
const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/admin/restaurants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRestaurants(res.data);
    } catch (err) {
      alert("Failed to fetch restaurants.");
    }
  };

  useEffect(() => {
    fetchRestaurants();
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
  }
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
        <h3 style={styles.title}>All Registered Restaurants</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Owner ID</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.length > 0 ? (
              restaurants.map((r) => (
                <tr key={r.restaurantId}>
                  <td style={styles.td}>{r.restaurantId}</td>
                  <td style={styles.td}>{r.name}</td>
                  <td style={styles.td}>{r.address}</td>
                  <td style={styles.td}>{r.description}</td>
                  <td style={styles.td}>{r.ownerId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="5">No restaurants found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ManageRestaurants;
