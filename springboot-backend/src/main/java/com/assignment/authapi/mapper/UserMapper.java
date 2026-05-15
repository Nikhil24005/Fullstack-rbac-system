package com.assignment.authapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.assignment.authapi.dto.RegisterRequestDto;
import com.assignment.authapi.dto.UserResponseDto;
import com.assignment.authapi.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDto toUserResponseDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    User toEntity(RegisterRequestDto dto);
}
