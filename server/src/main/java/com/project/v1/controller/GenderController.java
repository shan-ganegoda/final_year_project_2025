package com.project.v1.controller;

import com.project.v1.dto.GenderDTO;
import com.project.v1.service.GenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/genders")
@RequiredArgsConstructor
public class GenderController {

    private final GenderService genderService;

    @GetMapping
    public List<GenderDTO> getAll(){
        return genderService.getAll();
    }
}
