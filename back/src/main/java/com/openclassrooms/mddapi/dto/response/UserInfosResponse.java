package com.openclassrooms.mddapi.dto.response;

import com.openclassrooms.mddapi.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfosResponse {
    private String username;

    private String email;

    public UserInfosResponse(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
