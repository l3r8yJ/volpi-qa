package ru.volpi.qaadmin.web.security.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Slf4j
@Service
public class JwtService {

    @Value("${spring.secret-key}")
    private String secretKey;

    public String extractUsername(final String token) {
        return this.extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(final String token, final Function<Claims, T> claimsResolver) {
        final Claims claims = this.extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(final UserDetails userDetails) {
        return this.generateToken(new HashMap<>(0), userDetails);
    }

    public String generateToken(
        final Map<String, Object> claims,
        final UserDetails userDetails
    ) {
        final long twentyFourHours = 1000L * 60L * 24L;
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + twentyFourHours))
            .signWith(this.getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean isTokenValid(final String token, final UserDetails userDetails) {
        return this.extractUsername(token).equals(userDetails.getUsername()) && !this.isTokenExpired(token);
    }

    private boolean isTokenExpired(final String token) {
        return this.extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(final String token) {
        return this.extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(final String token) {
        return Jwts.parserBuilder()
            .setSigningKey(this.getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(this.secretKey));
    }
}
