package com.hexaware.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.project.entity.Cart;
import com.hexaware.project.entity.User;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserUserId(Long userId);
    void deleteByUserUserId(Long userId);
    List<Cart> findByUser(User user);
}
