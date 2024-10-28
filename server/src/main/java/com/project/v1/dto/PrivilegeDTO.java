package com.project.v1.dto;

import com.project.v1.entity.Module;
import com.project.v1.entity.Operation;
import com.project.v1.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PrivilegeDTO {
    private Integer id;
    private Operation operation;
    private Module module;
    private Role role;
}
