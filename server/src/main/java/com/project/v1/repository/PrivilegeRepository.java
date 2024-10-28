package com.project.v1.repository;

import com.project.v1.entity.Module;
import com.project.v1.entity.Operation;
import com.project.v1.entity.Privilege;
import com.project.v1.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeRepository extends JpaRepository<Privilege, Integer> {
    boolean existsByRoleAndModuleAndOperation(Role role, Module module, Operation operation);
}
