package com.coffeshop.backend.requests;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String firstName;
    private String surname;
    private String password;
}