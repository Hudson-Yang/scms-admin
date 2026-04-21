package com.hong.scms.admin.auth.security;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable()).authorizeHttpRequests(auth -> auth
                        // 에러 페이지 허용
                        .requestMatchers("/error").permitAll()

                        // 인증 관련 API 허용
                        .requestMatchers("/admin/auth/login", "/admin/auth/sign-up",
                                "/admin/auth/logout", "/admin/auth/me")
                        .permitAll()

                        // 유저 관리는 SUPER_ADMIN만 가능
                        .requestMatchers("/admin/management/users/**").hasRole("SUPER_ADMIN")

                        // 삭제는 로그인 필요
                        .requestMatchers(HttpMethod.DELETE, "/admin/**").authenticated()

                        // 등록 / 수정도 로그인 필요
                        .requestMatchers(HttpMethod.POST, "/admin/**").authenticated()

                        .requestMatchers(HttpMethod.PUT, "/admin/**").authenticated()

                        // 조회는 비로그인도 가능
                        .requestMatchers(HttpMethod.GET, "/admin/**").permitAll()

                        // 그 외는 차단
                        .anyRequest().denyAll())
                .formLogin(form -> form.disable()).logout(logout -> logout.disable());

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
            throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
