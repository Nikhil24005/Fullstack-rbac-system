package com.assignment.authapi.exception;

public class ApiException extends RuntimeException {

    public ApiException(String message) {
        super(message);
    }
}
