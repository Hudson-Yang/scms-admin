package com.hong.scms.admin.productcontents.content.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.hong.scms.admin.productcontents.content.model.ContentModel;

@Mapper
public interface ContentMapper {
    List<ContentModel> selectContentList();
}
