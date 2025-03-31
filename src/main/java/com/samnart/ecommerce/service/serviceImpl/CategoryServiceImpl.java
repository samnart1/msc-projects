package com.samnart.ecommerce.service.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.samnart.ecommerce.model.Category;
import com.samnart.ecommerce.payload.CategoryDTO;
import com.samnart.ecommerce.payload.CategoryResponse;
import com.samnart.ecommerce.repository.CategoryRepository;
import com.samnart.ecommerce.service.service.CategoryService;

public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepo;

    @Override
    public CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        List<Category> category = categoryRepo.findAll();

        List<CategoryDTO> categoryDTOs = category.stream().map((item) -> 
            ModelMapper.map(item, CategoryDTO.class))
            .collect(Collectors.toList());

        CategoryResponse categoryResponse = new CategoryResponse();

        return null;
    }

    @Override
    public CategoryResponse getCategoryById(Long categoryId) {
        return null;
    }

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        return null;
    }

    @Override
    public CategoryDTO deleteCategory(Long categoryId) {
        return null;
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryDTO, Long categoryId) {
        return null;
    }
    
}
