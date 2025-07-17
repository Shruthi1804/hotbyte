import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/registerpage.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    role: "USER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Registered Successfully!");
        
        navigate("/login", {
          state: {
            email: formData.email,
            password: formData.password,
          },
        });
      } else {
        const error = await res.text();
        alert("Registration failed: " + error);
      }
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
    form: {
      backgroundColor: "rgba(134, 131, 131, 0.95)",
      padding: "40px",
      borderRadius: "10px",
      width: "600px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "6px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      resize: "vertical",
      minHeight: "60px",
    },
    select: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "6px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#1d201eff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          style={styles.textarea}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          style={styles.input}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="USER">User</option>
          <option value="OWNER">Restaurant Owner</option>
        </select>

        <button type="submit" style={styles.button}>
          Register
        </button>
       
  <div style={{ marginTop: "15px", textAlign: "center", color: "#fff" }}>
    Already a user?{" "}
    <span
      onClick={() => navigate("/login")}
      style={{ color: "#080909ff", textDecoration: "underline", cursor: "pointer" }}
    >
      Login
    </span>
  </div>
      </form>
    </div>
  );
};

export default Register;
