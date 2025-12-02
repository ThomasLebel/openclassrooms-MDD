package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.request.CommentCreateRequest;
import com.openclassrooms.mddapi.dto.response.CommentDto;
import com.openclassrooms.mddapi.dto.response.MessageResponse;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
    }

    public CommentDto addComment(CommentCreateRequest commentCreateRequest, Authentication authentication) {
        String email =  authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Article article = articleRepository.findById(commentCreateRequest.getArticleId()).orElseThrow(() -> new RuntimeException("Article not found"));
        Comment comment = new Comment(commentCreateRequest.getContent(), user, article);
        commentRepository.save(comment);
        return new CommentDto(comment.getAuthor().getUsername(), comment.getContent(), comment.getCreatedAt());
    }
}
