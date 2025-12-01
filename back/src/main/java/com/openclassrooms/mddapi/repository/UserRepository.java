package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT theme.id FROM User user JOIN user.subscribedThemes theme WHERE user.id = :userId")
    Set<Integer> findSubscribedThemeIds(Integer userId);

    @Query("SELECT a FROM User u JOIN u.subscribedThemes t JOIN t.articles a WHERE u.id = :userID")
    List<Article> findSubscribedArticles(Integer userID);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
}
