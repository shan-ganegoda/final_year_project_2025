package com.project.v1.service.IMPL;

import com.project.v1.dto.EmployeeTypeDTO;
import com.project.v1.entity.EmployeeType;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.EmployeeTypeRepository;
import com.project.v1.service.EmployeeTypeService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeTypeServiceIMPL implements EmployeeTypeService {

    private final EmployeeTypeRepository employeeTypeRepository;
    private final ObjectMapper objectMapper;

    @Override
    public List<EmployeeTypeDTO> getAll() {
        List<EmployeeType> employeeTypes = employeeTypeRepository.findAll();
        if(!employeeTypes.isEmpty()){
            return objectMapper.employeeTypeListToDtoList(employeeTypes);
        }else{
            throw new ResourceNotFoundException("Employee Types Not Found!");
        }
    }
}
