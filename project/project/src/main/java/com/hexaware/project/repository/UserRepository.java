package com.hexaware.project.repository;
import com.hexaware.project.entity.User;
import com.hexaware.project.entity.User.Role;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  
    Optional<User> findByEmail(String email);
	List<User> findByRole(Role user);
	User findByResetToken(String token);
}
