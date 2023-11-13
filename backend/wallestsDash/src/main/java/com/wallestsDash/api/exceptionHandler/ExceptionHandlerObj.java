package com.wallestsDash.api.exceptionHandler;

import java.time.OffsetDateTime;

import lombok.Data;

@Data
public class ExceptionHandlerObj {
	
	private Integer status;
	private OffsetDateTime dateTime;
	private String title;

}
