package ru.volpi.qaadmin.web.security.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.volpi.qaadmin.web.security.service.JwtService;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final int BEARER_TOKEN_VALUE_START_POSITION = 7;

    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
        @NonNull final HttpServletRequest request,
        @NonNull final HttpServletResponse response,
        @NonNull final FilterChain filterChain
    ) throws ServletException, IOException {
        final String header = request.getHeader("Authorization");
        if (null == header || !header.startsWith("Bearer")) {
            filterChain.doFilter(request, response);
            return;
        }
        final String token = header.substring(BEARER_TOKEN_VALUE_START_POSITION);
        log.debug("Coming token: {}", token);
        final String username = this.jwtService.extractUsername(token);
        if (null != username && null == SecurityContextHolder.getContext().getAuthentication()) {
            final UserDetails details = this.userDetailsService.loadUserByUsername(username);
            if (this.jwtService.isTokenValid(token, details)) {
                final UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(details, null, details.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
