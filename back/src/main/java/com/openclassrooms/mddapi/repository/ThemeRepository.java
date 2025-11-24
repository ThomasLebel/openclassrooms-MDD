package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.models.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ThemeRepository extends JpaRepository<Theme, Integer> {
    @Query("SELECT t FROM Theme t JOIN t.subscribedUsers u WHERE u.id = :userId")
    List<Theme> findAllBySubscribedUserId(Integer userId);
}
