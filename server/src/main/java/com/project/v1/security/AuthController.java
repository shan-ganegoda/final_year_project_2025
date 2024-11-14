package com.project.v1.security;

import com.project.v1.dto.*;
import com.project.v1.service.AuthService;
import com.project.v1.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final CookieProvider cookieProvider;
    private final UserService userService;

    @PostMapping(path = "/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request, HttpServletResponse response){
        AuthResponse auth = authService.login(request);
        response.addCookie(cookieProvider.createAuthCookie(auth.getAccessToken()));
        response.addCookie(cookieProvider.createRefreshCookie(auth.getRefreshToken()));

        return ResponseEntity.ok(auth);
    }

    @PostMapping(path = "/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Cookie refreshCookie = WebUtils.getCookie(request,"RefreshToken");

        if(refreshCookie != null){
            AuthResponse authResponse = authService.getRefreshToken(refreshCookie.getValue());
            response.addCookie(cookieProvider.createAuthCookie(authResponse.getAccessToken()));
        }
    }
}
