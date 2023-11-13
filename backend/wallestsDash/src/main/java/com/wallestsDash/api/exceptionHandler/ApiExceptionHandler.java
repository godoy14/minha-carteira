package com.wallestsDash.api.exceptionHandler;

import java.time.OffsetDateTime;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.wallestsDash.domain.Exception.ConflictException;
import com.wallestsDash.domain.Exception.DealException;
import com.wallestsDash.domain.Exception.UserNotFoundException;
import com.wallestsDash.domain.Exception.UserWrongPasswordException;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler{
	
	@ExceptionHandler(DealException.class)
	public ResponseEntity<Object> handleDealException(DealException ex, WebRequest request) {
		
		var status = HttpStatus.NOT_FOUND;
		
		ExceptionHandlerObj exceptionHandlerObj = new ExceptionHandlerObj();
		exceptionHandlerObj.setStatus(status.value());
		exceptionHandlerObj.setDateTime(OffsetDateTime.now());
		exceptionHandlerObj.setTitle(ex.getMessage());
		
		return handleExceptionInternal(ex, exceptionHandlerObj, new HttpHeaders(), status, request);
		
	}
	
	@ExceptionHandler(ConflictException.class)
	public ResponseEntity<Object> handleConflictException(ConflictException ex, WebRequest request) {
		
		var status = HttpStatus.CONFLICT;
		
		ExceptionHandlerObj exceptionHandlerObj = new ExceptionHandlerObj();
		exceptionHandlerObj.setStatus(status.value());
		exceptionHandlerObj.setDateTime(OffsetDateTime.now());
		exceptionHandlerObj.setTitle(ex.getMessage());
		
		return handleExceptionInternal(ex, exceptionHandlerObj, new HttpHeaders(), status, request);
		
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<Object> handleConflictException(UserNotFoundException ex, WebRequest request) {
		
		var status = HttpStatus.NOT_FOUND;
		
		ExceptionHandlerObj exceptionHandlerObj = new ExceptionHandlerObj();
		exceptionHandlerObj.setStatus(status.value());
		exceptionHandlerObj.setDateTime(OffsetDateTime.now());
		exceptionHandlerObj.setTitle(ex.getMessage());
		
		return handleExceptionInternal(ex, exceptionHandlerObj, new HttpHeaders(), status, request);
		
	}
	
	@ExceptionHandler(UserWrongPasswordException.class)
	public ResponseEntity<Object> handleConflictException(UserWrongPasswordException ex, WebRequest request) {
		
		var status = HttpStatus.UNAUTHORIZED;
		
		ExceptionHandlerObj exceptionHandlerObj = new ExceptionHandlerObj();
		exceptionHandlerObj.setStatus(status.value());
		exceptionHandlerObj.setDateTime(OffsetDateTime.now());
		exceptionHandlerObj.setTitle(ex.getMessage());
		
		return handleExceptionInternal(ex, exceptionHandlerObj, new HttpHeaders(), status, request);
		
	}


}
