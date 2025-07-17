package com.hexaware.project.dto;

import com.hexaware.project.entity.User.Role;

public class AuthResponse {
	private String email;
	private Role role;
    private String token;
    
    public AuthResponse() {}

	public AuthResponse(String email, Role role, String token) {
		super();
		this.email = email;
		this.role = role;
		this.token = token;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
    
    

}