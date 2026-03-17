package com.hong.scms.admin.auth;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.test.context.support.WithMockUser;
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
@WithMockUser(username = "content_admin", roles = {"SUPER_ADMIN"})
class AuthTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

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
                .andExpect(status().isForbidden());
    }
}
