package org.taskanager.auth;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.taskanager.auth.dto.LoginRequestDto;
import org.taskanager.auth.dto.LoginResponseDto;
import org.taskanager.shared.JwtService;
import org.taskanager.users.UserRepository;
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
    public LoginResponseDto login(
            LoginRequestDto request
    ) {
        System.out.println("login request");

        Users user = userRepository.findByUsername(request.getUsername());

        if(user == null){
            throw new WebApplicationException("Invalid Credentials", 401);
        }

        if(!user.getPassword().equals(
                request.getPassword()
        )){
            throw new WebApplicationException(
                    "Invalid Credentials",
                    401
            );
        }
        String token = jwtService.generateToken(user);

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setToken(token);
        loginResponseDto.setId(user.getId());
        loginResponseDto.setUsername(user.getUsername());
        loginResponseDto.setEmail(user.getEmail());
        loginResponseDto.setRole(user.getRole());
        return loginResponseDto;

    }

    @GET
    @Path("/me")
    @RolesAllowed({
            "ADMIN",
            "USER"
    })
    public LoginResponseDto me() {

        String username =
                jwt.getName();

        Users user =
                userRepository.findByUsername(
                        username
                );

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setId(user.getId());
        loginResponseDto.setEmail(user.getUsername());
        loginResponseDto.setEmail(user.getEmail());
        return loginResponseDto;
    }
}
