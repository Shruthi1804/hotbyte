package com.hexaware.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.project.entity.Order;
import com.hexaware.project.entity.Restaurant;
import com.hexaware.project.entity.User;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserUserId(Long userId);
    List<Order> findByRestaurantRestaurantId(Long restaurantId);
    List<Order> findByRestaurant(Restaurant restaurant);
    List<Order> findByUser(User user);
}