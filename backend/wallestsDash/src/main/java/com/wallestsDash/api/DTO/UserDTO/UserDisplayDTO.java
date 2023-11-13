package com.wallestsDash.api.DTO.UserDTO;

import java.util.Optional;

import com.wallestsDash.domain.model.UserModel;

import lombok.Data;

@Data
public class UserDisplayDTO {
	
	private Long id;
	private String name;
	private String email;
	private String password;
	
	public UserDisplayDTO() {
		
	}
	
	public UserDisplayDTO(Long id, String name, String email, String password) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
	public UserDisplayDTO(UserModel user) {
		super();
		this.id = user.getId();
		this.name = user.getName();
		this.email = user.getEmail();
		this.password = user.getPassword();
	}
	
	public UserDisplayDTO(Optional<UserModel> user) {
		super();
		this.id = user.get().getId();
		this.name = user.get().getName();
		this.email = user.get().getEmail();
		this.password = user.get().getPassword();
	}

}
