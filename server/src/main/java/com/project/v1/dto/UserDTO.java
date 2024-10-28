package com.project.v1.dto;

import com.project.v1.entity.Employee;
import com.project.v1.entity.Role;
import com.project.v1.entity.Userstatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer id;
    private String username;
    private String password;
    private Employee employee;
    private LocalDate docreated;
    private LocalDate dolastupdated;
    private Userstatus userstatus;
    private Role role;
    private String description;
}
