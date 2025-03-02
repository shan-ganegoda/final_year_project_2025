package com.project.v1.controller;

import com.project.v1.dto.EmployeeDTO;
import com.project.v1.util.regex.RegexProvider;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@CrossOrigin
@RequestMapping(value = "/regexes")
public class RegexController {

    @GetMapping(path = "/employee")
    public HashMap<String, HashMap<String,String>> employee(){
        return RegexProvider.get(new EmployeeDTO());
    }
}
