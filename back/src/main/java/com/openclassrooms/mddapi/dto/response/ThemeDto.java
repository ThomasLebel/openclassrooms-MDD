package com.openclassrooms.mddapi.dto.response;

import com.openclassrooms.mddapi.models.Theme;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ThemeDto {
    private Integer id;
    private String title;
    private String description;
    private boolean subscribed;

    public ThemeDto(Theme theme, Boolean subscribed){
        this.id = theme.getId();
        this.title = theme.getTitle();
        this.description = theme.getDescription();
        this.subscribed = subscribed;
    }
}
