
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../user/UserNavbar";
import userBg from '../assets/userbg.jpg'; 
const UserHome = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/categories", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelect = (event) => {
    const selectedCategoryId = event.target.value;
    if (selectedCategoryId !== "") {
      navigate(`/foods/${selectedCategoryId}`);
    }
  };

  return (
    <div
    style={{
      backgroundImage: `url(${userBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}
  >
    <>
      <UserNavbar />

      <div className="container mt-5 text-center">
        <h3 className="mb-4">Choose a Category</h3>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <select
              className="form-select form-select-lg mb-3"
              onChange={handleSelect}
              defaultValue=""
            >
              <option value="" disabled>
                -- Select a Category --
              </option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
    </div>
  );
};

export default UserHome;
