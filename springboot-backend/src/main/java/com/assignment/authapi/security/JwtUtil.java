package com.assignment.authapi.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final SecretKey signingKey;
    private final long expirationMillis;

    public JwtUtil(@Value("${app.jwt.secret}") String secret,
                   @Value("${app.jwt.expiration-ms}") long expirationMillis) {
        this.signingKey = Keys.hmacShaKeyFor(resolveSecretBytes(secret));
        this.expirationMillis = expirationMillis;
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(Map.of(), userDetails.getUsername());
    }

    public String generateToken(Map<String, Object> extraClaims, String subject) {
        Date now = new Date();
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expirationMillis))
                .signWith(signingKey)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
            .verifyWith(signingKey)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    @SuppressWarnings("UseSpecificCatch")
    private byte[] resolveSecretBytes(String secret) {
        try {
            return Decoders.BASE64.decode(secret);
        } catch (Exception ex) {
            return secret.getBytes(StandardCharsets.UTF_8);
        }
    }
}
