package com.assignment.authapi.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.authapi.dto.UserResponseDto;
import com.assignment.authapi.security.UserPrincipal;
import com.assignment.authapi.service.UserService;

@RestController
@RequestMapping("/api")
public class SampleController {

    private final UserService userService;

    public SampleController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/public")
    public ResponseEntity<Map<String, String>> publicEndpoint() {
        return ResponseEntity.ok(Map.of("message", "Public endpoint"));
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<UserResponseDto> userEndpoint(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(userService.getCurrentUser(principal.getUsername()));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> adminEndpoint() {
        return ResponseEntity.ok(Map.of("message", "Admin endpoint"));
    }
}
