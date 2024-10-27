package com.project.v1.controller;

import com.project.v1.dto.EmployeeDTO;
import com.project.v1.dto.StandardResponse;
import com.project.v1.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public List<EmployeeDTO> getAll(@RequestParam HashMap<String,String> params){
        return employeeService.getAll(params);
    }

    @PostMapping
    public EmployeeDTO getById(@RequestBody EmployeeDTO employeeDTO){
        return employeeService.save(employeeDTO);
    }

    @PutMapping
    public EmployeeDTO update(@RequestBody EmployeeDTO employeeDTO){
        return employeeService.update(employeeDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StandardResponse> delete(@PathVariable Integer id){
        String message = employeeService.delete(id);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Deleted",message), HttpStatus.OK
        );
    }
}
