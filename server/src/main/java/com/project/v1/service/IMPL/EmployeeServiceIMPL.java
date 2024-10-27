package com.project.v1.service.IMPL;

import com.project.v1.dto.EmployeeDTO;
import com.project.v1.entity.Employee;
import com.project.v1.exception.ResourceAlreadyExistException;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.EmployeeRepository;
import com.project.v1.service.EmployeeService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class EmployeeServiceIMPL implements EmployeeService {

    private final ObjectMapper objectMapper;
    private final EmployeeRepository employeeRepository;

    @Override
    public List<EmployeeDTO> getAll(HashMap<String, String> params) {
        List<Employee> employees = employeeRepository.findAll();
        if(!employees.isEmpty()){
            List<EmployeeDTO> dtos = objectMapper.employeeListToDtoList(employees);
            if(params.isEmpty()){
                return dtos;
            }else{
                String lastname = params.get("lastname");
                String nic = params.get("nic");
                String employeestatusid = params.get("employeestatusid");
                String genderid = params.get("genderid");

                Stream<EmployeeDTO> stream = dtos.stream();

                if(lastname != null) stream = stream.filter(e-> e.getLastname().contains(lastname));
                if(nic != null) stream = stream.filter(e-> e.getNic().equals(nic));
                if(employeestatusid != null) stream = stream.filter(e-> e.getEmployeestatus().getId() == Integer.parseInt(employeestatusid));
                if(genderid != null) stream = stream.filter(e-> e.getGender().getId() == Integer.parseInt(genderid));

                return stream.collect(Collectors.toList());
            }
        }else{
            throw new ResourceNotFoundException("Employees Not Found!");
        }
    }

    @Override
    public EmployeeDTO save(EmployeeDTO employeeDTO) {

        if(employeeRepository.existsByEmail(employeeDTO.getEmail())){
            throw new ResourceAlreadyExistException("Email Already Exists");
        }

        if(employeeRepository.existsByNumber(employeeDTO.getNumber())){
            throw new ResourceAlreadyExistException("Number Already Exists");
        }

        if(employeeRepository.existsByNic(employeeDTO.getNic())){
            throw new ResourceAlreadyExistException("Nic Already Exists");
        }

        Employee employee = objectMapper.employeeDtoToEmployee(employeeDTO);
        employeeRepository.save(employee);
        return employeeDTO;
    }

    @Override
    public EmployeeDTO update(EmployeeDTO employeeDTO) {

        Employee emprec = employeeRepository.findById(employeeDTO.getId()).orElseThrow(()-> new ResourceNotFoundException("Employee Not Found"));

        if(!emprec.getEmail().equals(employeeDTO.getEmail()) && employeeRepository.existsByEmail(employeeDTO.getEmail())){
            throw new ResourceAlreadyExistException("Email Already Exists");
        }

        if(!emprec.getNumber().equals(employeeDTO.getNumber()) && employeeRepository.existsByNumber(employeeDTO.getNumber())){
            throw new ResourceAlreadyExistException("Number Already Exists");
        }

        if(!emprec.getNic().equals(employeeDTO.getNic()) && employeeRepository.existsByNic(employeeDTO.getNic())){
            throw new ResourceAlreadyExistException("Nic Already Exists");
        }

        Employee employee = objectMapper.employeeDtoToEmployee(employeeDTO);
        employeeRepository.save(employee);
        return employeeDTO;
    }

    @Override
    public String delete(Integer id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee Not Found"));
        employeeRepository.delete(employee);
        return "Successfully Deleted";
    }
}
