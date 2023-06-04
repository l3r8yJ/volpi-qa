package ru.volpi.qaadmin.web.security.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.volpi.qaadmin.domain.user.UserAccount;
import ru.volpi.qaadmin.repository.UserRepository;

import java.util.ArrayList;
import java.util.Collection;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    private static User mapUser(final UserAccount account) {
        return new User(account.getUsername(), account.getPassword(), UserDetailsServiceImpl.authorities(account));
    }

    private static Collection<? extends GrantedAuthority> authorities(final UserAccount account) {
        final Collection<GrantedAuthority> authorities = new ArrayList<>(0);
        authorities.add(new SimpleGrantedAuthority("ROLE_" + account.getRole()));
        return authorities;
    }

    /**
     * @param username the username identifying the user whose data is required.
     * @return user details
     * @throws UsernameNotFoundException when user not found
     */
    @Override
    public UserDetails loadUserByUsername(final String username) {
        return UserDetailsServiceImpl.mapUser(
            this.userRepository.findByUsername(username)
                .orElseThrow(
                    () -> new UsernameNotFoundException(
                        "Пользователь с username: '%s' не найден ".formatted(username)
                    )
                )
        );
    }
}
