package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.request.ArticleCreateRequest;
import com.openclassrooms.mddapi.dto.response.ArticleDto;
import com.openclassrooms.mddapi.dto.response.ErrorResponse;
import com.openclassrooms.mddapi.dto.response.MessageResponse;
import com.openclassrooms.mddapi.services.ArticleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestBody @Valid ArticleCreateRequest articleCreateRequest , BindingResult bindingResult, Authentication authentication) {

        if(bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        try {
            MessageResponse messageResponse = articleService.postArticle(articleCreateRequest, authentication);
            return ResponseEntity.ok(messageResponse);
        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
        }

    }

    @GetMapping(path = "")
    public ResponseEntity<?> getAllArticles() {
        try {
            List<ArticleDto> articles = articleService.getAllArticles();
            return ResponseEntity.ok(articles);

        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
        }

    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getArticleById(@PathVariable("id") Integer id) {
        try {
            ArticleDto article = articleService.getArticleById(id);
            return ResponseEntity.ok(article);

        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
        }

    }
}
