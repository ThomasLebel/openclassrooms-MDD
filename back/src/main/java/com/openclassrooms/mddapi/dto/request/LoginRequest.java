package com.openclassrooms.mddapi.dto.request;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotBlank;

import javax.validation.constraints.Pattern;

@Getter
@Setter
public class LoginRequest {
    @NotBlank(message = "Username or email is required")
    private String login;

    @NotBlank(message = "Password is required")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "The password must contain at least 8 characters, one uppercase letter, one digit, and one special character."

    )
    private String password;

}
