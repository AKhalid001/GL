package org.taskanager.users;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import org.taskanager.users.dto.UserDto;
import org.taskanager.users.modal.Users;

import java.util.List;

@Path("/users")
public class userResource {

    @Inject
    UserService userService;


    @GET
    @Path("/getAllUsers")
    @RolesAllowed("ADMIN")
    public List<Users> getAllUsers(){
        return userService.getAllUsers();
    }
}
