package com.hong.scms.admin.productcontents.content.service;

import java.util.List;
import org.springframework.stereotype.Service;
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

}
