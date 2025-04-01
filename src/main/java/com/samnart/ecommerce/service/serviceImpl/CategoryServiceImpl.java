package com.samnart.ecommerce.service.serviceImpl;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.samnart.ecommerce.exception.APIException;
import com.samnart.ecommerce.exception.ResourceNotFoundException;
import com.samnart.ecommerce.model.Category;
import com.samnart.ecommerce.payload.CategoryDTO;
import com.samnart.ecommerce.payload.CategoryResponse;
import com.samnart.ecommerce.repository.CategoryRepository;
import com.samnart.ecommerce.service.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
            ? Sort.by(sortBy).ascending()
            : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Category> categoryPage = categoryRepo.findAll(pageDetails);
        List<Category> searchedCategories = categoryPage.getContent();

        if (searchedCategories.isEmpty()) {
            throw new APIException("No categories found!");
        }

        List<CategoryDTO> categoryDTOs = searchedCategories.stream().map(category -> modelMapper.map(
            category, CategoryDTO.class)).collect(Collectors.toList());

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setContent(categoryDTOs);
        categoryResponse.setPageSize(categoryPage.getSize());
        categoryResponse.setPageNumber(categoryPage.getNumber());
        categoryResponse.setTotalPages(categoryPage.getTotalPages());
        categoryResponse.setTotalElements(categoryPage.getTotalElements());
        categoryResponse.setLastPage(categoryPage.isLast());


        return categoryResponse;
    }

    @Override
    public CategoryResponse getCategoryById(Long categoryId) {
        Category searchedCategory = categoryRepo.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        CategoryDTO categoryDTO = modelMapper.map(searchedCategory, CategoryDTO.class);

        CategoryResponse categoryResponse = new CategoryResponse();

        categoryResponse.setContent(Collections.singletonList(categoryDTO));

        return categoryResponse;
    }

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        List<Category> allCategories = categoryRepo.findAll();

        boolean categoryExists = allCategories.stream().anyMatch(category -> category.getCategoryName()
            .equalsIgnoreCase(categoryDTO.getCategoryName())
        );

        if (categoryExists) {
            throw new APIException("Category with name: " + categoryDTO.getCategoryName() + " already exists!");
        }

        Category category = modelMapper.map(categoryDTO, Category.class);

        Category savedCategory = categoryRepo.save(category);

        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public CategoryDTO deleteCategory(Long categoryId) {
        Category searchedCategory = categoryRepo.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
        
        categoryRepo.delete(searchedCategory);

        return modelMapper.map(searchedCategory, CategoryDTO.class);
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryDTO, Long categoryId) {
        Category searchedCategory = categoryRepo.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        Category category = modelMapper.map(categoryDTO, Category.class);

        category.setCategoryId(categoryId);

        searchedCategory = categoryRepo.save(category);

        return modelMapper.map(searchedCategory, CategoryDTO.class);
    }
    
}
