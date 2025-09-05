package com.invoice.invoice_generator.repository;


import com.invoice.invoice_generator.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository  extends JpaRepository<User, Long> {
    Optional<User> findByClerkId(String clerkId);

    boolean existsByClerkId(String clerkId);
}
