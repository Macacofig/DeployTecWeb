package com.shopwavefusion.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.shopwavefusion.config.JwtTokenProvider;
import com.shopwavefusion.exception.UserException;
import com.shopwavefusion.modal.User;
import com.shopwavefusion.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {
	
	private UserRepository userRepository;
	private JwtTokenProvider jwtTokenProvider;
	
	public UserServiceImplementation(UserRepository userRepository,JwtTokenProvider jwtTokenProvider) {
		
		this.userRepository=userRepository;
		this.jwtTokenProvider=jwtTokenProvider;
		
	}

	@Override
	public User findUserById(Long userId) throws UserException {
		Optional<User> user=userRepository.findById(userId);
		
		if(user.isPresent()){
			return user.get();
		}
		throw new UserException("user not found with id "+userId);
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		System.out.println("user service");
		String email=jwtTokenProvider.getEmailFromJwtToken(jwt);

		
		User user=userRepository.findByEmail(email);
		
		
		
		if(user==null) {
			throw new UserException("user not exist with email "+email);
		}
		return user;
	}

	@Override
	public User updateUserProfileByJwt(String jwt, User updatedUser) throws UserException {
		String email = jwtTokenProvider.getEmailFromJwtToken(jwt);
		User currentUser = userRepository.findByEmail(email);

		if (currentUser == null) {
			throw new UserException("user not exist with email " + email);
		}

		if (updatedUser.getFirstName() != null && !updatedUser.getFirstName().trim().isEmpty()) {
			currentUser.setFirstName(updatedUser.getFirstName().trim());
		}
		if (updatedUser.getLastName() != null && !updatedUser.getLastName().trim().isEmpty()) {
			currentUser.setLastName(updatedUser.getLastName().trim());
		}
		if (updatedUser.getMobile() != null && !updatedUser.getMobile().trim().isEmpty()) {
			currentUser.setMobile(updatedUser.getMobile().trim());
		}

		return userRepository.save(currentUser);
	}

}
