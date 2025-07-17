
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import categorybg from "../assets/categorybg.jpg";

const UserProfile = () => {
  const [user, setUser] = useState({ name: "", email: "", address: "", phoneNumber: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateProfile = () => {
    axios
      .put("http://localhost:8080/user/profile", user, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        alert("Profile updated!");
        setIsEditing(false);
      })
      .catch((err) => alert("Failed to update"));
  };

  const toggleEdit = () => {
    if (isEditing) {
      updateProfile();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${categorybg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <>
        <UserNavbar />
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div
            className="p-4 rounded"
            style={{
              width: "100%",
              maxWidth: "500px",
              backgroundColor: "#c7c9caff", 
              color: "#12181dff", 
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3 className="text-center mb-4">Your Profile</h3>
            <input
              name="name"
              className="form-control my-2"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Name"
            />
            <input
              name="address"
              className="form-control my-2"
              value={user.address}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Address"
            />
            <input
              name="phoneNumber"
              className="form-control my-2"
              value={user.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Phone Number"
            />
            <div className="text-center mt-3">
              <button className="btn btn-primary" onClick={toggleEdit}>
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default UserProfile;
