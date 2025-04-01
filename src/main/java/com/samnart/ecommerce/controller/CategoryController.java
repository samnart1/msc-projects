package com.samnart.ecommerce.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.samnart.ecommerce.config.AppConstants;
import com.samnart.ecommerce.payload.CategoryResponse;
import com.samnart.ecommerce.service.service.CategoryService;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponse> getAllCategories(
        @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber, 
        @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize, 
        @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_CATEGORIES_BY, required = false) String sortBy, 
        @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
            CategoryResponse categoryResponse = categoryService.getAllCategories(pageNumber, pageSize, sortBy, sortOrder);
            return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
    }

    @GetMapping("/public/categories/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long categoryId) {
        CategoryResponse categoryResponse = categoryService.getCategoryById(categoryId);
        return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
    }
    
}
