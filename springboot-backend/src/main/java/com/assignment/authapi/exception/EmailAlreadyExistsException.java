package com.assignment.authapi.exception;

public class EmailAlreadyExistsException extends ApiException {

    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
