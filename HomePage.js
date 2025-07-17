import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/homepage.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(88, 85, 85, 0.4)),url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
    },
    heading: {
      fontSize: "3rem",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    buttonContainer: {
      display: "flex",
      gap: "20px",
    },
    button: {
      padding: "12px 24px",
      fontSize: "16px",
      backgroundColor: "#1b1c1dff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to HotByte</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/register")}>
          Register
        </button>
        <button style={styles.button} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
