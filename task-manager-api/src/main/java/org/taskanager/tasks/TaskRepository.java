package org.taskanager.tasks;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.taskanager.tasks.modal.Task;

@ApplicationScoped
public class TaskRepository implements PanacheRepository<Task> {
}
