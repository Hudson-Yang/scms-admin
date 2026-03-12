package com.hong.scms.admin.auth.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.hong.scms.admin.management.user.mapper.UserMapper;
import com.hong.scms.admin.management.user.model.UserModel;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminUserDetailsService implements UserDetailsService {

    private final UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {

        UserModel user = userMapper.findByLoginId(loginId);

        if (user == null) {
            throw new UsernameNotFoundException("User Not Found");
        }

        return new AdminUserDetails(user);
    }
}
