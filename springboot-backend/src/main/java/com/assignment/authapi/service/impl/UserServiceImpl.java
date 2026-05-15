package com.assignment.authapi.service.impl;

import org.springframework.stereotype.Service;

import com.assignment.authapi.dto.UserResponseDto;
import com.assignment.authapi.entity.User;
import com.assignment.authapi.exception.ApiException;
import com.assignment.authapi.mapper.UserMapper;
import com.assignment.authapi.repository.UserRepository;
import com.assignment.authapi.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponseDto getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));
        return userMapper.toUserResponseDto(user);
    }
}
