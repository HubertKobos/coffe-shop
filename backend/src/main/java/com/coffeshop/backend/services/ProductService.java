package com.coffeshop.backend.services;

import com.coffeshop.backend.entities.ProductEntity;
import com.coffeshop.backend.exceptions.ProductExpcetions.ProductNotExistsException;
import com.coffeshop.backend.repositories.ProductRepository;
import com.coffeshop.backend.requests.CreateProductRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log
public class ProductService {
    private final ProductRepository productRepository;

    public List<ProductEntity> getAllProducts(){
        return productRepository.findAll();
    }

    public ProductEntity createProduct(CreateProductRequest createProductRequest){
        ProductEntity productEntity = new ModelMapper().map(createProductRequest, ProductEntity.class);
        return productRepository.save(productEntity);
    }

    public void deleteProductById(Integer productId) {
        Optional<ProductEntity> product = productRepository.findById(productId);
        if(!product.isPresent()){
            throw new ProductNotExistsException(String.format("Product with id %d not exist", productId), HttpStatus.NOT_FOUND);
        }else{
            productRepository.delete(product.get());
        }

    }

    public ProductEntity getProductById(Integer productId) {
        Optional<ProductEntity> product = productRepository.findById(productId);
        if(!product.isPresent()){
            throw new ProductNotExistsException(String.format("Product with id %d not exist", productId), HttpStatus.NOT_FOUND);
        }else{
            return product.get();
        }

    }

    public ProductEntity updateProduct(Integer productId, CreateProductRequest createProductRequest) {
        Optional<ProductEntity> product = productRepository.findById(productId);
        if(!product.isPresent()){
            throw new ProductNotExistsException(String.format("Product with id %d not exist", productId), HttpStatus.NOT_FOUND);
        }else{
            if(!product.get().getPrice().equals(createProductRequest.getPrice())) product.get().setPrice(createProductRequest.getPrice());
            if(!product.get().getName().equals(createProductRequest.getName())) product.get().setName(createProductRequest.getName());
            if(!Arrays.equals(product.get().getImage(), createProductRequest.getImage())) product.get().setImage(createProductRequest.getImage());
            if(!product.get().getIngredients().equals(createProductRequest.getIngredients())) product.get().setIngredients(!createProductRequest.getIngredients().isEmpty() ? createProductRequest.getIngredients() : Collections.emptyList());
            if(!product.get().getAdditionalInformation().equals(createProductRequest.getAdditionalInformation())) product.get().setAdditionalInformation(createProductRequest.getAdditionalInformation());
        }
        return productRepository.save(product.get());
    }
}
