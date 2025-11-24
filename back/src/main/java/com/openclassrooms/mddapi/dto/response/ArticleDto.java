package com.openclassrooms.mddapi.dto.response;

import com.openclassrooms.mddapi.models.Article;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDto {

    private Integer id;

    private String title;

    private String content;

    private String authorUsername;

    private String themeTitle;

    private List<CommentDto> comments;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public ArticleDto(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.authorUsername = article.getAuthor().getUsername();
        this.themeTitle = article.getTheme().getTitle();
        this.createdAt = article.getCreatedAt();
        this.updatedAt = article.getUpdatedAt();
    }
}
