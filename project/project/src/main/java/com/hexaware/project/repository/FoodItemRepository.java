package com.hexaware.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.project.entity.Category;
import com.hexaware.project.entity.FoodItem;
import com.hexaware.project.entity.Restaurant;

import java.util.List;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByRestaurantRestaurantId(Long restaurantId);
    List<FoodItem> findByCategoryCategoryId(Long categoryId);
	List<FoodItem> findByCategory(Category category);
	List<FoodItem> findByRestaurant(Restaurant restaurant);
}