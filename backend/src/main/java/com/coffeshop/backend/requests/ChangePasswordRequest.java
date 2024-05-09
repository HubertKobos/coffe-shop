package com.coffeshop.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChangePasswordRequest {
    private UUID id;
    private String oldPassword;
    private String newPassword;
}
