package com.project.v1.dto;

import com.project.v1.entity.Designation;
import com.project.v1.entity.EmployeeStatus;
import com.project.v1.entity.EmployeeType;
import com.project.v1.entity.Gender;

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
public class EmployeeDTO {

    private Integer id;
    @Pattern(regexp = "^([A-Z][a-z]+)$", message = "Invalid firstname")
    private String firstname;
    @Pattern(regexp = "^([A-Z][a-z]+)$", message = "Invalid lastname")
    private String lastname;
    @Pattern(regexp = "^E\\d{5}$", message = "Invalid Number")
    private String number;
    private byte[] photo;
    @Pattern(regexp = "^0\\d{9}$", message = "Invalid Mobile Number")
    private String mobile;
    @Pattern(regexp = "^0\\d{9}$", message = "Invalid Landphone Number")
    private String land;
    @Pattern(regexp = "^(([\\d]{9}[vVxX])|([\\d]{12}))$", message = "Invalid NIC")
    private String nic;
    @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Invalid Email")
    private String email;
    private Gender gender;
    private Designation designation;
    private LocalDate dob;
    private EmployeeType employeetype;
    private LocalDate doassigned;
    private EmployeeStatus employeestatus;
    @Pattern(regexp = "^.*$", message = "Invalid Description")
    private String description;
}
