package com.samnart.cloud_project.service.serviceInterface;

import java.util.List;
import java.util.Optional;

import com.samnart.cloud_project.model.Category;

public interface CategoryService {

    List<Category> getAllCategories();
    Optional<Category> getCategoryById(Long Id) throws Exception;
    String deleteCategory(Long Id);
    String createCategory(Category category);
    String updateCategory(Long Id, Category category);

}