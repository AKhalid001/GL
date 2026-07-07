package org.taskanager.users;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.taskanager.users.modal.Users;

@ApplicationScoped
public class UserRepository implements PanacheRepository<Users> {

    public Users findByUsername(
            String username
    ) {
        return find(
                "username",
                username
        ).firstResult();
    }
}
