package com.project.v1.dto;

import com.project.v1.entity.Employee;
import com.project.v1.entity.Role;
import com.project.v1.entity.Userstatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
    private String username;
    private String password;
    private Employee employee;
    private Userstatus userstatus;
    private Role role;
}
