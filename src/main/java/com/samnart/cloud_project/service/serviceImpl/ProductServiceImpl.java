package com.samnart.cloud_project.service.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.samnart.cloud_project.exceptions.APIException;
import com.samnart.cloud_project.exceptions.ResourceNotFoundException;
import com.samnart.cloud_project.model.Category;
import com.samnart.cloud_project.model.Product;
import com.samnart.cloud_project.payload.dto.ProductDTO;
import com.samnart.cloud_project.payload.resonse.ProductResponse;
import com.samnart.cloud_project.repository.CategoryRepository;
import com.samnart.cloud_project.repository.ProductRepository;
import com.samnart.cloud_project.service.serviceInterface.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CategoryRepository categoryRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public ProductDTO addProduct(Long categoryId, ProductDTO productDTO) {
        Category category = categoryRepo.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category", "CategoryId", categoryId));

        String productDTOtoLower = productDTO.getProductName().toLowerCase();

        boolean isProductNotPresent = true;

        List<Product> products = category.getProducts();

        for (Product value : products) {
            if (value.getProductName().toLowerCase().equals(productDTOtoLower)) {
                isProductNotPresent = false;
                break;
            }
        }

        if (isProductNotPresent) {
            Product product = modelMapper.map(productDTO, Product.class);

            product.setImage("default.pn");
            product.setCategory(category);
            double specialPrice = product.getPrice() - ((product.getDiscount() * 0.001) * product.getPrice());
            product.setSpecialPrice(specialPrice);
            Product savedProduct = productRepo.save(product);

            ProductDTO saveProductDTO = modelMapper.map(savedProduct, ProductDTO.class);

            return saveProductDTO;
        } else {
            throw new APIException("Product already exists!");
        }

    }

    @Override
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder,
            String keyword, String category) {

                Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                    ? Sort.by(sortBy).ascending()
                    : Sort.by(sortBy).descending();
                
                Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

                Specification<Product> spec = Specification.where(null);
                if (keyword != null && !category.isEmpty()) {
                    spec = spec.and((root, query, criteriaBuilder) -> 
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("productName")), "%" + keyword.toLowerCase() + "%"));
                }
                
                return null;
    }

    @Override
    public ProductResponse searchByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy,
            String sortOrder) {
                return null;
    }

    @Override
    public ProductResponse searchByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy,
            String sortOrder) {
                return null;
    }

    @Override
    public ProductDTO updateProduct(ProductDTO productDTO, Long productId) {
        return null;
    }

    @Override
    public ProductDTO deleteProduct(Long productId) {
        return null;
    }

    @Override
    public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
        return null;
    }

    
    
}
