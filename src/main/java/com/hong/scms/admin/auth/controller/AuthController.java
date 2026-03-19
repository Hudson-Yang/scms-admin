package com.hong.scms.admin.auth.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hong.scms.admin.auth.model.LoginRequest;
import com.hong.scms.admin.auth.model.MeResponse;
import com.hong.scms.admin.auth.model.SignupRequest;
import com.hong.scms.admin.auth.security.AdminUserDetails;
import com.hong.scms.admin.auth.service.AuthService;
import com.hong.scms.admin.common.model.BaseResponse;
import com.hong.scms.admin.management.user.model.UserModel;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AuthService authService;

    @PostMapping("/login")
    public BaseResponse login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        request.getLoginId(), request.getPassword()));

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        HttpSession session = httpRequest.getSession(true);
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                context);

        return new BaseResponse();
    }

    @GetMapping("/me")
    public BaseResponse me(Authentication authentication) {

        if (authentication == null) {
            return new BaseResponse(null);
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof String && "anonymousUser".equals(principal)) {
            return new BaseResponse(null);
        }

        if (principal instanceof AdminUserDetails userDetails) {
            UserModel user = userDetails.getUser();
            MeResponse response = new MeResponse(user.getName(), user.getRoleCd());
            return new BaseResponse(response);
        }

        return new BaseResponse(null);
    }

    @PostMapping("/sign-up")
    public BaseResponse signup(@RequestBody SignupRequest request) {
        authService.signup(request);
        return new BaseResponse();
    }

    @PostMapping("/logout")
    public BaseResponse logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        SecurityContextHolder.clearContext();

        return new BaseResponse();
    }
}
