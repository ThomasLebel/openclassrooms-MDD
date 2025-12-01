package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.request.ArticleCreateRequest;
import com.openclassrooms.mddapi.dto.response.ArticleDto;
import com.openclassrooms.mddapi.dto.response.CommentDto;
import com.openclassrooms.mddapi.dto.response.MessageResponse;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService {


    ArticleRepository articleRepository;
    ThemeRepository themeRepository;
    UserRepository userRepository;

    public ArticleService(ArticleRepository articleRepository, ThemeRepository themeRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.themeRepository = themeRepository;
        this.userRepository = userRepository;
    }

    public MessageResponse postArticle(ArticleCreateRequest articleCreateRequest, Authentication authentication) {
        String email =  authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Theme theme = themeRepository.findById(articleCreateRequest.getThemeId()).orElseThrow(() -> new RuntimeException("Theme not found"));
        Article article = new Article(articleCreateRequest.getTitle(), articleCreateRequest.getContent(), user, theme);
        articleRepository.save(article);
        return new MessageResponse("Article created successfully");
    }

    public List<ArticleDto> getAllSubscribedArticles(Authentication authentication){
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        List<Article> articles = userRepository.findSubscribedArticles(user.getId());
        return articles.stream()
                .map(ArticleDto::new)
                .collect(Collectors.toList());
    }

    public ArticleDto getArticleById(Integer articleId){
        Article article = articleRepository.findById(articleId).orElseThrow(() -> new RuntimeException("Article not found"));
        ArticleDto articleDto = new ArticleDto(article);
        articleDto.setComments(
                article.getComments()
                        .stream()
                        .map(CommentDto::new)
                        .collect(Collectors.toList())
        );
        return articleDto;
    }
}
