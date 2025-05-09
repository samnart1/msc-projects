package com.samnart.cloud_project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.samnart.cloud_project.model.Category;
import com.samnart.cloud_project.service.serviceInterface.CategoryService;

@RestController
@RequestMapping("/api")
class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> repsonse = categoryService.getAllCategories();
        return new ResponseEntity<>(repsonse, HttpStatus.OK);
    }

    @PostMapping("/categories")
    public ResponseEntity<String> createCategory(@RequestBody Category category) {
        String response = categoryService.createCategory(category);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/categories/{Id}")
    public ResponseEntity<Optional<Category>> getCategoryById(@PathVariable Long Id) throws Exception {
        Optional<Category> response = categoryService.getCategoryById(Id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/categories/{Id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long Id) {
        String response = categoryService.deleteCategory(Id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/categories/{Id}")
    public ResponseEntity<String> updateCategory(@PathVariable Long Id, @RequestBody Category category) {
        String response = categoryService.updateCategory(Id, category);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}