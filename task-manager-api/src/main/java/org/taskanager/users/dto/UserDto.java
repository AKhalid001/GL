package org.taskanager.users.dto;

import lombok.Data;
import org.taskanager.users.modal.Role;

@Data
public class UserDto {
    public String name;
    public String email;
    public Role role;
}
