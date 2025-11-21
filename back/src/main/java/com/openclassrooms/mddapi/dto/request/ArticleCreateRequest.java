package com.openclassrooms.mddapi.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ArticleCreateRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotNull
    private Integer themeId;

}
