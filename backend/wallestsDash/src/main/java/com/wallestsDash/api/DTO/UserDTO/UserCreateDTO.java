package com.wallestsDash.api.DTO.UserDTO;

import com.wallestsDash.domain.model.UserModel;

import lombok.Data;

@Data
public class UserCreateDTO {
	
	private String name;
	private String email;
	private String password;
	
	public UserCreateDTO() {
		
	}
	
	public UserCreateDTO(String name, String email, String password) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
	public UserCreateDTO(UserModel user) {
		super();
		this.name = user.getName();
		this.email = user.getEmail();
		this.password = user.getPassword();
	}

}
