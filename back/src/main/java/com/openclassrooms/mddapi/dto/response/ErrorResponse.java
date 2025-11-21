package com.openclassrooms.mddapi.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ErrorResponse {
    private String error;

    private int status;

    public ErrorResponse(String error, int status){
        this.error = error;
        this.status = status;
    }

}
