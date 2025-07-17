package com.hexaware.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.project.entity.Order;
import com.hexaware.project.entity.Payment;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserUserId(Long userId);
    Optional<Payment> findByOrder(Order order);
}