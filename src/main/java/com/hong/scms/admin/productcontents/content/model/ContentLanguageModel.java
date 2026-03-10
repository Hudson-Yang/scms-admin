package com.hong.scms.admin.productcontents.content.model;

import com.hong.scms.admin.common.model.BaseModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContentLanguageModel extends BaseModel {
    Integer prodContsId;

    String langCd;
    String prodContsTitl;
    String prodContsDesc;
    String dfltLangYn;

    String saveFlag;
}
