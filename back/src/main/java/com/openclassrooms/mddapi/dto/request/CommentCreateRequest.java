package com.openclassrooms.mddapi.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CommentCreateRequest {

    @NotNull(message = "Article ID is required")
    private Integer articleId;

    @NotBlank(message = "Content is required")
    private String content;

}
