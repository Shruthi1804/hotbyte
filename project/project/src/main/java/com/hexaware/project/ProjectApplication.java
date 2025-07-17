package com.hexaware.project;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hexaware.project.entity.User;
import com.hexaware.project.repository.UserRepository;

@SpringBootApplication
public class ProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepo.findByEmail("admin@admin.com").isEmpty()) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("admin@admin.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setPhoneNumber("0000000000");
                admin.setAddress("HQ Office, Main Street");
                admin.setRole(User.Role.ADMIN);
                userRepo.save(admin);
                System.out.println("✅ Default admin user created: admin@admin.com / admin123");
            }
        };
    }
}
