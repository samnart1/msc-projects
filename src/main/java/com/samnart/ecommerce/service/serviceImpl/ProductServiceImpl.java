package com.samnart.ecommerce.service.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.samnart.ecommerce.exception.APIException;
import com.samnart.ecommerce.exception.ResourceNotFoundException;
import com.samnart.ecommerce.model.Category;
import com.samnart.ecommerce.model.Product;
import com.samnart.ecommerce.payload.ProductDTO;
import com.samnart.ecommerce.payload.ProductResponse;
import com.samnart.ecommerce.repository.CategoryRepository;
import com.samnart.ecommerce.repository.ProductRepository;
import com.samnart.ecommerce.service.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CategoryRepository categoryRepo;

    @Autowired
    private ModelMapper modelMapper;
    

    @Override
    public ProductDTO addProduct(Long categoryId, ProductDTO productDTO) {
        Category category = categoryRepo.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        String productToLower = productDTO.getProductName().toLowerCase();

        boolean isProductNotPresent = true;

        List<Product> products = category.getProducts();
        for (Product value : products) {
            if (value.getProductName().toLowerCase().equals(productToLower)) {
                isProductNotPresent = false;
                throw new APIException("Product already exists");
            }
        }

        if (isProductNotPresent) {
            Product product = modelMapper.map(productDTO, Product.class);

            product.setImage("default.png");
            product.setCategory(category);
            
            double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());

            product.setSpecialPrice(specialPrice);

            Product savedProduct = productRepo.save(product);

            ProductDTO savedProductDTO = modelMapper.map(savedProduct, ProductDTO.class);

            return savedProductDTO;
        } else {
            throw new APIException("Product already exists");
        }
    }

    @Override
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        return null;
    }

    @Override
    public ProductResponse searchByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        return null;
    }

    @Override
    public ProductResponse searchProductByKeyword(
        String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
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
