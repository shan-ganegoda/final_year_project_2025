package com.project.v1.repository;

import com.project.v1.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    boolean existsByEmail(String email);
    boolean existsByNic(String nic);
    boolean existsByNumber(String number);
}
