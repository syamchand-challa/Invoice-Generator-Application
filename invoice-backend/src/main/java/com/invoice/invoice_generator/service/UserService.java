package com.invoice.invoice_generator.service;


import com.invoice.invoice_generator.entity.User;
import com.invoice.invoice_generator.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User saveOrUpdateUser(User user) {
        Optional<User> optionalUser = userRepository.findByClerkId(user.getClerkId());
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setEmail(user.getEmail());
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setPhotoUrl(user.getPhotoUrl());
            existingUser = userRepository.save(existingUser);
            return existingUser;
        }
        return userRepository.save(user);
    }

    public void deleteAccount(String clerkId) {
        User existingUser = userRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userRepository.delete(existingUser);
    }

    public User getAccountByClerkId(String clerkId) {
        return userRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }
}


