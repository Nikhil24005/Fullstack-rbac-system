package com.assignment.authapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment.authapi.entity.Role;
import com.assignment.authapi.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByRole(Role role);
}
