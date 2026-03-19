package com.hong.scms.admin.auth;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hong.scms.admin.auth.model.LoginRequest;
import com.hong.scms.admin.auth.model.SignupRequest;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AuthTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void signup_login_me_flow_test() throws Exception {
        SignupRequest signup = new SignupRequest();
        signup.setLoginId("junit_user");
        signup.setPassword("1234");
        signup.setName("테스트유저");

        mockMvc.perform(
                post("/admin/auth/sign-up").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signup)))
                .andDo(print()).andExpect(status().isOk());

        LoginRequest login = new LoginRequest();
        login.setLoginId("junit_user");
        login.setPassword("1234");

        MockHttpSession session = (MockHttpSession) mockMvc
                .perform(post("/admin/auth/login").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andDo(print()).andExpect(status().isOk()).andReturn().getRequest()
                .getSession(false);

        mockMvc.perform(get("/admin/auth/me").session(session)).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.loginId").value("junit_user"));
    }

    @Test
    void logout_flow_test() throws Exception {
        SignupRequest signup = new SignupRequest();
        signup.setLoginId("logout_user");
        signup.setPassword("1234");
        signup.setName("로그아웃테스트");

        mockMvc.perform(
                post("/admin/auth/sign-up").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signup)))
                .andExpect(status().isOk());

        LoginRequest login = new LoginRequest();
        login.setLoginId("logout_user");
        login.setPassword("1234");

        MockHttpSession session = (MockHttpSession) mockMvc
                .perform(post("/admin/auth/login").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk()).andReturn().getRequest().getSession(false);

        mockMvc.perform(post("/admin/auth/logout").with(csrf()).session(session)).andDo(print())
                .andExpect(status().isOk());

        mockMvc.perform(get("/admin/auth/me").session(session)).andDo(print())
                .andExpect(status().isOk()).andExpect(jsonPath("$.data").doesNotExist());
    }

    @Test
    void signup_duplicate_loginId_test() throws Exception {
        // 첫 번째 회원가입 요청
        SignupRequest signup = new SignupRequest();
        signup.setLoginId("duplicate_user");
        signup.setPassword("1234");
        signup.setName("첫번째유저");

        mockMvc.perform(
                post("/admin/auth/sign-up").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signup)))
                .andDo(print()).andExpect(status().isOk());

        // 같은 loginId로 두 번째 회원가입 요청
        SignupRequest duplicateSignup = new SignupRequest();
        duplicateSignup.setLoginId("duplicate_user");
        duplicateSignup.setPassword("5678");
        duplicateSignup.setName("중복유저");

        mockMvc.perform(
                post("/admin/auth/sign-up").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(duplicateSignup)))
                .andDo(print())
                // 이미 사용 중인 loginId 이므로 409 기대
                .andExpect(status().isConflict())
                // 공통 응답 구조에서 실패 상태 확인
                .andExpect(jsonPath("$.stat").value("fail"))
                // 에러 코드 확인
                .andExpect(jsonPath("$.err.code").value(409))
                // 에러 메시지 확인
                .andExpect(jsonPath("$.err.msg").value("이미 사용 중인 로그인 아이디입니다."));
    }

    @Test
    void login_fail_test() throws Exception {
        SignupRequest signup = new SignupRequest();
        signup.setLoginId("login_fail_user");
        signup.setPassword("1234");
        signup.setName("로그인실패테스트");

        mockMvc.perform(
                post("/admin/auth/sign-up").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signup)))
                .andDo(print()).andExpect(status().isOk());

        LoginRequest wrongLogin = new LoginRequest();
        wrongLogin.setLoginId("login_fail_user");
        wrongLogin.setPassword("wrong-password");

        mockMvc.perform(
                post("/admin/auth/login").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(wrongLogin)))
                .andDo(print()).andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.stat").value("fail"))
                .andExpect(jsonPath("$.err.code").value(401))
                .andExpect(jsonPath("$.err.msg").value("아이디 또는 비밀번호가 올바르지 않습니다."));
    }
}
