package com.project.v1.controller;

import com.project.v1.dto.EmployeeTypeDTO;
import com.project.v1.service.EmployeeTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/employeetypes")
@RequiredArgsConstructor
public class EmployeeTypeController {

    private final EmployeeTypeService employeeTypeService;

    @GetMapping
    public List<EmployeeTypeDTO> getAll(){
        return employeeTypeService.getAll();
    }
}
