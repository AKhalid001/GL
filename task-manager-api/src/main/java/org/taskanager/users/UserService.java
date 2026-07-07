package org.taskanager.users;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.taskanager.users.dto.UserDto;
import org.taskanager.users.modal.Users;

import java.util.List;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    public List<Users> getAllUsers(){
        return userRepository.findAll().list();
    }
}
