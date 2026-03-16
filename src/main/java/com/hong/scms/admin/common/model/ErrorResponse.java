package com.hong.scms.admin.common.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.hong.scms.admin.common.exception.ScmsAdminException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonPropertyOrder({"code", "msg"})
@Getter
@Setter
@NoArgsConstructor
public class ErrorResponse {

    @JsonProperty("code")
    @JsonInclude(Include.ALWAYS)
    private int code;

    @JsonProperty("msg")
    @JsonInclude(Include.NON_NULL)
    private String message;

    public ErrorResponse(ScmsAdminException ex) {
        this.code = ex.getErrorCode().getCode();
        this.message = ex.getMessage();
    }
}
