package org.taskanager.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.taskanager.users.modal.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private String token;

    private Long id;

    private String username;

    private String email;
    private Role role;
}
