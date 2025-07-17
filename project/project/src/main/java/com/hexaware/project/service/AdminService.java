package com.hexaware.project.service;

import com.hexaware.project.dto.AdminOrderDTO;
import com.hexaware.project.entity.Category;
import com.hexaware.project.entity.Order;
import com.hexaware.project.entity.Restaurant;
import com.hexaware.project.entity.User;
import com.hexaware.project.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CategoryRepository categoryRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private RestaurantRepository restaurantRepo;

    // View all users
    public List<User> getAllUsers() {
        return userRepo.findByRole(User.Role.USER);
    }

    // View all owners
    public List<User> getAllOwners() {
        return userRepo.findByRole(User.Role.OWNER);
    }

    // Delete user or owner by ID
    public void deleteUserById(Long id) {
        userRepo.deleteById(id);
    }

    // Add a category (admin level)
    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }

    // View all categories
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    // Delete category
    public void deleteCategoryById(Long id) {
        categoryRepo.deleteById(id);
    }

    // View all restaurants
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepo.findAll();
    }

    public List<AdminOrderDTO> getAllOrders() {
        List<Order> orders = orderRepo.findAll();
        return orders.stream()
                     .map(AdminOrderDTO::new)
                     .toList();
    }

}
