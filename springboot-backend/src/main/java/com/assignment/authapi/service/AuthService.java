package com.assignment.authapi.service;

import com.assignment.authapi.dto.AuthResponseDto;
import com.assignment.authapi.dto.LoginRequestDto;
import com.assignment.authapi.dto.RegisterRequestDto;

public interface AuthService {

    AuthResponseDto register(RegisterRequestDto requestDto);

    AuthResponseDto login(LoginRequestDto requestDto);
}
