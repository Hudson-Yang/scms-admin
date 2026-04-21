package com.hong.scms.admin.common.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class BaseModel {
    private String regrId;
    private String regDt;
    private String mdfrId;
    private String mdfDt;
}
