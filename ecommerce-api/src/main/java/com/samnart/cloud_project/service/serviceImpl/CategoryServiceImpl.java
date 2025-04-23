package com.samnart.cloud_project.service.serviceImpl;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.samnart.cloud_project.model.Category;
import com.samnart.cloud_project.repository.CategoryRepository;
import com.samnart.cloud_project.service.serviceInterface.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(Long Id) throws Exception {
        Optional<Category> optCategory = categoryRepository.findById(Id);
        if (optCategory.isPresent()) {
            return optCategory;
        } else {
            throw new Exception();
        }
    }

    @Override
    public String deleteCategory(Long Id) {  
        categoryRepository.deleteById(Id);
        return "Category deleted successfully!";

    }

    @Override
    public String createCategory(Category category) {
        categoryRepository.save(category);
         return "Category created successfully";
    }

    @Override
    public String updateCategory(Long Id, Category category) {
        Optional<Category> optCategory = categoryRepository.findById(Id);

        if (optCategory.isPresent()) {
            Category existingCategory = optCategory.get();
            existingCategory.setCategoryName(category.getCategoryName());
            categoryRepository.save(existingCategory);
            return "Category  updated successfully!";
        } else {
            return "Category with Id: " + Id + " not found!";
        }
    }
}
