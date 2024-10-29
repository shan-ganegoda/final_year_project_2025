package com.project.v1.repository;

import com.project.v1.entity.EmployeeType;
import com.project.v1.entity.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeTypeRepository extends JpaRepository<EmployeeType, Integer> {
}
