package com.hexaware.project.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.project.entity.OrderItem;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderOrderId(Long orderId);
}
