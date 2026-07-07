package org.taskanager.tasks;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.taskanager.shared.dto.PagedResponseDto;
import org.taskanager.shared.globalExceptions.TaskNotFoundException;
import org.taskanager.tasks.dto.AddTaskDto;
import org.taskanager.tasks.modal.Task;

import java.util.*;

@ApplicationScoped
public class TaskService {

    @Inject
    TaskRepository repository;

    public PagedResponseDto<Task> getAllTask(Integer page , Integer size,String sort, String search){
        PanacheQuery<Task> query = search.isEmpty() ?
                repository.findAll(Sort.by(sort)) :
                repository.find( "lower(title) like ?1",
                        "%" + search.toLowerCase() + "%");

        query.page(Page.of(page,size));
        System.out.println(query.list());
        return new PagedResponseDto<>(
                query.list(),
                query.count(),
                query.pageCount(),
                page,
                size
        );
    }

    public Task getTaskById(Long id){
        Task task = repository.findById(id);
        if(task == null){
            throw new TaskNotFoundException(id);
        }
        return task;
    }

    @Transactional
    public Task addTasks(AddTaskDto addTaskDto){
        Task task = new Task();
        task.setTitle(addTaskDto.getTitle());
        task.setDescription(addTaskDto.getDescription());
        task.setPriority(addTaskDto.getPriority());
        task.setStatus(addTaskDto.getTaskStatus());
        repository.persist(task);
        return task;
    }

    @Transactional
    public Task updateTask(
            Long id,
            AddTaskDto request) {

        Task task = repository.findById(id);

        if (task == null) {
            throw new TaskNotFoundException(id);
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getTaskStatus());
        task.setPriority(request.getPriority());

        return task;
    }

    @Transactional
    public void deleteTask(Long id) {

        Task task = repository.findById(id);

        if (task == null) {
            throw new TaskNotFoundException(id);
        }

        repository.delete(task);
    }

    public List<Task> searchByTitle(String title){
        return repository.find( "lower(title) like ?1",
                "%" + title.toLowerCase() + "%").list();
    }
}
