package com.project.v1.repository;

import com.project.v1.entity.Userstatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStatusRepository extends JpaRepository<Userstatus, Integer> {
}
