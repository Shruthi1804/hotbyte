package com.hexaware.project.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    private int quantity;
    private double price;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference(value = "order-orderitem")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "food_item_id")
    @JsonBackReference
    private FoodItem foodItem;

    public OrderItem() {}

    public OrderItem(Long orderItemId, int quantity, double price, Order order, FoodItem foodItem) {
        this.orderItemId = orderItemId;
        this.quantity = quantity;
        this.price = price;
        this.order = order;
        this.foodItem = foodItem;
    }

    public Long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public FoodItem getFoodItem() {
        return foodItem;
    }

    public void setFoodItem(FoodItem foodItem) {
        this.foodItem = foodItem;
    }
}
