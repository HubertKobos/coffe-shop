package com.coffeshop.backend.services;

import com.coffeshop.backend.entities.UserEntity;
import com.coffeshop.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Log
public class UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<UserEntity> getUser(UUID userId) {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        return optionalUser;
    }


    public void updateUser(UserEntity user) {
        userRepository.save(user);
    }


    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }


    public Optional<UserEntity> findById(UUID id) {
        return userRepository.findById(id);
    }


    public boolean isPasswordMatch(String currentPasswordRaw, String currentPasswordEncoded) {
        return passwordEncoder.matches(currentPasswordRaw, currentPasswordEncoded);
    }


    public void setNewPassword(UserEntity userEntity, String newPassword) {
        userEntity.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(userEntity);
    }
}
