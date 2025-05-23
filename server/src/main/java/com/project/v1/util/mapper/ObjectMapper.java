package com.project.v1.util.mapper;

import com.project.v1.dto.*;
import com.project.v1.entity.*;
import com.project.v1.entity.Module;
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

    List<EmployeeStatusDTO> employeeStatusListToDtoList(List<EmployeeStatus> employees);

    List<DesignationDTO> designationListToDtoList(List<Designation> designations);

    List<GenderDTO> genderListToDtoList(List<Gender> genders);

    List<EmployeeTypeDTO> employeeTypeListToDtoList(List<EmployeeType> employeeTypes);

    List<UserStatusDTO> userStatusListToDtoList(List<Userstatus> userStatusList);

    List<RoleDTO> roleListToDtoList(List<Role> roles);

    UserDTO userToUserDto(User user);

    List<OperationDTO> operationListToDtoList(List<Operation> operations);

    List<ModuleDTO> moduleListToDtoList(List<Module> modules);
}
