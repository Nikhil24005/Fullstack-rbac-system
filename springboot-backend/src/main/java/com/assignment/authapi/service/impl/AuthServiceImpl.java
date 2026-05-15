package com.assignment.authapi.service.impl;

import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.assignment.authapi.dto.AuthResponseDto;
import com.assignment.authapi.dto.LoginRequestDto;
import com.assignment.authapi.dto.RegisterRequestDto;
import com.assignment.authapi.entity.User;
import com.assignment.authapi.exception.EmailAlreadyExistsException;
import com.assignment.authapi.exception.InvalidCredentialsException;
import com.assignment.authapi.mapper.UserMapper;
import com.assignment.authapi.repository.UserRepository;
import com.assignment.authapi.security.JwtService;
import com.assignment.authapi.security.UserPrincipal;
import com.assignment.authapi.service.AuthService;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private static final String INVALID_CREDENTIALS_MESSAGE = "Invalid email or password";

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(
            UserRepository userRepository,
            UserMapper userMapper,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public AuthResponseDto register(RegisterRequestDto requestDto) {
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already registered");
        }

        User user = userMapper.toEntity(requestDto);
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        User savedUser = userRepository.save(user);
        UserPrincipal principal = UserPrincipal.fromUser(savedUser);
        String token = jwtService.generateToken(Map.of("role", savedUser.getRole().name()), principal);

        return new AuthResponseDto(token, userMapper.toUserResponseDto(savedUser));
    }

    @Override
    public AuthResponseDto login(LoginRequestDto requestDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestDto.getEmail(), requestDto.getPassword()));
        } catch (AuthenticationException ex) {
            throw new InvalidCredentialsException(INVALID_CREDENTIALS_MESSAGE);
        }

        User user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException(INVALID_CREDENTIALS_MESSAGE));
        UserPrincipal principal = UserPrincipal.fromUser(user);
        String token = jwtService.generateToken(Map.of("role", user.getRole().name()), principal);

        return new AuthResponseDto(token, userMapper.toUserResponseDto(user));
    }
}
