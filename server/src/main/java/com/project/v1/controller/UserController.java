package com.project.v1.controller;

import com.project.v1.dto.StandardResponse;
import com.project.v1.dto.UserDTO;
import com.project.v1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDTO> getAll(@RequestParam HashMap<String,String> params) {
        return userService.getAll(params);
    }

    @PostMapping
    public UserDTO create(@RequestBody UserDTO userDTO) {
        return userService.save(userDTO);
    }

    @PutMapping
    public UserDTO update(@RequestBody UserDTO userDTO) {
        return userService.update(userDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StandardResponse> delete(@PathVariable Integer id) {
        String message = userService.delete(id);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Deleted",message), HttpStatus.OK
        );
    }
}
