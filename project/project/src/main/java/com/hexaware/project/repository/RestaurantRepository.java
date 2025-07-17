package com.hexaware.project.repository;

import com.hexaware.project.entity.Restaurant;
import com.hexaware.project.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
	Optional<Restaurant> findByOwner(User owner);

	Optional<User> findByOwnerEmail(String email);
}