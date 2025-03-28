package com.samnart.ecommerce.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.samnart.ecommerce.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, UUID> {
    
}
