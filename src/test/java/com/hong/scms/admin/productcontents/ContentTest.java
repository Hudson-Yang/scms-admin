package com.hong.scms.admin.productcontents;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ContentTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Content 메뉴 - 목록 조회 API 호출 테스트")
    void getContentList_success() throws Exception {

        /**
         * given / when / then 패턴
         *
         * given : 테스트에 필요한 사전 조건 when : 실제 실행 then : 결과 검증
         *
         * 이번 테스트는 단순히 URL 호출 성공 여부만 확인
         */

        // when & then
        mockMvc.perform(
                // GET 방식으로 해당 URL 호출
                get("/product-content/content"))
                // HTTP 상태 코드가 200 OK 인지 검증
                .andExpect(status().isOk());
    }
}
