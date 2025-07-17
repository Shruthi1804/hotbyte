import React, { useEffect, useState } from "react";
import axios from "axios";
import OwnerNavbar from "../owner/OwnerNavbar";
import restaurantbg from '../assets/restaurantbg.jpg';
const ViewMenu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const token = localStorage.getItem("token");

  
  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:8080/owner/food", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFoodItems(res.data);
    } catch (err) {
      alert("Failed to fetch menu");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [token]);


  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this food item?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/owner/food/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Food item deleted!");
      fetchMenu();
    } catch (err) {
      alert("Failed to delete food item.");
      console.error(err);
    }
  };

  return (
     <div
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${restaurantbg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      color:"black"
    }}
  >
     <div>
      <OwnerNavbar />
    <div style={styles.container}>
      <h2 style={styles.heading}>My Restaurant Menu</h2>
      {foodItems.length === 0 ? (
        <p>No food items found.</p>
      ) : (
        <div style={styles.grid}>
          {foodItems.map((item) => (
            <div key={item.foodId} style={styles.card}>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={styles.image}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(item.foodId)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
  backgroundColor: "#fff",          
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "15px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  color: "#333"                        
},
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "10px"
  },
  deleteBtn: {
    padding: "8px 12px",
    marginTop: "10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default ViewMenu;
