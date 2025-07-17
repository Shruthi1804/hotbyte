import React from "react";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
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
        HotByte User
      </div>
      <div style={navButtons}>
        <button style={buttonStyle} onClick={() => navigate("/userhome")}>
           Home
        </button>
        <button style={buttonStyle} onClick={() => navigate("/cart")}>
           View Cart
        </button>
        <button style={buttonStyle} onClick={() => navigate("/user/orders")}>
           Order History
        </button>
        <button style={buttonStyle} onClick={() => navigate("/profile")}>
           Profile
        </button>
        <button style={logoutStyle} onClick={logout}>
           Logout
        </button>
      </div>
    </div>
  );
};

export default UserNavbar;
