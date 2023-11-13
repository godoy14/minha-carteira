package com.wallestsDash.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.wallestsDash.api.DTO.UserDTO.UserCreateDTO;
import com.wallestsDash.api.DTO.UserDTO.UserDisplayDTO;
import com.wallestsDash.domain.service.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping
	public List<UserDisplayDTO> listar() {
		return userService.findAll();
	}
	
	@GetMapping("/{userId}")
	@ResponseStatus(HttpStatus.OK)
	public UserDisplayDTO getUserById(@PathVariable Long userId) {
		return userService.findById(userId);
	}
	
	@GetMapping("/verifyAuth")
	@ResponseStatus(HttpStatus.OK)
	public UserDisplayDTO verifyAuthUser(@RequestParam String email, @RequestParam String password) {
		return userService.verifyAuthUser(email, password);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public UserCreateDTO addUser(@RequestBody UserCreateDTO userCreate) {
		return userService.saveUser(userCreate);
	}
	
	@DeleteMapping("/{userId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable Long userId) {
		userService.deleteUser(userId);
	}

}
