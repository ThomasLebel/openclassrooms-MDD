package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.request.UserUpdateRequest;
import com.openclassrooms.mddapi.dto.response.UserInfosResponse;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bcrypt;

    private final JWTService jWTService;

    public UserService(UserRepository userRepository, JWTService jWTService) {
        this.userRepository = userRepository;
        this.bcrypt = new BCryptPasswordEncoder();
        this.jWTService = jWTService;
    }

    public UserInfosResponse getMe(Authentication authentication) throws Exception {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return new UserInfosResponse(user);
    }

    public UserInfosResponse updateUserInfos(UserUpdateRequest userUpdateRequest,Authentication authentication) throws Exception {
        String newToken = null;
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if(!userUpdateRequest.getEmail().equals(user.getEmail())){
            if (userRepository.findByEmail(userUpdateRequest.getEmail()).isPresent()) {
                throw new Exception("Email already in use");
            } else {
                user.setEmail(userUpdateRequest.getEmail());
                newToken = jWTService.generateToken(user.getEmail());
            }
        }

        if(!userUpdateRequest.getUsername().equals(user.getUsername())){
            if (userRepository.findByUsername(userUpdateRequest.getUsername()).isPresent()) {
                throw new Exception("Username already in use");
            } else {
                user.setUsername(userUpdateRequest.getUsername());
            }
        }

        if (userUpdateRequest.getPassword() != null
                && !userUpdateRequest.getPassword().isEmpty()) {

            String hashPassword = bcrypt.encode(userUpdateRequest.getPassword());
            user.setPassword(hashPassword);
        }

        userRepository.save(user);
        UserInfosResponse userInfosResponse = new UserInfosResponse(user);
        userInfosResponse.setToken(newToken);
        return userInfosResponse;
    }

}
