package com.hexaware.project.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "user-cart")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "food_item_id")
    @JsonBackReference(value = "cart-fooditem") // ✅ Fixed
    private FoodItem foodItem;

    public Cart() {}

    public Cart(Long cartId, int quantity, User user, FoodItem foodItem) {
        this.cartId = cartId;
        this.quantity = quantity;
        this.user = user;
        this.foodItem = foodItem;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public FoodItem getFoodItem() {
        return foodItem;
    }

    public void setFoodItem(FoodItem foodItem) {
        this.foodItem = foodItem;
    }
}
