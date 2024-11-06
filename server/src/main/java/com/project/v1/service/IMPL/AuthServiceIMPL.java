package com.project.v1.service.IMPL;

import com.project.v1.dto.*;
import com.project.v1.entity.User;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.UserRepository;
import com.project.v1.security.JwtService;
import com.project.v1.service.AuthService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceIMPL implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ObjectMapper objectMapper;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;


    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(null);
        UserDTO userDTO = objectMapper.userToUserDto(user);

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .authUser(
                        AuthUser.builder()
                                .user(userDTO)
                                .authorities(getUserAuthoritiesByUsername(request.getUsername()))
                                .build()
                )
                .build();
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .employee(request.getEmployee())
                .role(request.getRole())
                .userstatus(request.getUserstatus())
                .docreated(LocalDate.now())
                .dolastupdated(LocalDate.now())
                .description("No Description")
                .build();

        var savedUser = userRepository.save(user);

        var jwtToken = jwtService.generateToken(savedUser);
        var refreshToken = jwtService.generateRefreshToken(savedUser);

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public AuthResponse getRefreshToken(String value) {

        User user = userRepository.findByUsername(jwtService.extractUsername(value)).orElseThrow();
        UserDTO userdto = objectMapper.userToUserDto(user);

        if (
                jwtService.isTokenValid(value, user)
        ) {
            String accessToken = jwtService.generateToken(user);

            return AuthResponse.builder()
                    .accessToken(accessToken)
                    .authUser(
                            AuthUser.builder()
                                    .user(userdto)
                                    .authorities(getUserAuthoritiesByUsername(user.getUsername()))
                                    .build()
                    )
                    .build();
        }else
            throw new ResourceNotFoundException("Invalid Refresh Token");
            //need to be an Authentication Exception
    }

    private List<String> getUserAuthoritiesByUsername(String username){
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        return userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();
    }

}
