package com.coffeshop.backend.exceptions;

import org.springframework.http.HttpStatus;

public class ApiError {
    private final HttpStatus status;
    private final String message;

    public ApiError(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}