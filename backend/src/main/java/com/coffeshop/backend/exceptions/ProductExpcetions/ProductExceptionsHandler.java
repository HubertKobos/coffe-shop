package com.coffeshop.backend.exceptions.ProductExpcetions;

import com.coffeshop.backend.exceptions.ApiError;
import com.coffeshop.backend.exceptions.userExceptions.UserNotExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ProductExceptionsHandler {
    @ExceptionHandler(ProductNotExistsException.class)
    protected ResponseEntity<Object> handleProductNotExistsException(UserNotExistsException ex) {
        ApiError apiError = new ApiError(ex.getHttpStatus(), ex.getMessage());
        return buildResponseEntity(apiError);
    }
    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
