package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.request.ThemeCreateRequest;
import com.openclassrooms.mddapi.dto.response.ErrorResponse;
import com.openclassrooms.mddapi.dto.response.MessageResponse;
import com.openclassrooms.mddapi.dto.response.ThemeDto;
import com.openclassrooms.mddapi.services.ThemeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "api/themes")
public class ThemeController {

    private final ThemeService themeService;

    public ThemeController(ThemeService themeService) {
        this.themeService = themeService;
    }

    @PostMapping(path = "/create")
    public ResponseEntity<?> create(@RequestBody @Valid ThemeCreateRequest themeCreateRequest, BindingResult bindingResult) {

        if(bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        try {
            MessageResponse messageResponse = themeService.createTheme(themeCreateRequest);
            return ResponseEntity.ok(messageResponse);

        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
        }

    }

    @GetMapping(path = "")
    public ResponseEntity<?> getAllThemes(Authentication authentication) {
        try {
            List<ThemeDto> themes = themeService.getAllThemes(authentication);
            return ResponseEntity.ok(themes);

        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
        }

    }

    @GetMapping(path = "/subscribed")
    public ResponseEntity<?> getSubscribedThemes(Authentication authentication) {
        try {
            List<ThemeDto> themes = themeService.getSubscribedThemes(authentication);
            return ResponseEntity.ok(themes);

        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
        }

    }

    @PutMapping(path = "/subscribe/{id}")
    public ResponseEntity<?> subscribe(Authentication authentication, @PathVariable Integer id) {
        try {
            MessageResponse message = themeService.subscribeTheme(authentication, id);
            return ResponseEntity.ok(message);

        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
        }

    }

    @PutMapping(path = "/unsubscribe/{id}")
    public ResponseEntity<?> unsubscribe(Authentication authentication, @PathVariable Integer id) {
        try {
            MessageResponse message = themeService.unsubscribeTheme(authentication, id);
            return ResponseEntity.ok(message);

        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
        }

    }
}
