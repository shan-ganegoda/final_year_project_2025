package com.project.v1.service.IMPL;

import com.project.v1.dto.DesignationDTO;
import com.project.v1.entity.Designation;
import com.project.v1.exception.ResourceNotFoundException;
import com.project.v1.repository.DesignationRepository;
import com.project.v1.service.DesignationService;
import com.project.v1.util.mapper.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DesignationServiceIMPL implements DesignationService {

    private final DesignationRepository designationRepository;
    private final ObjectMapper objectMapper;

    @Override
    public List<DesignationDTO> getAll() {
        List<Designation> designations = designationRepository.findAll();
        if(!designations.isEmpty()) {
            return objectMapper.designationListToDtoList(designations);
        }else{
            throw new ResourceNotFoundException("Designations Not Found!");
        }
    }
}
