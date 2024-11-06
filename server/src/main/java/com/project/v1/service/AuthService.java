package com.project.v1.service;

import com.project.v1.dto.AuthResponse;
import com.project.v1.dto.LoginRequest;
import com.project.v1.dto.RegisterRequest;

public interface AuthService {
    AuthResponse login(LoginRequest request);

    AuthResponse register(RegisterRequest request);

    AuthResponse getRefreshToken(String value);
}
