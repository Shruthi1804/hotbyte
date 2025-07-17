package com.hexaware.project.controller;

import com.hexaware.project.dto.AdminOrderDTO;
import com.hexaware.project.dto.RestaurantDTO;
import com.hexaware.project.entity.*;
import com.hexaware.project.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // View all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    // View all owners
    @GetMapping("/owners")
    public ResponseEntity<List<User>> getAllOwners() {
        return ResponseEntity.ok(adminService.getAllOwners());
    }

    // Delete user/owner
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        adminService.deleteUserById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    // Add category
    @PostMapping("/category")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        return ResponseEntity.ok(adminService.addCategory(category));
    }

    // View all categories
    @GetMapping("/category")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(adminService.getAllCategories());
    }

    // Delete category
    @DeleteMapping("/category/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        adminService.deleteCategoryById(id);
        return ResponseEntity.ok("Category deleted successfully");
    }

    @GetMapping("/restaurants")
    public List<RestaurantDTO> getAllRestaurants() {
        List<Restaurant> restaurants = adminService.getAllRestaurants();

        return restaurants.stream()
                .map(r -> new RestaurantDTO(
                        r.getRestaurantId(),
                        r.getName(),
                        r.getAddress(),
                        r.getDescription(),
                        r.getOwner() != null ? r.getOwner().getUserId() : null
                ))
                .collect(Collectors.toList());
    }

    // View all orders
    @GetMapping("/orders")
    public ResponseEntity<List<AdminOrderDTO>> getAllOrders() {
        return ResponseEntity.ok(adminService.getAllOrders());
    }
}
