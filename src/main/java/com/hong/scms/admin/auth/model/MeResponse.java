package com.hong.scms.admin.auth.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeResponse {

    private String name;
    private String roleCd;

    public MeResponse(String name, String roleCd) {
        this.name = name;
        this.roleCd = roleCd;
    }
}
