import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ownerBg from '../assets/ownerbg.jpg';

const AdminHome = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    if (activeTab === "users") {
      axios.get("http://localhost:8080/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUsers(res.data))
      .catch(err => alert("Failed to fetch users"));
    }
  }, [activeTab, token]);

  const navbarStyle = {
    backgroundColor: '#383d42ff',
    padding: '12px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  const navTitle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginRight: '30px',
    whiteSpace: 'nowrap',
  };

  const navButtonsContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center',
    marginTop: '10px',
  };

  const navButton = {
    backgroundColor: '#101214ff',
    color: 'white',
    padding: '8px 16px',
    fontSize: '15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  };

  const logoutButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 16px',
    fontSize: '15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginLeft: 'auto',
  };

  const mainContainer = {
    padding: '40px 20px',
    maxWidth: '1100px',
    margin: '0 auto',
    color: 'white',
  };

  const tableContainer = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
   backgroundColor: '#77afb1ff',
    color: 'white',
    padding: '14px',
    fontSize: '16px',
    textAlign: 'left',
    borderBottom: '1px solid #dee2e6',
  };

  const tdStyle = {
    padding: '12px 14px',
    fontSize: '15px',
    color: '#333',
    backgroundColor: '#dae6e5ff',
    borderBottom: '1px solid #eee',
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${ownerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div>
        
        <div style={navbarStyle}>
          <div style={navTitle}> HotByte Admin Dashboard</div>
          <div style={navButtonsContainer}>
            <button style={navButton} onClick={() => setActiveTab("users")}>Manage Users</button>
            <button style={navButton} onClick={() => navigate("/admin/owners")}>Manage Owners</button>
            <button style={navButton} onClick={() => navigate("/admin/restaurants")}>View Restaurants</button>
            <button style={navButton} onClick={() => navigate("/admin/orders")}>View Orders</button>
            <button style={navButton} onClick={() => navigate("/admin/categories")}>Manage Categories</button>
            <button style={logoutButtonStyle} onClick={handleLogout}>Logout</button>
          </div>
        </div>

    
        <div style={mainContainer}>
          {activeTab === "users" && (
            <div>
              <h3 style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>All Registered Users</h3>
              {users.length === 0 ? (
                <p style={{ color: 'white' }}>No users found.</p>
              ) : (
                <div style={tableContainer}>
                  <table style={tableStyle}>
                    <thead>
                      <tr>
                        <th style={thStyle}>User ID</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.userId}>
                          <td style={tdStyle}>{user.userId}</td>
                          <td style={tdStyle}>{user.name}</td>
                          <td style={tdStyle}>{user.email}</td>
                          <td style={tdStyle}>{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
