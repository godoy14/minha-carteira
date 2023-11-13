package com.wallestsDash.domain.Exception;

public class UserWrongPasswordException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public UserWrongPasswordException(String msg) {
		super(msg);
	}

}
