package com.hong.scms.admin.productcontents;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hong.scms.admin.productcontents.content.model.ContentModel;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
class ContentTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DisplayName("Content 목록 조회")
    void getContentList() throws Exception {
        mockMvc.perform(get("/product-content/content")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("Content 상세 조회")
    void getContent() throws Exception {
        mockMvc.perform(get("/product-content/content/101")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("Content 생성")
    void createContent() throws Exception {
        ContentModel model = new ContentModel();
        model.setAdmnDispNm("Junit Test Admin Display Name");
        model.setRegrId("Junit Tester");
        model.setMdfrId("Junit Tester");

        String body = objectMapper.writeValueAsString(model);

        mockMvc.perform(post("/product-content/content").contentType(MediaType.APPLICATION_JSON)
                .content(body)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("Content 수정")
    void updateContent() throws Exception {
        ContentModel model = new ContentModel();
        model.setAdmnDispNm("Junit Test Update Admin Display Name");
        model.setMdfrId("Junit Update Tester");

        String body = objectMapper.writeValueAsString(model);

        mockMvc.perform(put("/product-content/content/102").contentType(MediaType.APPLICATION_JSON)
                .content(body)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("Content 삭제")
    void deleteContent() throws Exception {
        mockMvc.perform(delete("/product-content/content/103")).andExpect(status().isOk());
    }


}
