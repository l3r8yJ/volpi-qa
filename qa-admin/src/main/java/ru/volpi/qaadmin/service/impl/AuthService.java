package ru.volpi.qaadmin.service.impl;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.volpi.qaadmin.domain.user.UserAccount;
import ru.volpi.qaadmin.dto.user.AuthenticationRequest;
import ru.volpi.qaadmin.dto.user.AuthenticationResponse;
import ru.volpi.qaadmin.exception.user.UserAlreadyExistException;
import ru.volpi.qaadmin.exception.user.UserValidationException;
import ru.volpi.qaadmin.repository.UserRepository;
import ru.volpi.qaadmin.service.annotation.TransactionalService;
import ru.volpi.qaadmin.web.security.service.JwtService;

import java.util.Set;

@Service
@TransactionalService
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final Validator validator;

    @Transactional
    public AuthenticationResponse register(final AuthenticationRequest register) {
        if (this.userRepository.findByUsername(register.username()).isPresent()) {
            throw new UserAlreadyExistException(register.username());
        }
        final Set<ConstraintViolation<Object>> violations = this.validator.validate(register);
        if (!violations.isEmpty()) {
            throw new UserValidationException(violations);
        }
        final UserAccount account = UserAccount.builder()
            .username(register.username())
            .password(this.passwordEncoder.encode(register.password()))
            .role("ADMIN")
            .build();
        this.userRepository.save(account);
        final String token = this.jwtService.generateToken(account);
        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(final AuthenticationRequest auth) {
        final UserAccount user = this.userRepository.findByUsername(auth.username()).orElseThrow(
            () -> new UsernameNotFoundException(
                "Пользователь с именем: '%s' не найден ".formatted(auth.username())
            )
        );
        this.authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(auth.username(), auth.password())
        );
        final String token = this.jwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }

}
