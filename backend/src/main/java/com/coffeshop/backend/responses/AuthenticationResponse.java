package com.coffeshop.backend.responses;

import com.coffeshop.backend.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private Integer id;
    private String email;
    private String firstName;
    private String surname;
    private String token;
    private Role role;
}
