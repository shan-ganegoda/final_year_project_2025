package com.project.v1.controller;

import com.project.v1.dto.PrivilegeDTO;
import com.project.v1.dto.StandardResponse;
import com.project.v1.service.PrivilegeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/privileges")
@RequiredArgsConstructor
public class PrivilegeController {

    private final PrivilegeService privilegeService;

    @GetMapping
    public List<PrivilegeDTO> getAll(@RequestParam HashMap<String,String> params){
        return privilegeService.getAll(params);
    }

    @PostMapping
    public PrivilegeDTO create(@RequestBody PrivilegeDTO privilegeDTO){
        return privilegeService.save(privilegeDTO);
    }

    @PutMapping
    public PrivilegeDTO update(@RequestBody PrivilegeDTO privilegeDTO){
        return privilegeService.update(privilegeDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StandardResponse> delete(@PathVariable Integer id){
        String message = privilegeService.delete(id);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Deleted",message), HttpStatus.OK
        );
    }
}
