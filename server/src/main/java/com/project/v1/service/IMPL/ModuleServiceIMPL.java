package com.project.v1.service.IMPL;

import com.project.v1.dto.ModuleDTO;
import com.project.v1.entity.Module;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.ModuleRepository;
import com.project.v1.service.ModuleService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModuleServiceIMPL implements ModuleService {

    private final ModuleRepository moduleRepository;
    private final ObjectMapper objectMapper;

    @Override
    public List<ModuleDTO> getAll() {
        List<Module> modules = moduleRepository.findAll();

        if(!modules.isEmpty()){
            return objectMapper.moduleListToDtoList(modules);
        }else{
            throw new ResourceNotFoundException("No Modules Found!");
        }
    }
}
