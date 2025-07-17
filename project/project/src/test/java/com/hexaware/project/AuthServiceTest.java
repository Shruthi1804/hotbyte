package com.hexaware.project;


import com.hexaware.project.config.JwtService;
import com.hexaware.project.dto.AuthRequest;
import com.hexaware.project.dto.AuthResponse;
import com.hexaware.project.entity.User;
import com.hexaware.project.entity.User.Role;
import com.hexaware.project.repository.UserRepository;
import com.hexaware.project.service.AuthService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authManager;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private User testUser;

    @BeforeEach
    void setup() {
        testUser = new User();
        testUser.setEmail("test@example.com");
        testUser.setPassword("plainpass");
        testUser.setRole(Role.USER);
    }

    @Test
    void testRegister_NewUser() {
        when(userRepo.findByEmail(testUser.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode("plainpass")).thenReturn("encodedpass");
        when(jwtService.generateToken("test@example.com", "USER")).thenReturn("mocked-jwt");

        AuthResponse response = authService.register(testUser);

        assertEquals("test@example.com", response.getEmail());
        assertEquals(Role.USER, response.getRole());
        assertEquals("mocked-jwt", response.getToken());

        verify(userRepo).save(any(User.class));
    }

    @Test
    void testRegister_ExistingEmail_ThrowsException() {
        when(userRepo.findByEmail(testUser.getEmail())).thenReturn(Optional.of(testUser));

        RuntimeException ex = assertThrows(RuntimeException.class, () -> authService.register(testUser));
        assertEquals("Email already exists", ex.getMessage());
    }

    @Test
    void testLogin_Success() {
        AuthRequest request = new AuthRequest("test@example.com", "plainpass");

        when(userRepo.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(jwtService.generateToken("test@example.com", "USER")).thenReturn("mocked-token");

        // no need to mock authManager.authenticate - just verify it is called
        AuthResponse response = authService.login(request);

        assertEquals("test@example.com", response.getEmail());
        assertEquals(Role.USER, response.getRole());
        assertEquals("mocked-token", response.getToken());

        verify(authManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void testLogin_InvalidEmail_ThrowsException() {
        AuthRequest request = new AuthRequest("wrong@example.com", "wrongpass");

        when(userRepo.findByEmail("wrong@example.com")).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("Invalid email or password", ex.getMessage());
    }
}
