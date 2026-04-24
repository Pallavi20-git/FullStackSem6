package com.sosapp.controller;

import com.sosapp.dto.AuthRequest;
import com.sosapp.dto.AuthResponse;
import com.sosapp.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * POST /auth/register
     * Registers a new user.
     * Body: { "username": "test", "password": "1234" }
     */
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest request) {
        String message = authService.register(request);
        return ResponseEntity.ok(message);
    }

    /**
     * POST /auth/login
     * Authenticates user and returns JWT token.
     * Body: { "username": "test", "password": "1234" }
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
