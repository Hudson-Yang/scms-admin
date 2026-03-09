package com.hong.scms.admin.productcontents.content.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hong.scms.admin.productcontents.content.mapper.ContentMapper;
import com.hong.scms.admin.productcontents.content.model.ContentLanguageModel;
import com.hong.scms.admin.productcontents.content.model.ContentModel;

@Service
public class ContentService {

    private final ContentMapper contentMapper;

    public ContentService(ContentMapper contentMapper) {
        this.contentMapper = contentMapper;
    }

    public List<ContentModel> getContentList() {
        return contentMapper.selectContentList();
    }

    @Transactional
    public void createContent(ContentModel contentModel) {
        contentMapper.insertContent(contentModel);

        contentMapper.insertContentLanguageList(contentModel);
    }

    public ContentModel getContent(Integer prodContsId) {
        return contentMapper.selectContent(prodContsId);
    }

    @Transactional
    public void updateContent(ContentModel contentModel) {
        contentMapper.updateContent(contentModel);

        // 여기에 따로 language 메소드 빼서 만든다음에 호출하기
    }

    @Transactional
    public void deleteContent(Integer prodContsId) {
        contentMapper.deleteContent(prodContsId);
    }

    public void saveContentLanguageList(ContentModel contentModel) {
        List<ContentLanguageModel> languageList = contentModel.getLanguageList();

        if (languageList == null || languageList.isEmpty())
            return;

        languageList.stream().filter(l -> "D".equals(l.getSaveFlag()))
                .forEach(contentMapper::deleteContentLanguage);

        languageList.stream().filter(l -> "U".equals(l.getSaveFlag()))
                .forEach(contentMapper::updateContentLanguage);

        languageList.stream().filter(l -> "I".equals(l.getSaveFlag())).forEach(l -> {
            l.setProdContsId(contentModel.getProdContsId());
            l.setMdfrId(contentModel.getMdfrId());
            contentMapper.insertContentLanguage(l);
        });
    }

}
