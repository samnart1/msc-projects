package com.samnart.ecommerce.service.serviceImpl;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.samnart.ecommerce.model.Product;
import com.samnart.ecommerce.service.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Override
    public Product addProduct(Long categoryId, Product product) {
        return null;
    }

    @Override
    public Product getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        return null;
    }

    @Override
    public Product searchProductByKeyword(
        String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
            return null;
    }

    @Override
    public Product updateProduct(Product product, Long productId) {
        return null;
    }

    @Override
    public Product deleteProduct(Long productId) {
        return null;
    }

    @Override
    public Product updateProductImage(Long productId, MultipartFile image) throws IOException {
        return null;
    }
    
}
