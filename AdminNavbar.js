import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

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
  

  const navButtons = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#1e1e1fff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const logoutStyle = {
    backgroundColor: "#dc3545",
    border: "none",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div style={navbarStyle}>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        HotByte Admin Dashboard
      </div>
      <div style={navButtons}>
        <button style={buttonStyle} onClick={() => navigate("/admin/users")}>
          Manage Users
        </button>
        <button style={buttonStyle} onClick={() => navigate("/admin/owners")}>
          Manage Owners
        </button>
        <button style={buttonStyle} onClick={() => navigate("/admin/restaurants")}>
          View Restaurants
        </button>
        <button style={buttonStyle} onClick={() => navigate("/admin/orders")}>
          View Orders
        </button>
        <button style={buttonStyle} onClick={() => navigate("/admin/categories")}>
          Manage Categories
        </button>
        <button style={logoutStyle} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
