package com.project.v1.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
    @JsonProperty("Access_Token")
    private String accessToken;

    @JsonProperty("Refresh_Token")
    private String refreshToken;

    private AuthUser authUser;
}
