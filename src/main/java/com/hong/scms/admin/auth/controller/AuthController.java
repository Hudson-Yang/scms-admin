package com.hong.scms.admin.auth.controller;

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
import com.hong.scms.admin.common.model.BaseResponse;
import com.hong.scms.admin.management.user.model.UserModel;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AuthService authService;

    @PostMapping("/login")
    public BaseResponse login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        try {

            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                            request.getLoginId(), request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            e.printStackTrace();
        }

        httpRequest.getSession(true);

        return new BaseResponse();
    }

    @GetMapping("/me")
    public BaseResponse me(@CurrentUser UserModel user) {
        return new BaseResponse(user);
    }

    @PostMapping("/sign-up")
    public BaseResponse signup(@RequestBody SignupRequest request) {
        authService.signup(request);
        return new BaseResponse();
    }

}
