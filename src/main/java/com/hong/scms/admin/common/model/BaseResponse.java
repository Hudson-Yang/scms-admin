package com.hong.scms.admin.common.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

@JsonPropertyOrder({"stat", "err", "data"})
@Getter
@Setter
public class BaseResponse {

    @JsonProperty("stat")
    private String stat = "ok";

    @JsonProperty("err")
    @JsonInclude(Include.NON_NULL)
    private ErrorResponse err;

    @JsonProperty("data")
    @JsonInclude(Include.NON_NULL)
    private Object data;

    public BaseResponse() {}

    public BaseResponse(Object data) {
        this.data = data;
    }
}
