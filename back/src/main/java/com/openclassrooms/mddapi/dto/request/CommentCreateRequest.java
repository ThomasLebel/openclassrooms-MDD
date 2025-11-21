package com.openclassrooms.mddapi.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CommentCreateRequest {

    @NotNull
    private Long articleId;

    @NotBlank
    private String content;

}
