package com.hong.scms.admin.productcontents.content.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContentLanguageModel extends ContentModel {
    String langCd;
    String prodContsTitl;
    String prodContsDesc;
    String dfltLangYn;

    String saveFlag;
}
