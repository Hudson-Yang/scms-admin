package com.hong.scms.admin.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hong.scms.admin.auth.model.SignupRequest;
import com.hong.scms.admin.common.constant.ErrorCode;
import com.hong.scms.admin.common.exception.ScmsAdminException;
import com.hong.scms.admin.management.user.mapper.UserMapper;
import com.hong.scms.admin.management.user.model.UserModel;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signup(SignupRequest request) {
        validateDuplicateLoginId(request.getLoginId());

        UserModel user = new UserModel();
        user.setLoginId(request.getLoginId());
        user.setHashPw(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setRoleCd("DELETE");
        user.setUserStatCd("ACTIVE");

        userMapper.insertUser(user);
    }

    private void validateDuplicateLoginId(String loginId) {
        int count = userMapper.countByLoginId(loginId);

        if (count > 0) {
            throw new ScmsAdminException(ErrorCode.DUPLICATE_LOGIN_ID);
        }
    }

}
