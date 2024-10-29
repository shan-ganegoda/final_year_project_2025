package com.project.v1.controller;

import com.project.v1.dto.EmployeeStatusDTO;
import com.project.v1.service.EmployeeStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/employeestatuses")
@RequiredArgsConstructor
public class EmployeeStatusController {

    private final EmployeeStatusService employeeStatusService;

    @GetMapping
    public List<EmployeeStatusDTO> getAll(){
        return employeeStatusService.getAll();
    }
}
