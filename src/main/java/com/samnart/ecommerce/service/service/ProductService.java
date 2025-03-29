package com.samnart.ecommerce.service.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.samnart.ecommerce.model.Product;

public interface ProductService {
    
    Product addProduct(Long categoryId, Product product);

    Product getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    Product searchProductByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    Product updateProduct(Product product, Long productId);

    Product deleteProduct(Long productId);

    Product updateProductImage(Long productId, MultipartFile image) throws IOException;
}
