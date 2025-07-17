package com.hexaware.project.dto;

import com.hexaware.project.entity.Order;

public class AdminOrderDTO {
    private Long orderId;
    private double totalAmount;
    private String status;

    private Long userId;
    private String userName;

    private Long ownerId;
    private String ownerName;
    
    public AdminOrderDTO() {}

    public AdminOrderDTO(Order order) {
        this.orderId = order.getOrderId();
        this.totalAmount = order.getTotalAmount();
        this.status = order.getStatus().toString();

        if (order.getUser() != null) {
            this.userId = order.getUser().getUserId();
            this.userName = order.getUser().getName();
        } else {
            this.userName = "N/A";
        }

        if (order.getRestaurant() != null && order.getRestaurant().getOwner() != null) {
            this.ownerId = order.getRestaurant().getOwner().getUserId();
            this.ownerName = order.getRestaurant().getOwner().getName();
        } else {
            this.ownerName = "N/A";
        }
    }

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	public Long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	
}
