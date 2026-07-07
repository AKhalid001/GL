package org.taskanager.tasks;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.taskanager.shared.dto.PagedResponseDto;
import org.taskanager.tasks.dto.AddTaskDto;
import org.taskanager.tasks.modal.Task;
import java.util.List;

@Path("/tasks")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TaskResource {

    @Inject
    TaskService taskService;

    @ConfigProperty(name = "app.message")
    String appTitle;


    @GET
    @Path("/getAllTask")
    public PagedResponseDto<Task> getTasks(@QueryParam("page") @DefaultValue("0") Integer page,
                                           @QueryParam("size") @DefaultValue("10") Integer size,
                                           @QueryParam("sort") @DefaultValue("id") String sort,
                                           @QueryParam("search") @DefaultValue("") String search){
        System.out.println(appTitle);
        return taskService.getAllTask(page,size,sort,search);
    }

    @GET
    @Path("/getTask/{id}")
    public Task getTaskById(@PathParam("id") Long id){
        return taskService.getTaskById(id);
    }

    @POST
    @Path("/addTask")
    @Consumes(MediaType.APPLICATION_JSON)
    public Task addTask(@Valid AddTaskDto addTaskDto){
        return taskService.addTasks(addTaskDto);
    }

    @PUT
    @Path("updateTask/{id}")
    public Task updateTask(
            @PathParam("id") Long id,
            @Valid AddTaskDto request) {

        return taskService.updateTask(id, request);
    }

    @DELETE
    @Path("deleteTask/{id}")
    public Response deleteTask(
            @PathParam("id") Long id) {

        taskService.deleteTask(id);

        return Response.status(Response.Status.OK).entity("Task deleted successfully").build();
    }
}
