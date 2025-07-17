

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";

import AdminHome from "./admin/AdminHome";
import ManageUsers from "./admin/ManageUsers";
import ManageOwners from "./admin/ManageOwners";
import ManageRestaurants from "./admin/ManageRestaurants";
import ManageOrders from "./admin/ManageOrders";
import ManageCategories from "./admin/ManageCategories";

import OwnerHome from "./owner/OwnerHome";
import AddRestaurant from "./owner/AddRestaurant";
import AddFoodItem from "./owner/AddFoodItem";
import ViewMenu from "./owner/ViewMenu";
import ViewOrders from "./owner/ViewOrders";
import OwnerProfile from "./owner/OwnerProfile";

import UserHome from "./user/UserHome";
import FoodList from "./user/ViewFoods";
import Cart from "./user/Cart";
import OrderHistory from "./user/OrderHistory";
import UserProfile from "./user/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/owners" element={<ManageOwners />} />
        <Route path="/admin/restaurants" element={<ManageRestaurants />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/categories" element={<ManageCategories />} />

        
        <Route path="/ownerhome" element={<OwnerHome />} />
        <Route path="/owner/addrestaurant" element={<AddRestaurant />} />
        <Route path="/owner/addfood" element={<AddFoodItem />} />
        <Route path="/owner/menu" element={<ViewMenu />} />
        <Route path="/owner/orders" element={<ViewOrders />} />
         <Route path="owner/profile" element={<OwnerProfile />} />

        <Route path="/userhome" element={<UserHome />} />
        <Route path="/foods/:categoryId" element={<FoodList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/orders" element={<OrderHistory />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
