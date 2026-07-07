package org.taskanager.shared;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import org.taskanager.users.modal.Users;

import java.time.Duration;
import java.util.Set;

@ApplicationScoped
public class JwtService {

    public String generateToken(
            Users user
    ) {

        return Jwt
                .issuer("task-manager")
                .upn(user.getUsername())
                .groups(
                        Set.of(
                                user.getRole().name()
                        )
                )
                .expiresIn(
                        Duration.ofHours(8)
                )
                .sign();
    }
}
