import React, { useState, useEffect } from "react";
import axios from "axios";
import OwnerNavbar from "../owner/OwnerNavbar";
import restaurantbg from '../assets/restaurantbg.jpg';
const AddFoodItem = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    imageUrl: ""
  });

  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");
  const ownerId = localStorage.getItem("userId");

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get("http://localhost:8080/owner/categories", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(catRes.data);


      } catch (err) {
        alert("Failed to load categories");
      }
    };

    fetchData();
  }, [token, ownerId]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:8080/owner/food", {
      name: form.name,
      description: form.description,
      price: form.price,
      imageUrl: form.imageUrl,
      category: {
        categoryId: form.categoryId 
      }
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Food item added!");
    setForm({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      imageUrl: ""
    });
  } catch (err) {
    console.error(err);
    alert("Failed to add food item.");
  }
};


  return (
     <div
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)) ,url(${restaurantbg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}
  >
     <div>
      <OwnerNavbar />
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h3 style={{ marginBottom: "20px" }}>Add Food Item</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>Add Food</button>
      </form>
    </div>
    </div>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "80px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  }
};

export default AddFoodItem;
