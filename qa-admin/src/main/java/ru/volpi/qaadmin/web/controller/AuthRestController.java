package ru.volpi.qaadmin.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.volpi.qaadmin.dto.user.AuthenticationRequest;
import ru.volpi.qaadmin.dto.user.AuthenticationResponse;
import ru.volpi.qaadmin.service.impl.AuthService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AuthRestController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody final AuthenticationRequest register) {
        return ResponseEntity.ok(this.authService.register(register));
    }

    @PostMapping("/auth")
    public ResponseEntity<AuthenticationResponse> auth(@RequestBody final AuthenticationRequest auth) {
        return ResponseEntity.ok(this.authService.authenticate(auth));
    }
}
