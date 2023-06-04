package ru.volpi.qaadmin.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.volpi.qaadmin.domain.user.UserAccount;
import ru.volpi.qaadmin.dto.user.AuthenticationRequest;
import ru.volpi.qaadmin.dto.user.AuthenticationResponse;
import ru.volpi.qaadmin.exception.user.UserAlreadyExistException;
import ru.volpi.qaadmin.repository.UserRepository;
import ru.volpi.qaadmin.web.security.service.JwtService;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(final AuthenticationRequest register) {
        if (this.userRepository.findByUsername(register.username()).isPresent()) {
            throw new UserAlreadyExistException(register.username());
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
        this.authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(auth.username(), auth.password())
        );
        final UserAccount user = this.userRepository.findByUsername(auth.username()).orElseThrow();
        final String token = this.jwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }

}
