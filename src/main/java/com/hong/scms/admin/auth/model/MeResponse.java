package com.hong.scms.admin.auth.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeResponse {

    private String loginId;
    private String name;
    private String roleCd;

    public MeResponse(String loginId, String name, String roleCd) {
        this.loginId = loginId;
        this.name = name;
        this.roleCd = roleCd;
    }
}
