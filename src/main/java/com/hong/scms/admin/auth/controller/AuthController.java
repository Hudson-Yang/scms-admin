package com.hong.scms.admin.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hong.scms.admin.auth.annotation.CurrentUser;
import com.hong.scms.admin.auth.model.LoginRequest;
import com.hong.scms.admin.auth.model.SignupRequest;
import com.hong.scms.admin.auth.service.AuthService;
import com.hong.scms.admin.management.user.model.UserModel;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {

        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        request.getLoginId(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        httpRequest.getSession(true);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public UserModel me(@CurrentUser UserModel user) {
        return user;
    }

    @PostMapping("/sign-up")
    public void signup(@RequestBody SignupRequest request) {
        authService.signup(request);
    }

}
