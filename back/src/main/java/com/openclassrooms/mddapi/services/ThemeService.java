package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.request.ThemeCreateRequest;
import com.openclassrooms.mddapi.dto.response.MessageResponse;
import com.openclassrooms.mddapi.dto.response.ThemeDto;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ThemeService {
    ArticleRepository articleRepository;
    ThemeRepository themeRepository;
    UserRepository userRepository;

    public ThemeService(ArticleRepository articleRepository, ThemeRepository themeRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.themeRepository = themeRepository;
        this.userRepository = userRepository;
    }

    public MessageResponse createTheme(ThemeCreateRequest themeCreateRequest) {
        Theme theme = new Theme(themeCreateRequest.getTitle(), themeCreateRequest.getDescription());
        themeRepository.save(theme);
        return  new MessageResponse("Theme created successfully");
    }

    public List<ThemeDto> getAllThemes(Authentication authentication) {
        String email = authentication.getName();
        User user =  userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        List<Theme> themes = themeRepository.findAll();
        Set<Integer> subscribedThemesIds = userRepository.findSubscribedThemeIds(user.getId());

        return themes.stream()
                .map(theme -> new ThemeDto(
                        theme,
                        subscribedThemesIds.contains(theme.getId())
                )).collect(Collectors.toList());

    }

    public List<ThemeDto> getSubscribedThemes(Authentication authentication) {
        String email = authentication.getName();
        User user =  userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return themeRepository
                .findAllBySubscribedUserId(user.getId())
                .stream()
                .map(theme -> new ThemeDto(theme, true))
                .collect(Collectors.toList());
    }

    public MessageResponse subscribeTheme(Authentication authentication, Integer themeId) {
        String email = authentication.getName();
        User user =  userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Theme theme =  themeRepository.findById(themeId).orElseThrow(() -> new RuntimeException("Theme not found"));

        if(user.getSubscribedThemes().contains(theme)){
            throw new RuntimeException("Theme is already subscribed");
        }

        user.getSubscribedThemes().add(theme);
        theme.getSubscribedUsers().add(user);
        userRepository.save(user);
        return new MessageResponse("Theme subscribed successfully");
    }

    public MessageResponse unsubscribeTheme(Authentication authentication, Integer themeId) {
        String email = authentication.getName();
        User user =  userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Theme theme =  themeRepository.findById(themeId).orElseThrow(() -> new RuntimeException("Theme not found"));

        if(user.getSubscribedThemes().contains(theme)){
            user.getSubscribedThemes().remove(theme);
            theme.getSubscribedUsers().remove(user);
            userRepository.save(user);
            return new MessageResponse("Theme unsubscribed successfully");
        } else {
            throw new RuntimeException("Theme not subscribed");
        }
    }
}
