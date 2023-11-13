package com.wallestsDash.domain.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wallestsDash.api.DTO.UserDTO.UserCreateDTO;
import com.wallestsDash.api.DTO.UserDTO.UserDisplayDTO;
import com.wallestsDash.domain.Exception.ConflictException;
import com.wallestsDash.domain.Exception.DealException;
import com.wallestsDash.domain.Exception.UserNotFoundException;
import com.wallestsDash.domain.Exception.UserWrongPasswordException;
import com.wallestsDash.domain.model.UserModel;
import com.wallestsDash.domain.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public List<UserDisplayDTO> findAll(){
		List<UserModel> list = userRepository.findAll();
		return list.stream().map(user -> new UserDisplayDTO(user)).collect(Collectors.toList());
	}
	
	public UserDisplayDTO verifyAuthUser(String email, String password) {
		UserModel existUserModel = userRepository.findByEmail(email);
		if (existUserModel == null) {
			throw new UserNotFoundException("Não foi encontrado usuário para o email " + email);
		}
		if (!existUserModel.getPassword().toString().equals(password)) {
			throw new UserWrongPasswordException("Credenciais incorretas!");
		}
		
		return new UserDisplayDTO(existUserModel);
	}
	
	public UserDisplayDTO findById(Long userId) {
		UserModel user = userRepository.findById(userId).orElseThrow(() -> new DealException(String.format("User with id %d not found!", userId)));
		
		UserDisplayDTO userDisplayDTO = new UserDisplayDTO(user);
		
		return userDisplayDTO;
	}
	
	@Transactional
	public UserCreateDTO saveUser(UserCreateDTO userCreateDTO) {
		
		UserModel existUserModel = userRepository.findByEmail(userCreateDTO.getEmail());
		
		if (existUserModel != null) {
			throw new ConflictException("Email utilizado ja cadastrado");
		}
		
		UserModel userObj = new UserModel();
		userObj.setName(userCreateDTO.getName());
		userObj.setEmail(userCreateDTO.getEmail());
		userObj.setPassword(userCreateDTO.getPassword());
		
		userObj = userRepository.save(userObj);
		
		return new UserCreateDTO(userObj);
	}
	
	@Transactional
	public void deleteUser(Long userId) {
		try {
			userRepository.deleteById(userId);
			userRepository.flush();
		} catch (Exception e) {
			 throw new DealException(String.format("User with id %d not found!", userId));
		}
	}

}
