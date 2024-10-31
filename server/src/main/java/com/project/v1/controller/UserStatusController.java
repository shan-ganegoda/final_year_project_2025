package com.project.v1.controller;

import com.project.v1.dto.UserStatusDTO;
import com.project.v1.service.UserStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/userstatuses")
@RequiredArgsConstructor
public class UserStatusController {

    private final UserStatusService userStatusService;

    @GetMapping
    public List<UserStatusDTO> getAll(){
        return userStatusService.getAll();
    }
}
