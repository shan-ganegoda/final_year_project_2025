package com.project.v1.controller;

import com.project.v1.dto.DesignationDTO;
import com.project.v1.service.DesignationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/designations")
@RequiredArgsConstructor
public class DesignationController {

    private final DesignationService designationService;

    @GetMapping
    public List<DesignationDTO> getAll(){
        return designationService.getAll();
    }
}
