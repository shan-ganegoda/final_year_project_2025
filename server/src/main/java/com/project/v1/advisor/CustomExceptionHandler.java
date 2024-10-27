package com.project.v1.advisor;

import com.project.v1.dto.StandardResponse;
import com.project.v1.exception.ResourceAlreadyExistException;
import com.project.v1.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<StandardResponse> handleResourceNotFoundException(ResourceNotFoundException exception){
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(404,"Error",exception), HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(ResourceAlreadyExistException.class)
    public ResponseEntity<StandardResponse> handleResourceAlreadyExistException(ResourceAlreadyExistException exception){
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(302,"Error",exception), HttpStatus.FOUND
        );
    }
}
