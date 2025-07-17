
import React, { useState } from 'react';
import axios from 'axios';
import OwnerNavbar from "../owner/OwnerNavbar";
import restaurantbg from '../assets/restaurantbg.jpg';
const AddRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    description: '',
  });

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const ownerId = localStorage.getItem('ownerId'); 

    try {
      const res = await axios.post(
        `http://localhost:8080/owner/restaurant`,
        restaurant,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Restaurant added successfully!');
      setRestaurant({ name: '', address: '', description: '' });
    } catch (error) {
      alert('Failed to add restaurant');
    }
  };

  const formStyle = {
    width: '400px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  return (
     <div
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)) , url(${restaurantbg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}
  >
     <div>
      <OwnerNavbar />
    <form style={formStyle} onSubmit={handleSubmit}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Your Restaurant</h3>
      <input
        type="text"
        name="name"
        placeholder="Restaurant Name"
        value={restaurant.name}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={restaurant.address}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={restaurant.description}
        onChange={handleChange}
        style={{ ...inputStyle, height: '100px' }}
        required
      ></textarea>
      <button type="submit" style={buttonStyle}>Add Restaurant</button>
    </form>
    </div>
    </div>
  );
};

export default AddRestaurant;
