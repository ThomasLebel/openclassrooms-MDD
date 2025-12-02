package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.request.LoginRequest;
import com.openclassrooms.mddapi.dto.request.RegisterRequest;
import com.openclassrooms.mddapi.dto.response.LoginResponse;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bcrypt;
    private final JWTService jwtService;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder bcrypt, JWTService jwtService) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.jwtService = jwtService;
    }

    public LoginResponse register(RegisterRequest registerRequest) throws Exception {
        Optional<User> existingUser =  userRepository.findByEmail(registerRequest.getEmail());
        if(existingUser.isPresent()){
            throw new Exception("Email already exists");
        }
        existingUser = userRepository.findByUsername(registerRequest.getUsername());
        if(existingUser.isPresent()){
            throw new Exception("Username already exists");
        }
        String hashPassword = bcrypt.encode(registerRequest.getPassword());
        User user = new User(registerRequest.getUsername(), registerRequest.getEmail(), hashPassword);
        userRepository.save(user);
        String token = jwtService.generateToken(registerRequest.getEmail());
        return new LoginResponse(token);
    }

    public LoginResponse login(LoginRequest loginRequest) throws Exception {
        Optional<User> existingUser =  userRepository.findByEmail(loginRequest.getLogin());
        if(existingUser.isEmpty()){
            existingUser = userRepository.findByUsername(loginRequest.getLogin());
        }

        if(existingUser.isEmpty()){
            throw new Exception("User not found");
        }

        if(!bcrypt.matches(loginRequest.getPassword(), existingUser.get().getPassword())){
            throw new Exception("Wrong password");
        }

        String token = jwtService.generateToken(existingUser.get().getEmail());
        return new LoginResponse(token);

    }
}
