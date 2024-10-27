package com.project.v1.service;

import com.project.v1.dto.EmployeeDTO;

import java.util.HashMap;
import java.util.List;

public interface EmployeeService {
    List<EmployeeDTO> getAll(HashMap<String, String> params);

    EmployeeDTO save(EmployeeDTO employeeDTO);

    EmployeeDTO update(EmployeeDTO employeeDTO);

    String delete(Integer id);
}
