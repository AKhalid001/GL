package org.taskanager.auth;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.taskanager.auth.dto.LoginRequestDto;
import org.taskanager.auth.dto.LoginResponseDto;
import org.taskanager.auth.dto.SignupRequestDto;
import org.taskanager.shared.JwtService;
import org.taskanager.users.UserRepository;
import org.taskanager.users.modal.Role;
import org.taskanager.users.modal.Users;

@Path("/auth")
public class AuthResource {

    @Inject
    UserRepository userRepository;

    @Inject
    JwtService jwtService;

    @Inject
    JsonWebToken jwt;

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public LoginResponseDto login(LoginRequestDto request) {

        Users user = userRepository.findByUsername(request.getUsername());

        if (user == null || !user.getPassword().equals(request.getPassword())) {
            throw new WebApplicationException("Invalid credentials", 401);
        }

        String token = jwtService.generateToken(user);

        LoginResponseDto dto = new LoginResponseDto();
        dto.setToken(token);
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }

    @POST
    @Path("/signup")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public LoginResponseDto signup(SignupRequestDto request) {

        if (userRepository.findByUsername(request.getUsername()) != null) {
            throw new WebApplicationException("Username already taken", 409);
        }

        Users newUser = new Users();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());
        newUser.setRole(Role.USER);

        userRepository.persist(newUser);

        String token = jwtService.generateToken(newUser);

        LoginResponseDto dto = new LoginResponseDto();
        dto.setToken(token);
        dto.setId(newUser.getId());
        dto.setUsername(newUser.getUsername());
        dto.setEmail(newUser.getEmail());
        dto.setRole(newUser.getRole());
        return dto;
    }

    @GET
    @Path("/me")
    @RolesAllowed({"ADMIN", "USER"})
    @Produces(MediaType.APPLICATION_JSON)
    public LoginResponseDto me() {

        Users user = userRepository.findByUsername(jwt.getName());

        LoginResponseDto dto = new LoginResponseDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }
}
