package com.project.v1.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "firstname")
    private String firstname;

    @Size(max = 255)
    @Column(name = "lastname")
    private String lastname;

    @Size(max = 12)
    @Column(name = "number", length = 12)
    private String number;

    @Column(name = "photo")
    private byte[] photo;

    @Size(max = 10)
    @Column(name = "mobile", length = 10)
    private String mobile;

    @Size(max = 10)
    @Column(name = "land", length = 10)
    private String land;

    @Size(max = 12)
    @Column(name = "nic", length = 12)
    private String nic;

    @Size(max = 255)
    @Column(name = "email")
    private String email;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "gender_id", nullable = false)
    private Gender gender;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "designation_id", nullable = false)
    private Designation designation;

    @Column(name = "dob")
    private LocalDate dob;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "employeetype_id", nullable = false)
    private EmployeeType employeetype;

    @Column(name = "doassigned")
    private LocalDate doassigned;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "employeestatus_id", nullable = false)
    private EmployeeStatus employeestatus;

    @Size(max = 45)
    @Column(name = "description", length = 45)
    private String description;

}