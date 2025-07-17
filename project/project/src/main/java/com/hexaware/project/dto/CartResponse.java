package com.hexaware.project.dto;

import com.hexaware.project.entity.Cart;

public class CartResponse {

    private Long cartId;
    private int quantity;

    private Long foodId;
    private String foodName;
    private String foodDescription;
    private double foodPrice;
    private String foodImageUrl;

    public CartResponse() {
    }

    public CartResponse(Cart cart) {
        this.cartId = cart.getCartId();
        this.quantity = cart.getQuantity();
        if (cart.getFoodItem() != null) {
            this.foodId = cart.getFoodItem().getFoodId();
            this.foodName = cart.getFoodItem().getName();
            this.foodDescription = cart.getFoodItem().getDescription();
            this.foodPrice = cart.getFoodItem().getPrice();
            this.foodImageUrl = cart.getFoodItem().getImageUrl();
        }
    }

    // Getters and Setters

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

    public Long getFoodId() {
        return foodId;
    }

    public void setFoodId(Long foodId) {
        this.foodId = foodId;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getFoodDescription() {
        return foodDescription;
    }

    public void setFoodDescription(String foodDescription) {
        this.foodDescription = foodDescription;
    }

    public double getFoodPrice() {
        return foodPrice;
    }

    public void setFoodPrice(double foodPrice) {
        this.foodPrice = foodPrice;
    }

    public String getFoodImageUrl() {
        return foodImageUrl;
    }

    public void setFoodImageUrl(String foodImageUrl) {
        this.foodImageUrl = foodImageUrl;
    }
}
