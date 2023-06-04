package ru.volpi.qaadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.volpi.qaadmin.domain.user.UserAccount;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByUsername(String username);
}
