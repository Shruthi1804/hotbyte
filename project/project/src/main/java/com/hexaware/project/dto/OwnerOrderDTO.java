package com.hexaware.project.dto;

import com.hexaware.project.entity.Order;

public class OwnerOrderDTO {
    private Long orderId;
    private String status;
    private double totalAmount;

    private Long userId;
    private String userName;
    
    public OwnerOrderDTO() {}

    public OwnerOrderDTO(Order order) {
        this.orderId = order.getOrderId();
        this.status = order.getStatus().toString();
        this.totalAmount = order.getTotalAmount();
        this.userId = order.getUser() != null ? order.getUser().getUserId() : null;
        this.userName = order.getUser() != null ? order.getUser().getName() : "N/A";
    }

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

   
    
}
