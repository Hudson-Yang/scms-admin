package com.hong.scms.admin.productcontents.content.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.hong.scms.admin.productcontents.content.model.ContentLanguageModel;
import com.hong.scms.admin.productcontents.content.model.ContentModel;

@Mapper
public interface ContentMapper {
    List<ContentModel> selectContentList();

    void insertContent(ContentModel contentModel);

    ContentModel selectContent(Integer prodContsId);

    void updateContent(ContentModel contentModel);

    void deleteContent(Integer prodContsId);

    void insertContentLanguageList(ContentModel contentModel);

    void deleteContentLanguage(ContentLanguageModel contentLanguageModel);

    void updateContentLanguage(ContentLanguageModel contentLanguageModel);

    void insertContentLanguage(ContentLanguageModel contentLanguageModel);

    void deleteContentLanguageByProdContsId(Integer prodContsId);

}
