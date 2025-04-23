package com.samnart.cloud_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.samnart.cloud_project.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
