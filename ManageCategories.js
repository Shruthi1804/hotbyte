import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../admin/AdminNavbar';
import ownerBg from '../assets/ownerbg.jpg';

const ManageCategories = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/category", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data);
    } catch (err) {
      alert(" Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!name) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/admin/category", {
        name,
        description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(" Category added successfully!");
      setName("");
      setDescription("");
      fetchCategories();
    } catch (err) {
      alert(" Failed to add category.");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`http://localhost:8080/admin/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(" Deleted successfully!");
      fetchCategories();
    } catch (err) {
      alert(" Failed to delete category.");
    }
  };

  // Inline CSS Styles
  const containerStyle = {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#c1dfdfff",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)"
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "25px"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  };

  const tableStyle = {
    marginTop: "30px",
    width: "100%",
    borderCollapse: "collapse"
  };

  const thtdStyle = {
    padding: "12px",
    border: "1px solid #ddd"
  };

  const deleteBtn = {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer"
  };

  return (
    <div>
      <AdminNavbar />
      <div
        style={{
          backgroundImage:  `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${ownerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          paddingTop: '30px'
        }}
      >
        <div style={containerStyle}>
          <h3 style={titleStyle}>Add New Category</h3>

          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

         
          <button onClick={handleAddCategory} style={buttonStyle}>
            Add Category
          </button>

    
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thtdStyle}>ID</th>
                <th style={thtdStyle}>Name</th>
                <th style={thtdStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.categoryId}>
                  <td style={thtdStyle}>{cat.categoryId}</td>
                  <td style={thtdStyle}>{cat.name}</td>
                  <td style={thtdStyle}>
                    <button style={deleteBtn} onClick={() => handleDeleteCategory(cat.categoryId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
