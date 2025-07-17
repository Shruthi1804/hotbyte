package com.hexaware.project;


import com.hexaware.project.controller.OwnerController;
import com.hexaware.project.dto.OwnerOrderDTO;
import com.hexaware.project.entity.*;
import com.hexaware.project.service.OwnerService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OwnerControllerTest {

    @Mock
    private OwnerService ownerService;

    @InjectMocks
    private OwnerController ownerController;

    private final String mockEmail = "owner@example.com";

    @BeforeEach
    void setup() {
        // Simulate logged-in user
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(mockEmail, null, List.of())
        );
    }

    @Test
    void testAddRestaurant() {
        Restaurant restaurant = new Restaurant();
        when(ownerService.addRestaurant(any(Restaurant.class), eq(mockEmail))).thenReturn(restaurant);

        ResponseEntity<Restaurant> response = ownerController.addRestaurant(restaurant);
        assertEquals(restaurant, response.getBody());
    }

    @Test
    void testGetMyRestaurant() {
        Restaurant restaurant = new Restaurant();
        when(ownerService.getMyRestaurant(mockEmail)).thenReturn(restaurant);

        ResponseEntity<Restaurant> response = ownerController.getMyRestaurant();
        assertEquals(restaurant, response.getBody());
    }



    @Test
    void testAddFoodItem() {
        FoodItem food = new FoodItem();
        when(ownerService.addFoodItem(any(FoodItem.class), eq(mockEmail))).thenReturn(food);

        ResponseEntity<FoodItem> response = ownerController.addFood(food);
        assertEquals(food, response.getBody());
    }

    @Test
    void testDeleteFoodItem() {
        doNothing().when(ownerService).deleteFoodItem(1L, mockEmail);

        ResponseEntity<String> response = ownerController.deleteFood(1L);
        assertEquals("Food item deleted", response.getBody());
    }

    @Test
    void testGetMyFoodItems() {
        List<FoodItem> items = List.of(new FoodItem(), new FoodItem());
        when(ownerService.getMyFoodItems(mockEmail)).thenReturn(items);

        ResponseEntity<List<FoodItem>> response = ownerController.getMyFoodItems();
        assertEquals(2, response.getBody().size());
    }

    @Test
    void testGetMyOrders() {
        List<OwnerOrderDTO> orders = List.of(new OwnerOrderDTO());
        when(ownerService.getMyOrders(mockEmail)).thenReturn(orders);

        ResponseEntity<List<OwnerOrderDTO>> response = ownerController.getMyOrders();
        assertEquals(1, response.getBody().size());
    }

    @Test
    void testUpdateOrderStatus() {
        Order updatedOrder = new Order();
        when(ownerService.updateOrderStatus(10L, Order.Status.DELIVERED, mockEmail)).thenReturn(updatedOrder);

        ResponseEntity<Order> response = ownerController.updateOrderStatus(10L, Order.Status.DELIVERED);
        assertEquals(updatedOrder, response.getBody());
    }

    @Test
    void testGetPaymentStatus() {
        Payment.PaymentStatus status = Payment.PaymentStatus.COMPLETED;
        when(ownerService.getPaymentStatus(100L, mockEmail)).thenReturn(status);

        ResponseEntity<Payment.PaymentStatus> response = ownerController.getPaymentStatus(100L);
        assertEquals(Payment.PaymentStatus.COMPLETED, response.getBody());
    }

    @Test
    void testGetAllCategories() {
        List<Category> categories = List.of(new Category(), new Category());
        when(ownerService.getAllCategories()).thenReturn(categories);

        ResponseEntity<List<Category>> response = ownerController.getAllCategories();
        assertEquals(2, response.getBody().size());
    }
}
