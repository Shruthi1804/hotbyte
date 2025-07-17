// com.hexaware.project.dto.RestaurantDTO.java
package com.hexaware.project.dto;

public class RestaurantDTO {
    private Long restaurantId;
    private String name;
    private String address;
    private String description;
    private Long ownerId;

    public RestaurantDTO() {}

    public RestaurantDTO(Long restaurantId, String name, String address, String description, Long ownerId) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.address = address;
        this.description = description;
        this.ownerId = ownerId;
    }

    // Getters and Setters
    public Long getRestaurantId() { return restaurantId; }
    public void setRestaurantId(Long restaurantId) { this.restaurantId = restaurantId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
}

