package com.project.v1.dto;

import com.project.v1.entity.Designation;
import com.project.v1.entity.EmployeeStatus;
import com.project.v1.entity.EmployeeType;
import com.project.v1.entity.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {

    private Integer id;
    private String firstname;
    private String lastname;
    private String number;
    private byte[] photo;
    private String mobile;
    private String land;
    private String nic;
    private String email;
    private Gender gender;
    private Designation designation;
    private LocalDate dob;
    private EmployeeType employeetype;
    private LocalDate doassigned;
    private EmployeeStatus employeestatus;
    private String description;
}
