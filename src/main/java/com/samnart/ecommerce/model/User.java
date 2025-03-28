package com.samnart.ecommerce.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")
})
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private UUID userId;

    @NotBlank
    @Size(min = 2, max = 20, message = "Username must be at least 2 characters!")
    @Column(name = "username")
    private String userName;

    @Email
    @NotBlank
    @Size(max = 50)
    @Column(name = "email")
    private String email;

    @NotBlank
    @Size(min = 2, max = 20, message = "Password must be at least 2 characters")
    @Column(name = "password")
    private String password;


    // products


}