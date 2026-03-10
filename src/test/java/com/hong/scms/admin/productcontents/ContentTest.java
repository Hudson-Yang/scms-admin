package com.hong.scms.admin.productcontents;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.ArrayList;
import java.util.List;
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
import com.hong.scms.admin.productcontents.content.model.ContentLanguageModel;
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

        ContentLanguageModel langModel0 = new ContentLanguageModel();
        langModel0.setLangCd("EN_US");
        langModel0.setProdContsTitl("Junit English Title");
        langModel0.setProdContsDesc("Junit English Description.");
        langModel0.setDfltLangYn("Y");
        langModel0.setRegrId(model.getRegrId());

        ContentLanguageModel langModel1 = new ContentLanguageModel();
        langModel1.setLangCd("KO_KR");
        langModel1.setProdContsTitl("Junit 한국어 제목");
        langModel1.setProdContsDesc("Junit 한국어 설명.");
        langModel1.setDfltLangYn("N");
        langModel1.setRegrId(model.getRegrId());

        List<ContentLanguageModel> langList = new ArrayList<>();
        langList.add(langModel0);
        langList.add(langModel1);

        model.setLanguageList(langList);

        String body = objectMapper.writeValueAsString(model);

        mockMvc.perform(post("/product-content/content").contentType(MediaType.APPLICATION_JSON)
                .content(body)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("Content 수정")
    void updateContent() throws Exception {
        ContentModel model = new ContentModel();
        model.setProdContsId(102);
        model.setAdmnDispNm("Junit Test Update Admin Display Name");
        model.setMdfrId("Junit Update Tester");

        ContentLanguageModel langInsertModel = new ContentLanguageModel();
        langInsertModel.setLangCd("FR_fr");
        langInsertModel.setProdContsTitl("Junit France Title");
        langInsertModel.setProdContsDesc("Junit France Description.");
        langInsertModel.setDfltLangYn("Y");
        langInsertModel.setSaveFlag("I");

        ContentLanguageModel langUpdateModel = new ContentLanguageModel();
        langUpdateModel.setProdContsId(model.getProdContsId());
        langUpdateModel.setLangCd("KO_KR");
        langUpdateModel.setProdContsTitl("Junit 한국어 갱신 타이틀");
        langUpdateModel.setProdContsDesc("Junit 한국어 갱신 설명.");
        langUpdateModel.setDfltLangYn("N");
        langUpdateModel.setSaveFlag("U");

        ContentLanguageModel langDeleteModel = new ContentLanguageModel();
        langDeleteModel.setProdContsId(model.getProdContsId());
        langDeleteModel.setLangCd("EN_US");
        langDeleteModel.setSaveFlag("D");

        List<ContentLanguageModel> langUpdateList = new ArrayList<>();
        langUpdateList.add(langInsertModel);
        langUpdateList.add(langUpdateModel);
        langUpdateList.add(langDeleteModel);

        model.setLanguageList(langUpdateList);

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
