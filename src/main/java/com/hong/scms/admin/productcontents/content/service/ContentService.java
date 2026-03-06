package com.hong.scms.admin.productcontents.content.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hong.scms.admin.productcontents.content.mapper.ContentMapper;
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
    }

    public ContentModel getContent(Integer prodContsId) {
        return contentMapper.selectContent(prodContsId);
    }

    @Transactional
    public void updateContent(ContentModel contentModel) {
        contentMapper.updateContent(contentModel);
    }

    @Transactional
    public void deleteContent(Integer prodContsId) {
        contentMapper.deleteContent(prodContsId);
    }

}
