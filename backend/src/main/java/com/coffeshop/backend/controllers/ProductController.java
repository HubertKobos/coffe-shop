package com.coffeshop.backend.controllers;

import com.coffeshop.backend.entities.ProductEntity;
import com.coffeshop.backend.requests.CreateProductRequest;
import com.coffeshop.backend.services.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Log
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductEntity>> getAllProducts(){
        List<ProductEntity> allProducts = productService.getAllProducts();
        return ResponseEntity.ok(allProducts);
    }

    @PostMapping
    public ResponseEntity<ProductEntity> createProduct(@RequestParam String productName,
                                                       @RequestParam BigDecimal price,
                                                       @RequestParam MultipartFile image,
                                                       @RequestParam List<String> ingredients,
                                                       @RequestParam String additionalInformation) throws IOException {

        CreateProductRequest createProductRequest = CreateProductRequest.builder()
                .name(productName)
                .price(price)
                .image(image.getBytes())
                .ingredients(ingredients)
                .additionalInformation(additionalInformation)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(createProductRequest));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity deleteProduct(@PathVariable Integer productId){
        productService.deleteProductById(productId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable Integer productId){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductById(productId));
    }

    @PatchMapping("/{productId}")
    public ResponseEntity<ProductEntity> updateProduct(@PathVariable Integer productId,
                                                       @RequestParam String productName,
                                                       @RequestParam BigDecimal price,
                                                       @RequestParam(required = false) MultipartFile image,
                                                       @RequestParam List<String> ingredients,
                                                       @RequestParam String additionalInformation) throws IOException {

        CreateProductRequest createProductRequest = CreateProductRequest.builder()
                .name(productName)
                .price(price)
                .image(image == null ? null : image.getBytes())
                .ingredients(ingredients)
                .additionalInformation(additionalInformation)
                .build();

        ProductEntity productEntity = productService.updateProduct(productId, createProductRequest);
        return ResponseEntity.status(HttpStatus.OK).body(productEntity);
    }
}
