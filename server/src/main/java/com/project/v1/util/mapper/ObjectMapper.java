package com.project.v1.util.mapper;

import com.project.v1.dto.EmployeeDTO;
import com.project.v1.entity.Employee;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ObjectMapper {
    List<EmployeeDTO> employeeListToDtoList(List<Employee> employees);

    Employee employeeDtoToEmployee(EmployeeDTO employeeDTO);
}
