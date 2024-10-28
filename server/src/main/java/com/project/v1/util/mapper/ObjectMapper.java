package com.project.v1.util.mapper;

import com.project.v1.dto.EmployeeDTO;
import com.project.v1.dto.PrivilegeDTO;
import com.project.v1.dto.UserDTO;
import com.project.v1.entity.Employee;
import com.project.v1.entity.Privilege;
import com.project.v1.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ObjectMapper {
    List<EmployeeDTO> employeeListToDtoList(List<Employee> employees);

    Employee employeeDtoToEmployee(EmployeeDTO employeeDTO);

    List<UserDTO> userListToDtoList(List<User> users);

    User userDtoToUser(UserDTO userDTO);

    List<PrivilegeDTO> privilegeListToDtoList(List<Privilege> privileges);

    Privilege privilegeDtoToPrivilege(PrivilegeDTO privilegeDTO);
}
