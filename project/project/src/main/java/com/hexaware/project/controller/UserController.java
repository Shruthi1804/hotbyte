package com.hexaware.project.controller;

import com.hexaware.project.dto.CartResponse;
import com.hexaware.project.dto.OrderDTO;
import com.hexaware.project.entity.*;
import com.hexaware.project.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@PreAuthorize("hasRole('USER')")
public class UserController {

    @Autowired
    private UserService userService;

    private String getEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    // Get all categories
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(userService.getAllCategories());
    }

    // Get foods by category ID
    @GetMapping("/foods/{categoryId}")
    public ResponseEntity<List<FoodItem>> getFoodsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(userService.getFoodsByCategory(categoryId));
    }

    // Add item to cart
    @PostMapping("/cart")
    public ResponseEntity<Cart> addToCart(@RequestParam Long foodId, @RequestParam int quantity) {
        return ResponseEntity.ok(userService.addToCart(foodId, quantity, getEmail()));
    }

    // View cart
    @GetMapping("/cart")
    public ResponseEntity<List<CartResponse>> viewCart() {
        return ResponseEntity.ok(userService.getCart(getEmail()));
    }


    // Delete item from cart
    @DeleteMapping("/cart/{cartId}")
    public ResponseEntity<String> removeCart(@PathVariable Long cartId) {
        userService.removeCartItem(cartId, getEmail());
        return ResponseEntity.ok("Item removed from cart");
    }

    // Place order
    @PostMapping("/order")
    public ResponseEntity<Order> placeOrder() {
        return ResponseEntity.ok(userService.placeOrder(getEmail()));
    }

    @PostMapping("/payment/{orderId}")
    public ResponseEntity<Payment> makePayment(@PathVariable Long orderId,
                                               @RequestParam String method,
                                               @RequestParam Payment.PaymentStatus status) {
        return ResponseEntity.ok(userService.makePayment(orderId, method, status, getEmail()));
    }

    @GetMapping("/order-history")
    public ResponseEntity<List<OrderDTO>> getOrderHistory() {
        return ResponseEntity.ok(userService.getOrderHistory(getEmail()));
    }


    // Get profile
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile() {
        return ResponseEntity.ok(userService.getProfile(getEmail()));
    }

    // Update profile
    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody User updatedUser) {
        return ResponseEntity.ok(userService.updateProfile(updatedUser, getEmail()));
    }
}
