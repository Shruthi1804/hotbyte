
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import foodbg from "../assets/foodbg.jpg";

const ViewFoods = () => {
  const { categoryId } = useParams();
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/foods/${categoryId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setFoods(res.data);
        const defaultQuantities = {};
        res.data.forEach((food) => (defaultQuantities[food.foodId] = 1));
        setQuantities(defaultQuantities);
      })
      .catch((err) => console.log(err));
  }, [categoryId]);

  const handleQuantityChange = (foodId, value) => {
    setQuantities({ ...quantities, [foodId]: value });
  };

  const addToCart = (foodId) => {
    const quantity = quantities[foodId] || 1;
    axios
      .post(`http://localhost:8080/user/cart`, null, {
        params: { foodId, quantity },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => alert("Item added to cart"))
      .catch((err) => alert("Failed to add to cart"));
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${foodbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        paddingBottom: "40px",
      }}
    >
      <UserNavbar />
      <div className="container mt-4">
        <h3 className="mb-4 text-center">Food Items</h3>
        <div className="row">
          {foods.map((food) => (
            <div className="col-md-4 d-flex align-items-stretch" key={food.foodId}>
              <div className="card mb-4 shadow" style={{ width: "100%" }}>
                <img
                  src={food.imageUrl}
                  className="card-img-top"
                  alt={food.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text">{food.description}</p>
                  <p className="card-text">₹{food.price}</p>
                  <div className="d-flex align-items-center mb-2">
                    <label className="me-2">Qty:</label>
                    <input
                      type="number"
                      className="form-control"
                      style={{ width: "80px" }}
                      min={1}
                      value={quantities[food.foodId] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          food.foodId,
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <button
                    className="btn btn-success mt-auto"
                    onClick={() => addToCart(food.foodId)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewFoods;
