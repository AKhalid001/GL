package org.taskanager.users;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.taskanager.users.modal.Role;
import org.taskanager.users.modal.Users;

@ApplicationScoped
public class DataLoader {

    @Inject
    UserRepository repository;

    @Transactional
    void onStart(
            @Observes StartupEvent ev
    ) {

        if(repository.count() == 0){

            Users admin =
                    new Users();

            admin.setUsername("admin");
            admin.setPassword("admin123");
            admin.setEmail("admin@test.com");
            admin.setRole(Role.ADMIN);

            repository.persist(admin);

            Users user =
                    new Users();

            user.setUsername("user");
            user.setPassword("user123");
            user.setEmail("user@test.com");
            user.setRole(Role.USER);

            repository.persist(user);
        }
    }
}
