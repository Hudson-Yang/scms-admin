package com.hong.scms.admin.common.exception;

import com.hong.scms.admin.common.constant.ErrorCode;
import lombok.Getter;

@Getter
public class ScmsAdminException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private final ErrorCode errorCode;

    public ScmsAdminException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ScmsAdminException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
}
