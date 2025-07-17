
import React, { useEffect, useState } from "react";
import axios from "axios";
import OwnerNavbar from "../owner/OwnerNavbar";
import restaurantbg from '../assets/restaurantbg.jpg';
const OwnerProfile = () => {
  const [owner, setOwner] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
 
    axios
      .get("http://localhost:8080/owner/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOwner(res.data))
      .catch((err) => console.error("Failed to fetch owner", err));

    axios
      .get("http://localhost:8080/owner/restaurant", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error("Failed to fetch restaurant", err));
  }, []);

  return (
     <div
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${restaurantbg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}
  >
     <div>
      <OwnerNavbar />
    <div className="container mt-4">
      <h2 className="mb-4">Owner Profile</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-dark text-white">Owner Details</div>
        <div className="card-body">
          <p><strong>Name:</strong> {owner.name}</p>
          <p><strong>Email:</strong> {owner.email}</p>
          <p><strong>Phone:</strong> {owner.phoneNumber}</p>
          <p><strong>Address:</strong> {owner.address}</p>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">Restaurant Details</div>
        <div className="card-body">
          <p><strong>Restaurant Name:</strong> {restaurant.name || "Not added yet"}</p>
          <p><strong>Address:</strong> {restaurant.address || "N/A"}</p>
          <p><strong>Description:</strong> {restaurant.description || "N/A"}</p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default OwnerProfile;
