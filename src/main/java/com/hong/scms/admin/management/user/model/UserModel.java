package com.hong.scms.admin.management.user.model;

import com.hong.scms.admin.common.model.BaseModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserModel extends BaseModel {
    Long admUserId;
    String loginId;
    String hashPw;
    String name;
    String roleCd;
    String userStatCd;
}
