package com.hexaware.project.service;

import com.hexaware.project.dto.CartResponse;
import com.hexaware.project.dto.OrderDTO;
import com.hexaware.project.dto.OrderItemDTO;
import com.hexaware.project.entity.*;
import com.hexaware.project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired private UserRepository userRepo;
    @Autowired private CategoryRepository categoryRepo;
    @Autowired private FoodItemRepository foodRepo;
    @Autowired private CartRepository cartRepo;
    @Autowired private OrderRepository orderRepo;
    @Autowired private OrderItemRepository orderItemRepo;
    @Autowired private PaymentRepository paymentRepo;
    @Autowired private RestaurantRepository restaurantRepo;

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElseThrow();
    }

    // View all categories
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    // View food items by category
    public List<FoodItem> getFoodsByCategory(Long categoryId) {
        Category category = categoryRepo.findById(categoryId).orElseThrow();
        return foodRepo.findByCategory(category);
    }

    // Add to cart
    public Cart addToCart(Long foodId, int quantity, String email) {
        User user = getUserByEmail(email);
        FoodItem food = foodRepo.findById(foodId).orElseThrow();

        Cart cart = new Cart();
        cart.setFoodItem(food);
        cart.setQuantity(quantity);
        cart.setUser(user);
        return cartRepo.save(cart);
    }

    // View cart
    public List<CartResponse> getCart(String email) {
        User user = getUserByEmail(email);
        return cartRepo.findByUser(user).stream()
            .map(CartResponse::new)
            .collect(Collectors.toList());
    }


    // Remove item from cart
    public void removeCartItem(Long cartId, String email) {
        User user = getUserByEmail(email);
        Cart cart = cartRepo.findById(cartId).orElseThrow();
        if (!cart.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Unauthorized");
        }
        cartRepo.delete(cart);
    }

    // Place order
    public Order placeOrder(String email) {
        User user = getUserByEmail(email);
        List<Cart> cartItems = cartRepo.findByUser(user);

        if (cartItems.isEmpty()) throw new RuntimeException("Cart is empty");

        Order order = new Order();
        order.setUser(user);
        order.setStatus(Order.Status.PENDING);

        Restaurant restaurant = cartItems.get(0).getFoodItem().getRestaurant();
        order.setRestaurant(restaurant);

        // ⬇️ Calculate total
        double total = 0;
        Order savedOrder = orderRepo.save(order); // Save first to get ID for FK

        for (Cart cart : cartItems) {
            OrderItem item = new OrderItem();
            item.setOrder(savedOrder);
            item.setFoodItem(cart.getFoodItem());
            item.setQuantity(cart.getQuantity());

            double itemTotal = cart.getQuantity() * cart.getFoodItem().getPrice();
            item.setPrice(cart.getFoodItem().getPrice()); // Save individual price
            total += itemTotal;

            orderItemRepo.save(item);
        }

        // ⬇️ Now update total and save again
        savedOrder.setTotalAmount(total);
        return orderRepo.save(savedOrder);
    }


    public Payment makePayment(Long orderId, String method, Payment.PaymentStatus status, String email) {
        User user = getUserByEmail(email);
        Order order = orderRepo.findById(orderId).orElseThrow();

        if (!order.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Unauthorized payment attempt");
        }

        Payment payment = new Payment();
        payment.setUser(user);
        payment.setOrder(order);
        payment.setPaymentMethod(method); // Accepts "COD" or "ONLINE"
        payment.setPaymentStatus(status); // Accepts COMPLETED or PENDING
        return paymentRepo.save(payment);
    }


    public List<OrderDTO> getOrderHistory(String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        List<Order> orders = orderRepo.findByUser(user);

        return orders.stream().map(order -> {
            List<OrderItemDTO> itemDTOs = order.getOrderItems().stream().map(oi -> {
                return new OrderItemDTO(
                    oi.getFoodItem().getName(),
                    oi.getQuantity(),
                    oi.getPrice()
                );
            }).toList();

            return new OrderDTO(
                order.getOrderId(),
                order.getStatus().name(),
                order.getTotalAmount(),
                order.getRestaurant() != null ? order.getRestaurant().getRestaurantId() : null,
                order.getRestaurant() != null ? order.getRestaurant().getName() : "N/A",
                user.getUserId(),
                user.getName(),
                itemDTOs
            );
        }).toList();
    }

    // View profile
    public User getProfile(String email) {
        return getUserByEmail(email);
    }

    // Update profile
    public User updateProfile(User updatedUser, String email) {
        User user = getUserByEmail(email);
        user.setName(updatedUser.getName());
        user.setAddress(updatedUser.getAddress());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        return userRepo.save(user);
    }
}
