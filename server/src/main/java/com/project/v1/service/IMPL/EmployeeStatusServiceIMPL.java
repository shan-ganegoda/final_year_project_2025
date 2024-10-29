package com.project.v1.service.IMPL;

import com.project.v1.dto.EmployeeStatusDTO;
import com.project.v1.entity.EmployeeStatus;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.EmployeeStatusRepository;
import com.project.v1.service.EmployeeStatusService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeStatusServiceIMPL implements EmployeeStatusService {

    private final EmployeeStatusRepository employeeStatusRepository;
    private final ObjectMapper objectMapper;

    @Override
    public List<EmployeeStatusDTO> getAll() {
        List<EmployeeStatus> employees = employeeStatusRepository.findAll();
        if(!employees.isEmpty()) {
            return objectMapper.employeeStatusListToDtoList(employees);
        }else{
            throw new ResourceNotFoundException("Employee Statuses Not Found!");
        }
    }
}
