package com.assignment.authapi.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.authapi.dto.DashboardSummaryDto;
import com.assignment.authapi.entity.Role;
import com.assignment.authapi.repository.UserRepository;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private static final String TITLE = "Dashboard Overview";
    private static final String SUBTITLE = "Current system stats";

    private final UserRepository userRepository;

    public DashboardController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/summary")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<DashboardSummaryDto> getDashboardSummary() {
        long totalUsers = userRepository.count();
        long adminUsers = userRepository.countByRole(Role.ADMIN);
        long regularUsers = totalUsers - adminUsers;

        return ResponseEntity.ok(new DashboardSummaryDto(TITLE, SUBTITLE, List.of(
            Map.of("label", "Total Users", "value", String.valueOf(totalUsers)),
            Map.of("label", "Admin Users", "value", String.valueOf(adminUsers)),
            Map.of("label", "Regular Users", "value", String.valueOf(regularUsers))
        )));
    }
}
