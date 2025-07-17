package com.hexaware.project.service;

import com.hexaware.project.dto.AuthRequest;
import com.hexaware.project.dto.AuthResponse;
import com.hexaware.project.entity.User;
import com.hexaware.project.entity.User.Role;
import com.hexaware.project.repository.UserRepository;
import com.hexaware.project.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    // ✅ Register a new user (OWNER or USER)
    public AuthResponse register(User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        if (user.getRole() == null) {
            user.setRole(Role.USER); // default to USER
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);

        // ✅ Pass role to token
        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(user.getEmail(), user.getRole(), token);
    }


    public AuthResponse login(AuthRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // ✅ Pass role to token
        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(user.getEmail(), user.getRole(), token);
    }
    
    public ResponseEntity<String> sendResetLink(String email) {
        User user = userRepo.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setTokenExpiry(LocalDateTime.now().plusMinutes(15));
        userRepo.save(user);

        // Ideally, send by email. For now, just return the link in response (or log it)
        String resetLink = "http://localhost:3000/reset-password/" + token;
        System.out.println("Reset Link: " + resetLink); // OR send via emailService.send()

        return ResponseEntity.ok("Reset link sent to your email (Simulated): " + resetLink);
    }
    
    public ResponseEntity<String> resetPassword(String token, String newPassword) {
        User user = userRepo.findByResetToken(token);
        if (user == null || user.getTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setTokenExpiry(null);
        userRepo.save(user);

        return ResponseEntity.ok("Password has been reset successfully.");
    }
    
}
