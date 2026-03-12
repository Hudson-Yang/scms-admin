package com.hong.scms.admin.management.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.hong.scms.admin.management.user.model.UserModel;

@Mapper
public interface UserMapper {
    UserModel findByLoginId(String loginId);

    void insertUser(UserModel user);
}
