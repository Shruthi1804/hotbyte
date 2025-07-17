import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/registerpage.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Login failed: " + errorText);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      if (data.id || data.userId) {
        localStorage.setItem("userId", data.id || data.userId);
      }

      // Redirect based on role
      if (data.role === "ADMIN") navigate("/adminhome");
      else if (data.role === "OWNER") navigate("/ownerhome");
      else navigate("/userHome");

    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    formBox: {
    backgroundColor: "rgba(134, 131, 131, 0.95)",
      padding: "40px",
      borderRadius: "10px",
      width: "400px",
      boxShadow: "0 0 15px rgba(0,0,0,0.3)",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#0d0e0eff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    link: {
      marginTop: "12px",
      textAlign: "center",
      fontSize: "14px",
      color: "black",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.formBox}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
<div style={{ marginTop: "15px", textAlign: "center", color: "#fff" }}>
    New User?{" "}
    <span
      onClick={() => navigate("/register")}
      style={{ color: "#080909ff", textDecoration: "underline", cursor: "pointer" }}
    >
      Register
    </span>
    
    </div>
      </form>
    </div>
  );
};

export default Login;
