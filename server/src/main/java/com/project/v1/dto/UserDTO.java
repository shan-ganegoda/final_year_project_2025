package com.project.v1.dto;

import com.project.v1.entity.Employee;
import com.project.v1.entity.Role;
import com.project.v1.entity.Userstatus;

import jakarta.validation.constraints.Pattern;
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
    @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Invalid Username")
    private String username;
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$", message = "Invalid Password")
    private String password;
    private Employee employee;
    private LocalDate docreated;
    private LocalDate dolastupdated;
    private Userstatus userstatus;
    private Role role;
    @Pattern(regexp = "^.*$", message = "Invalid Description")
    private String description;
}
