package com.hong.scms.admin.auth.security;

import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.hong.scms.admin.management.user.model.UserModel;

public class AdminUserDetails implements UserDetails {

    private final UserModel userModel;

    public AdminUserDetails(UserModel userModel) {
        this.userModel = userModel;
    }

    public UserModel getUser() {
        return userModel;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + userModel.getRoleCd()));
    }

    @Override
    public String getPassword() {
        return userModel.getHashPw();
    }

    @Override
    public String getUsername() {
        return userModel.getLoginId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !"LOCK".equals(userModel.getUserStatCd());
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return "ACTIVE".equals(userModel.getUserStatCd());
    }
}
