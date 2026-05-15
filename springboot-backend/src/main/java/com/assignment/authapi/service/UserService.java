package com.assignment.authapi.service;

import com.assignment.authapi.dto.UserResponseDto;

public interface UserService {

    UserResponseDto getCurrentUser(String email);
}
