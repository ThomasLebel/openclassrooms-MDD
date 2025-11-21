package com.openclassrooms.mddapi.dto.response;

import com.openclassrooms.mddapi.models.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private String authorUsername;

    private String content;

    private LocalDateTime commentDate;

    public CommentDto(Comment comment) {
        this.authorUsername = comment.getAuthor().getUsername();
        this.content = comment.getContent();
        this.commentDate = comment.getCreatedAt();
    }

}
