package com.hong.scms.admin.common.constant;

import lombok.Getter;

@Getter
public enum ErrorCode {

    INTERNAL_SERVER_ERROR(500, 500, "Internal Server Error"), UNAUTHORIZED(401, 401,
            "Unauthorized"), INVALID_LOGIN(401, 401, "아이디 또는 비밀번호가 올바르지 않습니다."), DUPLICATE_LOGIN_ID(
                    409, 409, "이미 사용 중인 로그인 아이디입니다.");

    private final int status;
    private final int code;
    private final String message;

    ErrorCode(int status, int code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
