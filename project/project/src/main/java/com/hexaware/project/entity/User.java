package com.hexaware.project.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    public enum Role {
        ADMIN, USER, OWNER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String address;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(mappedBy = "owner", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-restaurant")
    private Restaurant restaurant;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-order")
    private List<Order> orders;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-cart")
    private List<Cart> cartItems;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-payment")
    private List<Payment> payments;
    
    @Column
    private String resetToken;

    @Column
    private LocalDateTime tokenExpiry;

    public User() {}

  

    public User(Long userId, String name, String email, String password, String phoneNumber, String address, Role role,
			Restaurant restaurant, List<Order> orders, List<Cart> cartItems, List<Payment> payments, String resetToken,
			LocalDateTime tokenExpiry) {
		super();
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.role = role;
		this.restaurant = restaurant;
		this.orders = orders;
		this.cartItems = cartItems;
		this.payments = payments;
		this.resetToken = resetToken;
		this.tokenExpiry = tokenExpiry;
	}



	public Long getUserId() {
		return userId;
	}



	public void setUserId(Long userId) {
		this.userId = userId;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public String getPhoneNumber() {
		return phoneNumber;
	}



	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}



	public String getAddress() {
		return address;
	}



	public void setAddress(String address) {
		this.address = address;
	}



	public Role getRole() {
		return role;
	}



	public void setRole(Role role) {
		this.role = role;
	}



	public Restaurant getRestaurant() {
		return restaurant;
	}



	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}



	public List<Order> getOrders() {
		return orders;
	}



	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}



	public List<Cart> getCartItems() {
		return cartItems;
	}



	public void setCartItems(List<Cart> cartItems) {
		this.cartItems = cartItems;
	}



	public List<Payment> getPayments() {
		return payments;
	}



	public void setPayments(List<Payment> payments) {
		this.payments = payments;
	}



	public String getResetToken() {
		return resetToken;
	}



	public void setResetToken(String resetToken) {
		this.resetToken = resetToken;
	}



	public LocalDateTime getTokenExpiry() {
		return tokenExpiry;
	}



	public void setTokenExpiry(LocalDateTime tokenExpiry) {
		this.tokenExpiry = tokenExpiry;
	}



	// --- Getters and Setters ---
     
}
