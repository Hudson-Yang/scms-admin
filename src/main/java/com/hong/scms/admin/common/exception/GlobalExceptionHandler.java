package com.hong.scms.admin.common.exception;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.hong.scms.admin.common.constant.ErrorCode;
import com.hong.scms.admin.common.model.BaseResponse;
import com.hong.scms.admin.common.model.ErrorResponse;
import jakarta.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    protected BaseResponse handleBadCredentials(BadCredentialsException ex,
            HttpServletResponse response) {

        BaseResponse br = new BaseResponse();
        ErrorResponse err = new ErrorResponse();

        br.setStat("fail");
        err.setCode(ErrorCode.INVALID_LOGIN.getCode());
        err.setMessage(ErrorCode.INVALID_LOGIN.getMessage());
        br.setErr(err);

        response.setStatus(ErrorCode.INVALID_LOGIN.getStatus());

        return br;
    }

    @ExceptionHandler(ScmsAdminException.class)
    protected BaseResponse handleScmsAdminException(ScmsAdminException ex,
            HttpServletResponse response) {

        BaseResponse br = new BaseResponse();
        ErrorResponse err = new ErrorResponse(ex);

        br.setStat("fail");
        br.setErr(err);

        response.setStatus(ex.getErrorCode().getStatus());

        return br;
    }

    @ExceptionHandler(Exception.class)
    protected BaseResponse handleGlobalException(Exception ex, HttpServletResponse response) {

        BaseResponse br = new BaseResponse();
        ErrorResponse err = new ErrorResponse();

        br.setStat("fail");
        err.setCode(ErrorCode.INTERNAL_SERVER_ERROR.getCode());
        err.setMessage(ErrorCode.INTERNAL_SERVER_ERROR.getMessage());
        br.setErr(err);

        response.setStatus(ErrorCode.INTERNAL_SERVER_ERROR.getStatus());

        return br;
    }
}
