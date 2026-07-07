package org.taskanager.tasks.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.taskanager.tasks.modal.TaskPriority;
import org.taskanager.tasks.modal.TaskStatus;

@Data
public class AddTaskDto {

    @NotBlank(message = "title cannot be empty")
    @Size(min = 3,max = 20 , message = "Title must be between 3 to 20 characters")
    private String title;

    @Size(max = 50 , message = "Description cannot exceed 500 characters")
    private String description;
    private TaskPriority priority;
    private TaskStatus taskStatus;
}
