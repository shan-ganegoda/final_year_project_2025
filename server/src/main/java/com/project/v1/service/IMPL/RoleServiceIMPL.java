package com.project.v1.service.IMPL;

import com.project.v1.dto.RoleDTO;
import com.project.v1.entity.Role;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.RoleRepository;
import com.project.v1.service.RoleService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceIMPL implements RoleService {

    private final RoleRepository roleRepository;
    private final ObjectMapper objectMapper;

    @Override
    public List<RoleDTO> getAll() {
        List<Role> roles = roleRepository.findAll();
        if(!roles.isEmpty()){
            return objectMapper.roleListToDtoList(roles);
        }else{
            throw new ResourceNotFoundException("Roles Not Found!");
        }
    }
}
