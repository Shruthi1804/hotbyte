package com.hexaware.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.project.entity.Category;
import com.hexaware.project.entity.Restaurant;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	List<Category> findByRestaurant(Restaurant restaurant);
}