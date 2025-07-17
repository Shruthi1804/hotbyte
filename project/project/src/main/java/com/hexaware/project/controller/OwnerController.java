package com.hexaware.project.controller;

import com.hexaware.project.dto.OwnerOrderDTO;
import com.hexaware.project.entity.*;
import com.hexaware.project.service.OwnerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owner")
@PreAuthorize("hasRole('OWNER')")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    private String getLoggedInEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    // Add restaurant
    @PostMapping("/restaurant")
    public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant) {
        return ResponseEntity.ok(ownerService.addRestaurant(restaurant, getLoggedInEmail()));
    }

    // View own restaurant
    @GetMapping("/restaurant")
    public ResponseEntity<Restaurant> getMyRestaurant() {
        return ResponseEntity.ok(ownerService.getMyRestaurant(getLoggedInEmail()));
    }
    
    
    @GetMapping("/profile")
    public ResponseEntity<User> getOwnerProfile() {
        return ResponseEntity.ok(ownerService.getOwnerProfile(getLoggedInEmail()));
    }


    // Add food item
    @PostMapping("/food")
    public ResponseEntity<FoodItem> addFood(@RequestBody FoodItem foodItem) {
        return ResponseEntity.ok(ownerService.addFoodItem(foodItem, getLoggedInEmail()));
    }

    // Delete food item
    @DeleteMapping("/food/{id}")
    public ResponseEntity<String> deleteFood(@PathVariable Long id) {
        ownerService.deleteFoodItem(id, getLoggedInEmail());
        return ResponseEntity.ok("Food item deleted");
    }

    // View own food items
    @GetMapping("/food")
    public ResponseEntity<List<FoodItem>> getMyFoodItems() {
        return ResponseEntity.ok(ownerService.getMyFoodItems(getLoggedInEmail()));
    }

    // View all orders to restaurant
    @GetMapping("/orders")
    public ResponseEntity<List<OwnerOrderDTO>> getMyOrders() {
        return ResponseEntity.ok(ownerService.getMyOrders(getLoggedInEmail()));
    }


    // Update order status
    @PutMapping("/orders/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam Order.Status status) {
        return ResponseEntity.ok(ownerService.updateOrderStatus(id, status, getLoggedInEmail()));
    }

    // View payment status of an order
    @GetMapping("/orders/{id}/payment-status")
    public ResponseEntity<Payment.PaymentStatus> getPaymentStatus(@PathVariable Long id) {
        return ResponseEntity.ok(ownerService.getPaymentStatus(id, getLoggedInEmail()));
    }
    
    //get all categories added by admin
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(ownerService.getAllCategories());
    }
}
