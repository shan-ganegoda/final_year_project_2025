package com.project.v1.controller;

import com.project.v1.dto.ModuleDTO;
import com.project.v1.service.ModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/modules")
@RequiredArgsConstructor
public class ModuleController {

    private final ModuleService moduleService;

    @GetMapping
    public List<ModuleDTO> getAll(){
        return moduleService.getAll();
    }
}
