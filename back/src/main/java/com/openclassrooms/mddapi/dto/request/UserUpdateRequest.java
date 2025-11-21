package com.openclassrooms.mddapi.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserUpdateRequest {

    @NotBlank
    private String username;

    @NotBlank
    @Email
    private String email;

    private String password;
}
