package com.hexaware.project;


import com.hexaware.project.dto.CartResponse;
import com.hexaware.project.entity.*;
import com.hexaware.project.repository.*;
import com.hexaware.project.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock private UserRepository userRepo;
    @Mock private CategoryRepository categoryRepo;
    @Mock private FoodItemRepository foodRepo;
    @Mock private CartRepository cartRepo;
    @Mock private OrderRepository orderRepo;
    @Mock private OrderItemRepository orderItemRepo;
    @Mock private PaymentRepository paymentRepo;
    @Mock private RestaurantRepository restaurantRepo;

    @InjectMocks
    private UserService userService;

    private User user;
    private String email = "user@example.com";

    @BeforeEach
    void setup() {
        user = new User();
        user.setUserId(1L);
        user.setEmail(email);
        user.setName("Test User");
    }

    @Test
    void testGetAllCategories() {
        List<Category> categories = List.of(new Category(), new Category());
        when(categoryRepo.findAll()).thenReturn(categories);

        List<Category> result = userService.getAllCategories();
        assertEquals(2, result.size());
    }

    @Test
    void testGetFoodsByCategory() {
        Category category = new Category();
        category.setCategoryId(1L);
        List<FoodItem> foods = List.of(new FoodItem());

        when(categoryRepo.findById(1L)).thenReturn(Optional.of(category));
        when(foodRepo.findByCategory(category)).thenReturn(foods);

        List<FoodItem> result = userService.getFoodsByCategory(1L);
        assertEquals(1, result.size());
    }

    @Test
    void testAddToCart() {
        FoodItem food = new FoodItem();
        food.setFoodId(100L);
        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));
        when(foodRepo.findById(100L)).thenReturn(Optional.of(food));
        when(cartRepo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Cart result = userService.addToCart(100L, 2, email);
        assertEquals(user, result.getUser());
        assertEquals(2, result.getQuantity());
    }

    @Test
    void testViewCart() {
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setQuantity(1);
        cart.setFoodItem(new FoodItem());
        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));
        when(cartRepo.findByUser(user)).thenReturn(List.of(cart));

        List<CartResponse> result = userService.getCart(email);
        assertEquals(1, result.size());
    }

    @Test
    void testRemoveCartItem_Success() {
        Cart cart = new Cart();
        cart.setCartId(1L);
        cart.setUser(user);

        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));
        when(cartRepo.findById(1L)).thenReturn(Optional.of(cart));

        userService.removeCartItem(1L, email);
        verify(cartRepo).delete(cart);
    }

    @Test
    void testRemoveCartItem_Unauthorized() {
        User otherUser = new User();
        otherUser.setUserId(999L);

        Cart cart = new Cart();
        cart.setCartId(1L);
        cart.setUser(otherUser);

        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));
        when(cartRepo.findById(1L)).thenReturn(Optional.of(cart));

        assertThrows(RuntimeException.class, () -> userService.removeCartItem(1L, email));
    }

    @Test
    void testPlaceOrder_Success() {
        FoodItem food = new FoodItem();
        food.setPrice(100);
        Restaurant restaurant = new Restaurant();
        food.setRestaurant(restaurant);

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setFoodItem(food);
        cart.setQuantity(2);

        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));
        when(cartRepo.findByUser(user)).thenReturn(List.of(cart));
        when(orderRepo.save(any(Order.class))).thenAnswer(inv -> inv.getArgument(0));

        Order result = userService.placeOrder(email);
        assertEquals(user, result.getUser());
        assertEquals(Order.Status.PENDING, result.getStatus());
        assertEquals(200.0, result.getTotalAmount());
    }

    @Test
    void testPlaceOrder_EmptyCart() {
        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));
        when(cartRepo.findByUser(user)).thenReturn(List.of());

        assertThrows(RuntimeException.class, () -> userService.placeOrder(email));
    }

    @Test
    void testMakePayment_Success() {
        Order order = new Order();
        order.setOrderId(1L);
        order.setUser(user);

        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));
        when(orderRepo.findById(1L)).thenReturn(Optional.of(order));
        when(paymentRepo.save(any(Payment.class))).thenAnswer(inv -> inv.getArgument(0));

        Payment result = userService.makePayment(1L, "COD", Payment.PaymentStatus.COMPLETED, email);
        assertEquals("COD", result.getPaymentMethod());
        assertEquals(Payment.PaymentStatus.COMPLETED, result.getPaymentStatus());
        assertEquals(user, result.getUser());
    }

    @Test
    void testMakePayment_Unauthorized() {
        User otherUser = new User();
        otherUser.setUserId(999L);

        Order order = new Order();
        order.setOrderId(1L);
        order.setUser(otherUser);

        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));
        when(orderRepo.findById(1L)).thenReturn(Optional.of(order));

        assertThrows(RuntimeException.class, () ->
                userService.makePayment(1L, "ONLINE", Payment.PaymentStatus.COMPLETED, email));
    }



    @Test
    void testGetProfile() {
        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));
        User result = userService.getProfile(email);
        assertEquals(user, result);
    }

    @Test
    void testUpdateProfile() {
        User updated = new User();
        updated.setName("Updated Name");
        updated.setAddress("New Address");
        updated.setPhoneNumber("9999999999");

        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));
        when(userRepo.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        User result = userService.updateProfile(updated, email);
        assertEquals("Updated Name", result.getName());
        assertEquals("New Address", result.getAddress());
        assertEquals("9999999999", result.getPhoneNumber());
    }
}
