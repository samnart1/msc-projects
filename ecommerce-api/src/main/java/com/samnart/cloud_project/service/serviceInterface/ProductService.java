package com.samnart.cloud_project.service.serviceInterface;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.samnart.cloud_project.payload.dto.ProductDTO;
import com.samnart.cloud_project.payload.resonse.ProductResponse;

public interface ProductService {
    
    ProductDTO addProduct(Long categoryId, ProductDTO productDTO);
    
    ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword, String category);

    ProductResponse searchByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse searchByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductDTO updateProduct(ProductDTO productDTO, Long productId);

    ProductDTO deleteProduct(Long productId);

    ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException;
    
}
