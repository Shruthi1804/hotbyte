package com.hexaware.project.service;

import com.hexaware.project.dto.OwnerOrderDTO;
import com.hexaware.project.entity.*;
import com.hexaware.project.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerService {

    @Autowired private UserRepository userRepo;
    @Autowired private RestaurantRepository restaurantRepo;
    @Autowired private FoodItemRepository foodRepo;
    @Autowired private CategoryRepository categoryRepo;
    @Autowired private OrderRepository orderRepo;
    @Autowired private PaymentRepository paymentRepo;

    // Add restaurant for owner
    public Restaurant addRestaurant(Restaurant restaurant, String email) {
        User owner = userRepo.findByEmail(email).orElseThrow();
        if (restaurantRepo.findByOwner(owner).isPresent()) {
            throw new RuntimeException("Restaurant already exists for this owner");
        }
        restaurant.setOwner(owner);
        return restaurantRepo.save(restaurant);
    }

    // Get own restaurant
    public Restaurant getMyRestaurant(String email) {
        User owner = userRepo.findByEmail(email).orElseThrow();
        return restaurantRepo.findByOwner(owner).orElse(null);
    }
    
    
    
    public User getOwnerProfile(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Owner not found"));
    }

    // Add food item under existing category
    public FoodItem addFoodItem(FoodItem foodItem, String email) {
        User owner = userRepo.findByEmail(email).orElseThrow();
        Restaurant restaurant = restaurantRepo.findByOwner(owner).orElseThrow();
        foodItem.setRestaurant(restaurant);

        Category category = categoryRepo.findById(foodItem.getCategory().getCategoryId())
                .orElseThrow(() -> new RuntimeException("Invalid category"));
        foodItem.setCategory(category);

        return foodRepo.save(foodItem);
    }

    // Delete food item
    public void deleteFoodItem(Long foodId, String email) {
        User owner = userRepo.findByEmail(email).orElseThrow();
        Restaurant restaurant = restaurantRepo.findByOwner(owner).orElseThrow();
        FoodItem food = foodRepo.findById(foodId).orElseThrow();
        if (!food.getRestaurant().getRestaurantId().equals(restaurant.getRestaurantId())) {
            throw new RuntimeException("You can't delete food from another restaurant");
        }
        foodRepo.deleteById(foodId);
    }

    // View all food items by owner
    public List<FoodItem> getMyFoodItems(String email) {
        User owner = userRepo.findByEmail(email).orElseThrow();
        Restaurant restaurant = restaurantRepo.findByOwner(owner).orElseThrow();
        return foodRepo.findByRestaurant(restaurant);
    }

    public List<OwnerOrderDTO> getMyOrders(String email) {
        Restaurant restaurant = restaurantRepo.findByOwner(
            userRepo.findByEmail(email).orElseThrow()
        ).orElseThrow();

        List<Order> orders = orderRepo.findByRestaurant(restaurant);

        return orders.stream()
            .map(order -> new OwnerOrderDTO(order))
            .toList();
    }


    // Update order status
    public Order updateOrderStatus(Long orderId, Order.Status status, String email) {
        User owner = userRepo.findByEmail(email).orElseThrow();
        Restaurant restaurant = restaurantRepo.findByOwner(owner).orElseThrow();
        Order order = orderRepo.findById(orderId).orElseThrow();

        if (!order.getRestaurant().getRestaurantId().equals(restaurant.getRestaurantId())) {
            throw new RuntimeException("You can't update status of another restaurant's order");
        }

        order.setStatus(status);
        return orderRepo.save(order);
    }

    // View payment status for an order
    public Payment.PaymentStatus getPaymentStatus(Long orderId, String email) {
        User owner = userRepo.findByEmail(email).orElseThrow();
        Restaurant restaurant = restaurantRepo.findByOwner(owner).orElseThrow();
        Order order = orderRepo.findById(orderId).orElseThrow();

        if (!order.getRestaurant().getRestaurantId().equals(restaurant.getRestaurantId())) {
            throw new RuntimeException("You can't view payment for another restaurant's order");
        }

        Payment payment = paymentRepo.findByOrder(order).orElseThrow();
        return payment.getPaymentStatus();
    }
    
    public List<Category> getAllCategories() {
        return categoryRepo.findAll(); // fetch all, not just tied to owner
    }
}
