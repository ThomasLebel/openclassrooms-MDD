package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT theme.id FROM User user JOIN user.subscribedThemes theme WHERE user.id = :userId")
    Set<Integer> findSubscribedThemeIds(Integer userId);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
}
