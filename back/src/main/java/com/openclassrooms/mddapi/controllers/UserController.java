package com.openclassrooms.mddapi.controllers;
import com.openclassrooms.mddapi.dto.request.UserUpdateRequest;
import com.openclassrooms.mddapi.dto.response.ErrorResponse;
import com.openclassrooms.mddapi.dto.response.UserInfosResponse;
import com.openclassrooms.mddapi.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "")
    public ResponseEntity<?> getMe(Authentication authentication) {
        try {
            UserInfosResponse response = userService.getMe(authentication);
            return ResponseEntity.ok(response);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(e.getMessage(), HttpStatus.UNAUTHORIZED.value()));
        }
    }

    @PutMapping(path = "")
    public ResponseEntity<?> update(@RequestBody @Valid UserUpdateRequest userUpdateRequest, BindingResult bindingResult, Authentication authentication) {
        if(bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        try {
            UserInfosResponse response = userService.updateUserInfos(userUpdateRequest,authentication);
            return ResponseEntity.ok(response);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(e.getMessage(), HttpStatus.UNAUTHORIZED.value()));
        }
    }
}
