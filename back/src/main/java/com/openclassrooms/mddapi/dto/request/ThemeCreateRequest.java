package com.openclassrooms.mddapi.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class ThemeCreateRequest {

    @NotBlank(message = "Title is required")
    String title;

    @NotBlank(message = "Description is required")
    String description;

}
