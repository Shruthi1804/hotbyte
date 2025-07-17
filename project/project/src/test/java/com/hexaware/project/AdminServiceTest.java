package com.hexaware.project;

import com.hexaware.project.entity.Category;

import com.hexaware.project.entity.Restaurant;
import com.hexaware.project.entity.User;
import com.hexaware.project.repository.*;
import com.hexaware.project.service.AdminService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;


@ExtendWith(MockitoExtension.class)
class AdminServiceTest {

    @Mock private UserRepository userRepo;
    @Mock private CategoryRepository categoryRepo;
    @Mock private OrderRepository orderRepo;
    @Mock private RestaurantRepository restaurantRepo;

    @InjectMocks
    private AdminService adminService;

    @Test
    void testGetAllUsers() {
        List<User> mockUsers = List.of(new User(), new User());
        when(userRepo.findByRole(User.Role.USER)).thenReturn(mockUsers);

        List<User> result = adminService.getAllUsers();
        assertEquals(2, result.size());
    }

    @Test
    void testGetAllOwners() {
        List<User> mockOwners = List.of(new User());
        when(userRepo.findByRole(User.Role.OWNER)).thenReturn(mockOwners);

        List<User> result = adminService.getAllOwners();
        assertEquals(1, result.size());
    }

    @Test
    void testDeleteUserById() {
        Long userId = 1L;
        adminService.deleteUserById(userId);
        verify(userRepo, times(1)).deleteById(userId);
    }

    @Test
    void testAddCategory() {
        Category category = new Category();
        when(categoryRepo.save(category)).thenReturn(category);

        Category saved = adminService.addCategory(category);
        assertEquals(category, saved);
    }

    @Test
    void testGetAllCategories() {
        List<Category> categories = List.of(new Category(), new Category());
        when(categoryRepo.findAll()).thenReturn(categories);

        List<Category> result = adminService.getAllCategories();
        assertEquals(2, result.size());
    }

    @Test
    void testDeleteCategoryById() {
        Long id = 10L;
        adminService.deleteCategoryById(id);
        verify(categoryRepo).deleteById(id);
    }

    @Test
    void testGetAllRestaurants() {
        List<Restaurant> restaurants = List.of(new Restaurant());
        when(restaurantRepo.findAll()).thenReturn(restaurants);

        List<Restaurant> result = adminService.getAllRestaurants();
        assertEquals(1, result.size());
    }

}
